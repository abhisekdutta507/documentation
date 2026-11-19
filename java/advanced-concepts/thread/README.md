# 🧵 Java Threads and Concurrency: Interview Guide

Threads let a Java program run tasks concurrently. This guide covers starting and waiting for threads, understanding race conditions, and protecting shared data with practical examples.

`Thread.activeCount()` estimates the no. of active threads in the current thread group. `Runtime.availableProcessors()` reports how many processors are available to the JVM.
```java
System.out.println(Thread.activeCount());
System.out.println(Runtime.getRuntime().availableProcessors());
```

## ▶️ Start a Task with `Runnable`

Put the work in a `Runnable`, then pass it to a `Thread`. Call `start()` to run the task on a new thread.

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

## ⏳ Wait for a Thread with `join()`

Call `join()` when the current thread must wait for another thread to finish before continuing.

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

## ⚠️ Understand Race Conditions

A race condition happens when the result depends on the timing of multiple threads accessing shared data. A read-modify-write operation such as `totalBytes++` is not atomic, so concurrent updates can be lost.

### Example: A Shared Download Counter

Ten tasks each increment a shared counter 10,000 times, so the expected total is 100,000. Because each increment reads, changes, and writes the value separately, two threads can overwrite each other's updates.

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

Output (the total can vary between runs):

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

## 🛡️ Keep Shared Data Thread-Safe

Choose a strategy based on whether data is shared and can change:

- **Thread confinement**: Keep mutable state local to one thread, then combine results.
- **Immutability**: Share objects that cannot change after they are created.
- **Locks and synchronization**: Protect shared mutable state while it is being changed.
- **Atomic classes**: Use atomic operations for simple shared values.
- **Partitioning**: Split data into separate parts so workers can update them independently.

### 🧺 Avoid Sharing Mutable State with Thread Confinement

Give each task its own `DownloadStatus` instance so threads do not update the same counter.

After the tasks finish, add their counts together.

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

### 🧠 Interview Quick Notes

- Use `start()` to begin a thread; do not call `run()` for asynchronous work.
- Use `join()` to wait until another thread finishes.
- A race condition occurs when threads read and update shared state at the wrong
  time.
- Prefer confinement or immutable state when possible.
- Use synchronization or atomic classes only for shared mutable state.
- Virtual threads are useful for large numbers of I/O-bound tasks.

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

### 🚀 Run Many Tasks with Virtual Threads

Virtual threads make it practical to create many lightweight threads, especially for tasks that wait on I/O. They do not limit how many tasks use a resource at once; this example uses a `Semaphore` for that limit.

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.DownloadManager;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.Semaphore;

public class Main {
    private static final int TOTAL_DOWNLOADS = 5_000;
    private static final int MAX_CONCURRENT_DOWNLOADS = 2_500;

    static void main() {
        System.out.println("Available Processors: " + Runtime.getRuntime().availableProcessors());

        Semaphore downloadLimiter = new Semaphore(MAX_CONCURRENT_DOWNLOADS);
        List<DownloadManager> tasks = new ArrayList<>(TOTAL_DOWNLOADS);
        List<Future<?>> futures = new ArrayList<>(TOTAL_DOWNLOADS);

        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < TOTAL_DOWNLOADS; i++) {
                var task = new DownloadManager(i);
                tasks.add(task);

                futures.add(executor.submit(() -> {
                    downloadLimiter.acquire();
                    try {
                        task.run();
                    } finally {
                        downloadLimiter.release();
                    }
                    return null;
                }));
            }

            for (Future<?> future : futures) {
                try {
                    future.get();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                } catch (ExecutionException e) {
                    System.err.println("Download task failed: " + e.getCause());
                }
            }
        }

        long totalBytes = tasks.stream()
            .mapToLong(task -> task.getDownloadStatus().getTotalBytes())
            .sum();

        String formattedTotalBytes = NumberFormat.getNumberInstance().format(totalBytes);
        System.out.println("\nDownloaded file size: " + formattedTotalBytes + " bytes");
    }
}

```

### 🔐 Protect a Shared Counter with `ReentrantLock`

Each task now shares one `DownloadStatus`, so its counter must be protected. A `ReentrantLock` makes each increment a critical section.

DownloadStatus.java

```java
package com.advancejavatutorials.concurrency;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class DownloadStatus {
    private int totalBytes;
    private final Lock access = new ReentrantLock();

    public int getTotalBytes() {
        return totalBytes;
    }

    public void incrementTotalBytes() {
        access.lock();

        try {
            totalBytes++;
        } finally {
            access.unlock();
        }
    }
}
```

`DownloadManager` receives the shared `DownloadStatus` instance:

DownloadManager.java

```java
package com.advancejavatutorials.concurrency;

public class DownloadManager implements Runnable {
    private int index;
    private final DownloadStatus downloadStatus;

