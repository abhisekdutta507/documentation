## What is a Thread?

The `Thread` & `Runtime` classes are declared in `java.lang` package.

```java
System.out.println(Thread.activeCount()); // No. of threads used by the current process. By default it is the main thread & the garbage collector.
System.out.println(Runtime.getRuntime().availableProcessors()); // Total no. of available threads in the system.
```

### Start a task in thread

The class must implement the `Runnable` interface.

```java
package com.advancejavatutorials.concurrency;

public class DownloadManager implements Runnable {
    @Override
    public void run() {
        System.out.println("Downloading file. Thread: " + Thread.currentThread().getName());
    }
}
```

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.DownloadManager;

public class Main {
    static void main() {
        Thread thread = new Thread(new DownloadManager());
        thread.start();
    }
}
```

Output

```txt
Downloading file. Thread: Thread-0
```

### Wait for a thread to complete it's work

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.DownloadManager;

public class Main {
    static void main() {
        Thread thread = new Thread(new DownloadManager());
        thread.start();

        try {
            thread.join();
        } catch (InterruptedException e) {
            // ...
        }

        System.out.println("Files are ready to be scanned. Thread: " + Thread.currentThread().getName());
    }
}
```

Output

```txt
Downloading file. Thread: Thread-0
Files are ready to be scanned. Thread: main
```

### Concurrency Issues

When multiple threads are trying to modify the same object we might not get the expected result or the application might crash. We call this situation a race condition.

#### Example of a Race Condition

We will run 10 download tasks & each tasks will download 10_000 bytes. So, the final downloaded size will be 100_000 bytes. But due to race condition multiple threads are trying to perform `Non Atomic Operation` (Reading -> Updating -> Storing the updated totalBytes in memory).

It's possible that they might read the data at the same time. So, instead of reading the updated data they read the older data & end update updating incorrect data into memory.

DownloadStatus.java

```java
package com.advancejavatutorials.concurrency;

public class DownloadStatus {
    private int totalBytes;

    public int getTotalBytes() {
        return totalBytes;
    }

    public void incrementTotalBytes() {
        totalBytes++;
    }
}

```

DownloadManager.java

```java
package com.advancejavatutorials.concurrency;

public class DownloadManager implements Runnable {
    private final DownloadStatus downloadStatus;

    public DownloadManager(DownloadStatus downloadStatus) {
        this.downloadStatus = downloadStatus;
    }

    @Override
    public void run() {
        for (int i = 0; i < 10_000; i++) {
            downloadStatus.incrementTotalBytes();
        }
    }
}
```

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.DownloadManager;
import com.advancejavatutorials.concurrency.DownloadStatus;

import java.util.ArrayList;
import java.util.List;

public class Main {
    static void main() {
        var downloadStatus = new DownloadStatus();

        Utils.printSpace();

        System.out.println("Thread: " + Thread.currentThread().getName());
        System.out.println("Active Threads: " + Thread.activeCount());
        System.out.println("Available Processors: " + Runtime.getRuntime().availableProcessors());
        System.out.println("Code flow is started ...");

        List<Thread> threads = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            var thread = new Thread(new DownloadManager(downloadStatus));
            thread.start();
            threads.add(thread);
        }

        for (var thread : threads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                // ...
            }
        }

        Utils.printSpace();

        System.out.println("Thread: " + Thread.currentThread().getName());
        System.out.println("Active Threads: " + Thread.activeCount());
        System.out.println("Available Processors: " + Runtime.getRuntime().availableProcessors());
        System.out.println("Code flow is completed. Total downloaded size: " + downloadStatus.getTotalBytes());
    }
}

```

Output: It will be different everytime.

```text

===================

Thread: main
Active Threads: 2
Available Processors: 10
Code flow is started ...

===================

Thread: main
Active Threads: 2
Available Processors: 10
Code flow is completed. Total downloaded size: 48435
```

#### Thread Safety Strategy

 - Confinement
 - Immutability -> Locks
 - Synchronization -> Thread signaling with wait() & notify()
 - Atomic Objects
 - Partitioning

##### Fix the Race Condition using Confinement Strategy

Instead of a single DownloadStatus instance we will created different DownloadStatus instance for each DownloadManager instance.

Later we will add the counts together.

DownloadManager.java

```java
package com.advancejavatutorials.concurrency;

public class DownloadManager implements Runnable {
    private int index;
    private final DownloadStatus downloadStatus;

    public DownloadManager(int index) {
        this.index = index;
        this.downloadStatus = new DownloadStatus();
    }

    @Override
    public void run() {
        System.out.println("\n===================\n\nTask index: " + index + " | Tread in use: " + Thread.currentThread().getName());

        for (int i = 0; i < 10_000; i++) {
            downloadStatus.incrementTotalBytes();
        }

        try {
            Thread.sleep(1_000);
        } catch (InterruptedException e) {
            // ...
        }
    }

    public int getIndex() {
        return index;
    }

    public DownloadStatus getDownloadStatus() {
        return downloadStatus;
    }
}

```

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.DownloadManager;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

public class Main {
    static void main() {
        System.out.println("Available Processors: " + Runtime.getRuntime().availableProcessors());

        List<DownloadManager> tasks = new ArrayList<>();
        List<Thread> threads = new ArrayList<>();

        for (int i = 0; i < 10000; i++) {
            var task = new DownloadManager(i);
            tasks.add(task);

            var thread = new Thread(task);
            threads.add(thread);

            try {
                thread.start();
            } catch (OutOfMemoryError ex) {
                break;
            }
        }

        for (var thread : threads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                // ...
            }
        }

        var totalBytes = tasks.stream()
            .map(task -> task.getDownloadStatus().getTotalBytes())
            .reduce(0, (a, b) -> a + b);
        var formattedTotalBytes = NumberFormat.getNumberInstance().format(totalBytes);
        System.out.println("\nDownloaded file size: " + formattedTotalBytes + " bytes");
    }
}

```

Output

```txt
Available Processors: 10

===================

Task index: 4 | Tread name: Thread-4 | No. of threads in use: 7

===================

Task index: 1 | Tread name: Thread-1 | No. of threads in use: 5

===================

Task index: 2 | Tread name: Thread-2 | No. of threads in use: 5

===================

Task index: 3 | Tread name: Thread-3 | No. of threads in use: 7

===================

Task index: 0 | Tread name: Thread-0 | No. of threads in use: 4

===================

Task index: 5 | Tread name: Thread-5 | No. of threads in use: 8

===================

Task index: 7 | Tread name: Thread-7 | No. of threads in use: 10

===================

Task index: 6 | Tread name: Thread-6 | No. of threads in use: 9

===================

Task index: 9 | Tread name: Thread-9 | No. of threads in use: 12

===================

Task index: 8 | Tread name: Thread-8 | No. of threads in use: 11

Downloaded file size: 100,000 bytes
```
