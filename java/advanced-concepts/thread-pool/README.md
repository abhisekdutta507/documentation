# Thread Pools

A thread pool reuses a group of worker threads instead of creating a new thread
for every task. This improves resource usage and makes concurrency easier to
manage.

## Why Use a Thread Pool?

Creating and destroying many threads is expensive. A pool limits resource usage,
queues pending work, and reuses workers after they finish a task.

## Creating an Executor

```java
ExecutorService executor = Executors.newFixedThreadPool(4);
```

Submit a task with `execute()` or `submit()`:

```java
executor.execute(() -> System.out.println("Task running"));
Future<?> future = executor.submit(() -> "Task result");
```

## Common Pool Types

| Pool | Behavior | Typical use |
|---|---|---|
| `newFixedThreadPool(n)` | Fixed number of worker threads | General bounded workloads |
| `newCachedThreadPool()` | Creates or reuses threads as needed | Short bursts of many tasks |
| `newSingleThreadExecutor()` | Uses one worker thread | Ordered task execution |
| `newVirtualThreadPerTaskExecutor()` | Creates a virtual thread per task | Large I/O-bound workloads |

## Shutdown

Always shut down an executor to prevent the application from waiting for its
worker threads.

```java
executor.shutdown();
```

For a bounded shutdown, call `awaitTermination()` after `shutdown()`:

```java
if (!executor.awaitTermination(30, TimeUnit.SECONDS)) {
    executor.shutdownNow();
}
```

## `execute()` vs `submit()`

- `execute()` submits a `Runnable` and does not return a result.
- `submit()` returns a `Future` for a result or an exception.

## Interview Quick Notes

- A thread pool separates task submission from thread lifecycle management.
- The queue can grow when tasks arrive faster than workers can process them.
- Choose pool size based on CPU-bound or I/O-bound work.
- Always call `shutdown()` or `shutdownNow()` appropriately.
- Use `Future.get()` only when the caller must wait for a task result.

## Example: Running Tasks in a Thread Pool

This example submits several tasks to a fixed-size pool and shares a thread-safe
status object between them. It demonstrates how workers process tasks concurrently
while updating shared progress.

DownloadStatus.java

```java
package com.advancejavatutorials.concurrency;

public interface DownloadStatus {
    public void done();
    public void incrementTotalBytes();
    public boolean isDone();
    public int getTotalBytes();
}

```

AtomicDownloadStatus.java

```java
package com.advancejavatutorials.concurrency;

import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.LongAdder;

public class AtomicDownloadStatus implements DownloadStatus {
    private final AtomicBoolean done = new AtomicBoolean();
    private final LongAdder totalBytes = new LongAdder();

    @Override
    public void done() {
        done.set(true);
    }

    @Override
    public void incrementTotalBytes() {
        totalBytes.increment();
    }

    @Override
    public boolean isDone() {
        return done.get();
    }

    @Override
    public int getTotalBytes() {
        return totalBytes.intValue();
    }
}

```

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

        try {
            Thread.sleep(1_000);
        } catch (InterruptedException e) {
            // ...
        }

        status.done();
    }
}

```

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.DownloadManager;
import com.advancejavatutorials.concurrency.AtomicDownloadStatus;
import com.advancejavatutorials.concurrency.DownloadStatus;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class Main {
    static void main() {
        DownloadStatus status = new AtomicDownloadStatus();
        ExecutorService executor = Executors.newFixedThreadPool(5);

        try {
            for (int i = 0; i < 5; i++) {
                executor.submit(new DownloadManager(0, status));
            }

            executor.shutdown();

            if (!executor.awaitTermination(10, TimeUnit.SECONDS)) {
                throw new InterruptedException("Task is completed");
            }
        } catch (Exception ex) {
            // ...
        } finally {
            executor.shutdownNow();
        }

        System.out.println("\nDownloaded file size @ line: 2: " + status.getTotalBytes());
    }
}

```

Output:

```txt

===================

Task index: 0 | Tread name: pool-1-thread-5 | No. of threads in use: 7

===================

Task index: 0 | Tread name: pool-1-thread-3 | No. of threads in use: 7

===================

Task index: 0 | Tread name: pool-1-thread-2 | No. of threads in use: 7

===================

Task index: 0 | Tread name: pool-1-thread-1 | No. of threads in use: 7

===================

Task index: 0 | Tread name: pool-1-thread-4 | No. of threads in use: 7

Downloaded file size @ line: 2: 5000000

```

## `Runnable` and `Callable`

Both interfaces represent work that can be submitted to an `ExecutorService`.
Use `Runnable` when a task does not need to return a value; use `Callable` when
it must return a result or report a checked exception. Submitting a `Callable`
with `submit()` gives you a `Future` for retrieving its result.

### Example: Returning a result with `Callable`

The task below waits briefly, then returns a value derived from its input. The
caller can do other work while it runs and retrieve the result from its `Future`.

LongRunningTask.java

```java
package com.advancejavatutorials.executors;

import java.util.concurrent.Callable;

public record LongRunningTask(int index) implements Callable<Integer> {
    @Override
    public Integer call() throws InterruptedException {
        try {
            Thread.sleep(3_000);
        } catch (InterruptedException ex) {
            // ...
        }

        return index * 2;
    }
}

```

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.executors.LongRunningTask;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    static void main() {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        try {
            var integerFuture = executor.submit(new LongRunningTask(10));

            System.out.println("\nSome other work is in progress...");

            System.out.println("\nSome other work is in progress...");

            try {
                var result = integerFuture.get();
                System.out.println("\nTask Output: " + result);
            } catch (InterruptedException | ExecutionException e) {
                // ...
            }

            System.out.println("\nSome other work is in progress...");
        } finally {
            executor.shutdownNow();
        }
    }
}

```

Here, the `executor.submit(new LongRunningTask(10));` submit method returns a Future<Integer> object.

Output:

```txt

Some other work is in progress...

Some other work is in progress...

Task Output: 20

Some other work is in progress...

```
