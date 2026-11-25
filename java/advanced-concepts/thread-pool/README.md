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

## Running a Task with `CompletableFuture`

`CompletableFuture` represents a result that may become available later. Use
`supplyAsync()` to run a task that produces a value; calling `get()` waits for
that value and blocks the caller until the task completes.

```java
package com.advancejavatutorials;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.function.Supplier;

public class Main {
    static void main() {
        try {
            Supplier<Integer> task = () -> 10;
            CompletableFuture<Integer> integerFuture = CompletableFuture.supplyAsync(task);

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

        }
    }
}

```

Output:

```txt

Some other work is in progress...

Some other work is in progress...

Task Output: 10

Some other work is in progress...

```

## Chaining Asynchronous Work with `CompletableFuture`

`sendAsync()` starts the mail operation without blocking its caller. You can
attach follow-up actions to the returned future: `thenRunAsync()` runs an action
without using the result, while `thenAcceptAsync()` receives the result.
`Future.get()` is different: it blocks the calling thread until the result is
available.

MailService.java

```java
package com.advancejavatutorials.concurrency;

import java.util.concurrent.CompletableFuture;

public class MailService {
    public boolean send() {
        System.out.println("Mail sending is in progress...\t\t\t\t\t\t\t\t\t| Thread: " + Thread.currentThread().getName());
        try {
            Thread.sleep(2_000);
        } catch (InterruptedException e) {
            return false;
        }
        return true;
    }

    public CompletableFuture<Boolean> sendAsync() {
        return CompletableFuture.supplyAsync(this::send);
    }
}

```

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.*;

public class Main {
    static void main() {
        var mail = new MailService();
        var future = mail.sendAsync();

        future.thenRunAsync(() -> {
            System.out.println("Mail is sent.");
        });

        System.out.println("Program is executed.");
    }
}

```

The main thread prints its message without waiting for `sendAsync()` to finish.
The mail operation and its follow-up action may complete afterward, so this
fire-and-forget example does not guarantee that their output appears.

Output:

```txt
Program is executed.											| Thread: main
```

To read the value returned by `sendAsync()`, attach a result-handling action or
call `get()` when the caller needs to wait for the result:

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.*;

public class Main {
    static void main() {
        var mail = new MailService();
        var future = mail.sendAsync();

        // @description Non blocking/Asynchronous code snippet
        future.thenRunAsync(() -> {
            System.out.println("Mail is sent" + "\t\t\t| Snippet: future.thenRunAsync()" + " \t\t| Thread: " + Thread.currentThread().getName());
        });

        // @description Non blocking/Asynchronous code snippet
        future.thenAcceptAsync((status) -> {
            System.out.println("Mail sent status: " + status + "\t| Snippet: future.thenAcceptAsync()" + "\t\t| Thread: " + Thread.currentThread().getName());
        });

        // @description Blocking/Synchronous code snippet | Running in main thread
        try {
            var status = future.get();
            System.out.println("Mail sent status: " + status + " \t| Snippet: future.get()" + " \t\t\t\t| Thread: " + Thread.currentThread().getName());
        } catch (Exception ex) {
            // ...
        }

        System.out.println("Program is executed.\t\t\t\t\t\t\t\t\t\t\t| Thread: " + Thread.currentThread().getName());
    }
}

```

Output:

```txt
Mail sending is in progress...									| Thread: ForkJoinPool.commonPool-worker-1
Mail is sent			| Snippet: future.thenRunAsync() 		| Thread: ForkJoinPool.commonPool-worker-2
Mail sent status: true 	| Snippet: future.get() 				| Thread: main
Mail sent status: true	| Snippet: future.thenAcceptAsync()		| Thread: ForkJoinPool.commonPool-worker-1
Program is executed.											| Thread: main

```

## Handling Exceptions in `CompletableFuture`

If an asynchronous task throws an exception, its future completes exceptionally.
Calling `get()` reports that failure through an `ExecutionException`.

Exception.java

```java
package com.advancejavatutorials.concurrency;

import java.util.concurrent.CompletableFuture;

public class Exception {
    public static boolean isEven(int number) {
        if (number < 0) {
            throw new IllegalArgumentException();
        }
        return number % 2 == 0;
    }

    public static CompletableFuture<Boolean> isEvenAsync(int number) {
        return CompletableFuture.supplyAsync(() -> isEven(number));
    }
}

```

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.Exception;

import java.util.concurrent.ExecutionException;

public class Main {
    static void main() {
        var future = Exception.isEvenAsync(-1);

        try {
            var even = future.get();
            System.out.println(even);
        } catch (InterruptedException | ExecutionException e) {
            System.out.println(e.getMessage());
        }
    }
}
```

Output:

```txt
java.lang.IllegalArgumentException
```

### Recovering with `exceptionally()`

Use `exceptionally()` to provide a fallback value when the preceding stage fails.
Here, the future returns `false` instead of propagating the failed computation.

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.Exception;

import java.util.concurrent.ExecutionException;

public class Main {
    static void main() {
        var future = Exception.isEvenAsync(-1);

        try {
            var even = future.exceptionally((ex) -> false).get();
            System.out.println(even);
        } catch (InterruptedException | ExecutionException e) {
            System.out.println(e.getMessage());
        }
    }
}

```

Output:

```txt
false
```

## Composing Dependent Futures with `thenCompose()`

Use `thenCompose()` when the next asynchronous operation depends on the result
of the previous one. It chains the returned future into a single sequence rather
than nesting one future inside another.

UserService.java

```java
package com.advancejavatutorials.concurrency;

import java.util.concurrent.CompletableFuture;

public class UserService {
    public CompletableFuture<String> getEmailIdAsync() {
        return CompletableFuture.supplyAsync(() -> "user_a@example.com");
    }

    public CompletableFuture<String> getLibraryId(String emailId) {
        return CompletableFuture.supplyAsync(() -> "YU67OP9E3");
    }
}

```

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.UserService;

public class Main {
    static void main() {
        var userService = new UserService();
        var userFuture = userService.getEmailIdAsync();

        userFuture.thenComposeAsync(userService::getLibraryId)
            .thenAcceptAsync((libraryId) -> {
                System.out.println("Library id: " + libraryId);
            });

        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
```

Output:

```txt
Library id: YU67OP9E3
```