    public DownloadManager(int index, DownloadStatus downloadStatus) {
        this.index = index;
        this.downloadStatus = downloadStatus;
    }

    @Override
    public void run() {
        System.out.println("\n===================\n\nTask index: " + index + " | Tread name: " + Thread.currentThread().getName() + " | No. of threads in use: " + Thread.activeCount());


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

The main method passes the same status instance to each task:

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.DownloadManager;
import com.advancejavatutorials.concurrency.DownloadStatus;

import java.util.ArrayList;
import java.util.List;

public class Main {
    static void main() {
        DownloadStatus status = new DownloadStatus();
        List<Thread> threads = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            var task = new DownloadManager(i, status);
            var thread = new Thread(task);
            threads.add(thread);

            thread.start();
        }

        for (var thread : threads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                // ...
            }
        }

        System.out.println("\nDownloaded file size: " + status.getTotalBytes());
    }
}

```

Output:

```txt

===================

Task index: 8 | Tread name: Thread-8 | No. of threads in use: 12

===================

Task index: 9 | Tread name: Thread-9 | No. of threads in use: 12

===================

Task index: 2 | Tread name: Thread-2 | No. of threads in use: 8

===================

Task index: 3 | Tread name: Thread-3 | No. of threads in use: 8

===================

Task index: 4 | Tread name: Thread-4 | No. of threads in use: 8

===================

Task index: 7 | Tread name: Thread-7 | No. of threads in use: 10

===================

Task index: 5 | Tread name: Thread-5 | No. of threads in use: 8

===================

Task index: 6 | Tread name: Thread-6 | No. of threads in use: 10

===================

Task index: 0 | Tread name: Thread-0 | No. of threads in use: 6

===================

Task index: 1 | Tread name: Thread-1 | No. of threads in use: 8

Downloaded file size: 100000
```

### 🔒 Protect Shared Data with `synchronized`

Java's `synchronized` keyword uses an object's monitor to allow only one thread at a time into a protected section using that same monitor.

DownloadStatus.java

```java
package com.advancejavatutorials.concurrency;

public class DownloadStatus {
    private int totalBytes;
    private int totalFiles;
    private final Object totalBytesLock = new Object();
    private final Object totalFilesLock = new Object();

    public void incrementTotalBytes() {
        synchronized (totalBytesLock) {
            totalBytes++;
        }
    }

    public void incrementTotalFiles() {
        synchronized (totalFilesLock) {
            totalFiles++;
        }
    }

    public int getTotalBytes() {
        synchronized (totalBytesLock) {
            return totalBytes;
        }
    }

    public int getTotalFiles() {
        synchronized (totalFilesLock) {
            return totalFiles;
        }
    }
}

```

The second counter shows how to protect separate pieces of state with separate locks. Every access to a counter must use its matching lock.

Output:

```txt

===================

Task index: 0 | Tread name: Thread-0 | No. of threads in use: 5

===================

Task index: 4 | Tread name: Thread-4 | No. of threads in use: 8

===================

Task index: 5 | Tread name: Thread-5 | No. of threads in use: 9

===================

Task index: 2 | Tread name: Thread-2 | No. of threads in use: 6

===================

Task index: 1 | Tread name: Thread-1 | No. of threads in use: 6

===================

Task index: 7 | Tread name: Thread-7 | No. of threads in use: 11

===================

Task index: 3 | Tread name: Thread-3 | No. of threads in use: 6

===================

Task index: 6 | Tread name: Thread-6 | No. of threads in use: 9

===================

Task index: 8 | Tread name: Thread-8 | No. of threads in use: 11

===================

Task index: 9 | Tread name: Thread-9 | No. of threads in use: 12

Downloaded file size: 100000
```

#### Two Ways to Lock the Same Object

```java
public synchronized void incrementTotalBytes() {
    totalBytes++;
}
```

or

```java
public void incrementTotalBytes() {
    synchronized (this) {
        totalBytes++;
    }
}
```

Both forms lock the same object (`this`), so threads using that monitor take turns. Separate locks can allow unrelated state to be updated independently, but add complexity and must be used consistently.

### 👁️ Use `volatile` for Visibility, Not Atomicity

`volatile` makes a variable's latest value visible across threads. It does not make compound operations such as `totalBytes++` atomic, so it cannot prevent lost counter updates.

DownloadStatus.java

```java
package com.advancejavatutorials.concurrency;

public class DownloadStatus {
    private volatile boolean done;
    private int totalBytes;

    public void done() {
        done = true;
    }

    public void incrementTotalBytes() {
        totalBytes++;
    }

    public boolean isDone() {
        return done;
    }

    public int getTotalBytes() {
        return totalBytes;
    }
}

```

DownloadManager.java

```java
package com.advancejavatutorials.concurrency;

public record DownloadManager(int index, DownloadStatus downloadStatus) implements Runnable {

    @Override
    public void run() {
        System.out.println("\n===================\n\nTask index: " + index + " | Tread name: " + Thread.currentThread().getName() + " | No. of threads in use: " + Thread.activeCount());

        for (int i = 0; i < 10_00_000; i++) {
            downloadStatus.incrementTotalBytes();
        }

        downloadStatus.done();
    }
}

```

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.DownloadManager;
import com.advancejavatutorials.concurrency.DownloadStatus;

public class Main {
    static void main() {
        var status = new DownloadStatus();
        var threadA = new Thread(new DownloadManager(0, status));
        var threadB = new Thread(new DownloadManager(1, status));

        var threadC = new Thread(() -> {
            while(!status.isDone()) {}
            System.out.println("\nDownloaded file size @ line: 1: " + status.getTotalBytes());
        });

        threadA.start();
        threadB.start();
        threadC.start();

        /*
        try {
            threadA.join();
            threadB.join();
            threadC.join();
        } catch (InterruptedException e) {
            // ...
        }
        */

        System.out.println("\nDownloaded file size @ line: 2: " + status.getTotalBytes());
    }
}

```

Both `DownloadManager` instances share a status object. The `volatile` flag lets `threadC` observe a completion signal, but it does not protect `totalBytes`; concurrent increments can still be lost. Also, because either worker can set `done`, `threadC` may stop before the other worker finishes.

Without `volatile` or another synchronization mechanism, `threadC` is not guaranteed to observe the updated flag, so its loop may not finish.

The main thread prints its count immediately after starting the workers, so that value may be zero or partial. Joining both workers before reading the final count ensures they have finished, but the counter still needs a thread-safe update.

```java
try {
    threadA.join();
    threadB.join();
    threadC.join();
} catch (InterruptedException e) {
    // ...
}
```

Output:

```txt
Downloaded file size @ line: 2: 0

===================

Task index: 1 | Tread name: Thread-1 | No. of threads in use: 5

===================

Task index: 0 | Tread name: Thread-0 | No. of threads in use: 5

Downloaded file size @ line: 1: 1000753

```

### 📣 Wait for a Condition with `wait()` and `notifyAll()`

Use `wait()` to pause until a condition changes, then use `notifyAll()` to wake waiting threads. Both methods must be called while holding the same object's monitor. In this example, the main thread waits until both download tasks finish.

DownloadStatus.java

```java
package com.advancejavatutorials.concurrency;

public class DownloadStatus {
    private int totalBytes;

    public void done() {
        done = true;
    }

    public void incrementTotalBytes() {
        totalBytes++;
    }

    public boolean isDone() {
        return done;
    }

    public int getTotalBytes() {
        return totalBytes;
    }
}
```

Each task updates the shared counter and signals that it has completed:

DownloadManager.java

```java
package com.advancejavatutorials.concurrency;

public record DownloadManager(int index, DownloadStatus status) implements Runnable {

    @Override
    public void run() {
        System.out.println("\n===================\n\nTask index: " + index + " | Tread name: " + Thread.currentThread().getName() + " | No. of threads in use: " + Thread.activeCount());

        for (int i = 0; i < 10_00_000; i++) {
            status.incrementTotalBytes();
        }

        status.done();

        synchronized (status) {
            status.notifyAll();
        }
    }
}
```

The main thread starts both tasks, then waits for their shared completion condition:

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.DownloadManager;
import com.advancejavatutorials.concurrency.DownloadStatus;

public class Main {
    static void main() {
        var status = new DownloadStatus();
        var threadA = new Thread(new DownloadManager(0, status));
        var threadB = new Thread(new DownloadManager(1, status));

        var threadC = new Thread(() -> {
            while(!status.isDone()) {
                System.out.println("Waiting for signal in " + Thread.currentThread().getName());

                synchronized (status) {
                    try {
                        status.wait();
                    } catch (InterruptedException e) {
                        // ...
                    }
                }
            }
            System.out.println("\nDownloaded file size @ line: 1: " + status.getTotalBytes());
        });

        threadA.start();
        threadB.start();
        threadC.start();

        System.out.println("\nDownloaded file size @ line: 2: " + status.getTotalBytes());
    }
}
```

Output:

1. The text `Waiting for signal in ...` will be printed first.
2. `Downloaded file size @ line: 2: ...` will be printed next as there is no waiting for the threads to be executed.

```txt
Waiting for signal in Thread-2

Downloaded file size @ line: 2: 0

===================

Task index: 1 | Tread name: Thread-1 | No. of threads in use: 5

===================

Task index: 0 | Tread name: Thread-0 | No. of threads in use: 5

Downloaded file size @ line: 1: 892175
```

**Remember:** Check the condition in a `while` loop while holding the same monitor. This avoids missed notifications and handles spurious wakeups. The counter also uses synchronization, so concurrent increments are not lost.
