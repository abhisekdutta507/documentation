# ☕ Java CompletableFuture: Interview Guide

`CompletableFuture` represents a result that may become available later and
lets you chain asynchronous work. This guide covers creating futures,
composing and combining tasks, handling failures, and choosing continuations.

## CompletableFuture Methods: Covered and Planned

- Creating a future
  - [`supplyAsync()`](#running-a-task-with-supplyasync)
  - [`runAsync()`](#running-a-task-with-runasync)
- Methods available on either returned future
  - [`get()`](#running-a-task-with-supplyasync)
  - [`join()`](#running-a-task-with-runasync)
  - `thenRun()`
  - [`thenRunAsync()`](#chaining-asynchronous-work-with-completablefuture)
  - [`thenAccept()`](#thenaccept-vs-thenacceptasync)
  - [`thenAcceptAsync()`](#thenaccept-vs-thenacceptasync)
  - `thenAcceptBoth()`
  - [`thenAcceptBothAsync()`](#consuming-two-results-with-thenacceptbothasync)
  - [`thenApply()`](#transforming-a-result-with-thenapply)
  - [`thenApplyAsync()`](#thenapply-vs-thenapplyasync)
  - [`thenCombine()`](#combining-results-from-independent-futures-with-thencombine)
  - [`thenCombineAsync()`](#thencombine-vs-thencombineasync)
  - [`thenAcceptBothAsync()` vs `thenCombineAsync()`](#thenacceptbothasync-vs-thencombineasync)
  - [`thenCompose()`](#composing-dependent-futures-with-thencompose)
  - [`thenComposeAsync()`](#thencompose-vs-thencomposeasync)
  - [`orTimeout()`](#failing-a-future-on-timeout-with-ortimeout)
  - [`completeOnTimeout()`](#providing-a-fallback-value-with-completeontimeout)
  - `complete()`
  - [`completeAsync()`](#completing-a-future-asynchronously-with-completeasync)
  - [`exceptionally()`](#recovering-with-exceptionally)
  - [`exceptionallyAsync()`](#recovering-asynchronously-with-exceptionallyasync)

## Running a Task with `supplyAsync()`

`supplyAsync()` accepts a `Supplier<T>` that produces a value and returns a
`CompletableFuture<T>` representing that result. Calling `get()` waits for the
value and blocks the caller until the task is completed.

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

## Running a Task with `runAsync()`

Use `runAsync()` when a task does not need to return a value. It accepts a
`Runnable` and returns a `CompletableFuture<Void>`. Call `join()` when the
current thread needs to wait for the task to finish.

```java
package com.advancejavatutorials;

import java.util.concurrent.CompletableFuture;

public class Main {
    static void main() {
        CompletableFuture.runAsync(() ->
            System.out.println("Task is running asynchronously.")
        ).join();

        System.out.println("Task has completed.");
    }
}
```

Output:

```txt
Task is running asynchronously.
Task has completed.
```

## Completing a Future Asynchronously with `completeAsync()`

Use `completeAsync()` to complete an incomplete future with a value produced
by a `Supplier` running asynchronously. It returns the same future, which can
be awaited with `join()`.

```java
package com.advancejavatutorials;

import java.util.concurrent.CompletableFuture;

public class Main {
    static void main() {
        var future = new CompletableFuture<String>();
        future.completeAsync(() -> "Task result");

        System.out.println(future.join());
    }
}
```

Output:

```txt
Task result
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

## Transforming a Result with `thenApply()`

Use `thenApply()` to transform a value and pass the new value to the next stage.
Unlike `thenAccept()`, which consumes a result without returning one,
`thenApply()` keeps the chain going with its transformed result. Here, the
numeric price is formatted as currency before it is printed.

Stock.java

```java
package com.advancejavatutorials.concurrency;

import java.util.concurrent.CompletableFuture;

public class Stock {
    private static float usdToRupee(String amount) {
        var price = amount.replace("USD", "");
        return Float.parseFloat(price);
    }

    public static CompletableFuture<Float> getUnitPriceAsync() {
        return CompletableFuture.supplyAsync(() -> "1.27USD")
            .thenApplyAsync(Stock::usdToRupee);
    }

    public static CompletableFuture<Float> getINRConversionRate() {
        return CompletableFuture.supplyAsync(() -> 93.43F);
    }
}

```

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.Stock;

import java.text.NumberFormat;

public class Main {
    static String formatCurrency(float amount) {
        return NumberFormat.getCurrencyInstance().format(amount);
    }

    static void main() {
        Stock.getUnitPriceAsync()
            .thenCombineAsync(Stock.getINRConversionRate(), (price, rate) -> price * rate)
            .thenApplyAsync(Main::formatCurrency)
            .thenAcceptAsync(System.out::println);

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
₹118.66
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

import com.advancejavatutorials.concurrency.MailService;

public class Main {
    static void main() {
        var userService = new MailService();

        userService.getEmailIdAsync()
            .thenComposeAsync(userService::getLibraryId)
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

## Combining Results from Independent Futures with `thenCombine()`

Use `thenCombine()` when two independent asynchronous tasks produce values that
are both needed for a later calculation. It waits for both results and passes
them to a combining function. In this example, the unit price and exchange rate
are multiplied to calculate the converted price.

Stock.java

```java
package com.advancejavatutorials.concurrency;

import java.util.concurrent.CompletableFuture;

public class Stock {
    public static CompletableFuture<Float> getUnitPriceAsync() {
        return CompletableFuture.supplyAsync(() -> 1.27F);
    }

    public static CompletableFuture<Float> getINRConversionRate() {
        return CompletableFuture.supplyAsync(() -> 93.43F);
    }
}

```

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.Stock;

import java.text.NumberFormat;

public class Main {
    static void main() {
        Stock.getUnitPriceAsync()
            .thenCombineAsync(Stock.getINRConversionRate(), (price, exchangeRate) -> price * exchangeRate)
            .thenAcceptAsync(price -> System.out.println("NAV: " + NumberFormat.getCurrencyInstance().format(price)));

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
NAV: ₹118.66
```

## Consuming Two Results with `thenAcceptBothAsync()`

Use `thenAcceptBothAsync()` when an action needs the results of two futures.
After both complete normally, it runs a `BiConsumer` asynchronously and returns
a `CompletableFuture<Void>` because the action does not produce a result.

```java
package com.advancejavatutorials;

import java.util.concurrent.CompletableFuture;

public class Main {
    static void main() {
        var name = CompletableFuture.completedFuture("Ada");
        var greeting = CompletableFuture.completedFuture("Hello");

        name.thenAcceptBothAsync(greeting, (person, message) ->
            System.out.println(message + ", " + person + "!")
        ).join();
    }
}
```

Output:

```txt
Hello, Ada!
```

## Waiting for Multiple Tasks with `CompletableFuture.allOf()`

Use `allOf()` when several independent futures must finish before the program
continues. It returns a `CompletableFuture<Void>` that completes after all the
supplied futures complete; it does not collect their individual results. Keep
the original futures when you need to read each result afterward, as this
example does.

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.Stock;

import java.text.NumberFormat;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class Main {
    static String formatCurrency(float amount) {
        return NumberFormat.getCurrencyInstance().format(amount);
    }

    static void main() {
        var future1 = Stock.getUnitPriceAsync()
            .thenCombineAsync(Stock.getINRConversionRate(), (price, rate) -> price * rate)
            .thenApplyAsync(Main::formatCurrency);

        var future2 = Stock.getUnitPriceAsync()
            .thenCombineAsync(Stock.getINRConversionRate(), (price, rate) -> price * rate)
            .thenApplyAsync(Main::formatCurrency);

        var future3 = Stock.getUnitPriceAsync()
            .thenCombineAsync(Stock.getINRConversionRate(), (price, rate) -> price * rate)
            .thenApplyAsync(Main::formatCurrency);

        var future4 = Stock.getUnitPriceAsync()
            .thenCombineAsync(Stock.getINRConversionRate(), (price, rate) -> price * rate)
            .thenApplyAsync(Main::formatCurrency);

        CompletableFuture.allOf(
            future1,
            future2,
            future3,
            future4
        ).thenRunAsync(() -> {
            try {
                var price1 = future1.get();
                System.out.println(price1);

                var price2 = future2.get();
                System.out.println(price2);

                var price3 = future3.get();
                System.out.println(price3);

                var price4 = future4.get();
                System.out.println(price4);
            } catch (InterruptedException | ExecutionException e) {
                throw new RuntimeException(e);
            }
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
₹118.66
₹118.66
₹118.66
₹118.66
```

## Continuing with the First Completed Task Using `CompletableFuture.anyOf()`

Use `anyOf()` when the next step can proceed as soon as one of several tasks
finishes. The returned future carries the first task's result (as an `Object`)
or its exception. The other tasks are not automatically cancelled. This snippet
uses the futures from the preceding example.

```java
CompletableFuture.anyOf(
            future1,
            future2,
            future3,
            future4
        ).thenAcceptAsync(System.out::println);
```

## Providing a Fallback Value with `completeOnTimeout()`

Use `completeOnTimeout()` to complete a future with a fallback value if its
result is not ready before the specified duration. The timeout does not cancel
or interrupt the underlying task, which may continue running. If the task
finishes first, its actual result is used instead.

Stock.java

```java
package com.advancejavatutorials.concurrency;

import java.util.concurrent.CompletableFuture;

public class Stock {
    private static float usdToRupee(String amount) {
        var price = amount.replace("USD", "");
        return Float.parseFloat(price);
    }

    public static CompletableFuture<Float> getUnitPriceAsync() {
        return CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(1_000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }

            return "1.27USD";
        }).thenApplyAsync(Stock::usdToRupee);
    }

    public static CompletableFuture<Float> getINRConversionRate() {
        return CompletableFuture.supplyAsync(() -> 93.43F);
    }
}

```

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.concurrency.Stock;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

public class Main {
    static void main() {
        try {
            var price = Stock.getUnitPriceAsync()
                .completeOnTimeout(20.00F, 500, TimeUnit.MILLISECONDS)
                .get();

            System.out.println(price);
        } catch (InterruptedException | ExecutionException ex) {
            // ...
        }

        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}

```

The operation takes about one second, but the timeout is 500 milliseconds, so
the future completes with the fallback value `20.0` instead of the expected
price `1.27`. The underlying operation may still finish after the timeout.

Output:

```txt
20.0
```

## Failing a Future on Timeout with `orTimeout()`

Use `orTimeout()` to complete a future exceptionally with a
`TimeoutException` if it does not complete within the given duration. Unlike
`completeOnTimeout()`, it does not provide a fallback value. The timeout does
not cancel or interrupt the underlying task.

```java
package com.advancejavatutorials;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import java.util.concurrent.TimeUnit;

public class Main {
    static void main() {
        var future = CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(1_000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new RuntimeException(e);
            }
            return "Task result";
        }).orTimeout(100, TimeUnit.MILLISECONDS);

        try {
            System.out.println(future.join());
        } catch (CompletionException ex) {
            System.out.println(ex.getCause().getClass().getSimpleName());
        }
    }
}
```

Output:

```txt
TimeoutException
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

### Recovering Asynchronously with `exceptionallyAsync()`

Use `exceptionallyAsync()` to apply a fallback function asynchronously when the
preceding stage fails. It is available since Java 12; an overload accepts an
`Executor` for choosing where the recovery action runs.

```java
package com.advancejavatutorials;

import java.util.concurrent.CompletableFuture;

public class Main {
    static void main() {
        var future = CompletableFuture.<Integer>failedFuture(
            new IllegalStateException("Task failed")
        ).exceptionallyAsync(ex -> 0);

        System.out.println(future.join());
    }
}
```

Output:

```txt
0
```

## Choosing Between `CompletableFuture` Continuations

The `Async` suffix changes how a continuation is scheduled; it does not change
what the continuation does or what value it produces. A non-async continuation
may run on the thread that completes the preceding stage, or on the thread that
registers it if that stage is already complete. An async continuation uses the
stage's default asynchronous execution facility (typically the
`ForkJoinPool.commonPool()`); overloads that accept an `Executor` let you choose
the executor explicitly.

### Interview question: Are these methods blocking?

**Answer:** They do not wait for unfinished futures; they chain the next step.
However, a non-async callback may run on `main`, and slow work keeps that thread
busy. `get()` and `join()` are the methods that explicitly wait.

Use non-async variants for short, non-blocking work when running on the
completing thread is acceptable. Use async variants when you want to schedule
work separately from completion, and provide an appropriate executor for
blocking or resource-intensive work.

The examples below use an already-completed future, so each non-async action
runs on the `main` thread. The async variants are given a named single-thread
executor to make their execution context clear and the output predictable.

### `thenAccept()` vs `thenAcceptAsync()`

Both methods pass the completed stage's value to a `Consumer` and return a
`CompletableFuture<Void>`. They consume the value without producing a new value
for the next stage.

| Method | Where the action may run |
|---|---|
| `thenAccept(action)` | On a thread completing the preceding stage, or on the registering thread if that stage is already complete. |
| `thenAcceptAsync(action)` | Through the default asynchronous execution facility. An overload accepts an `Executor`. |

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        var executor = Executors.newSingleThreadExecutor(
            task -> new Thread(task, "async-worker")
        );
        var result = CompletableFuture.completedFuture("ready");

        try {
            result.thenAccept(value ->
                System.out.println("thenAccept: " + value + " | " + Thread.currentThread().getName())
            ).join();

            result.thenAcceptAsync(value ->
                System.out.println("thenAcceptAsync: " + value + " | " + Thread.currentThread().getName()),
                executor
            ).join();
        } finally {
            executor.shutdown();
        }
    }
}
```

Output:

```txt
thenAccept: ready | main
thenAcceptAsync: ready | async-worker
```

### `thenApply()` vs `thenApplyAsync()`

Both methods pass the completed stage's value to a `Function` and use the
function's return value as the next stage's result. The difference is scheduling:
`thenApply()` follows the non-async execution behavior described above, while
`thenApplyAsync()` uses the default asynchronous execution facility or a supplied
`Executor`.

Use `thenApply()` for a quick transformation, such as converting a value's
format. Use `thenApplyAsync()` when the transformation should be scheduled
separately from the thread completing the previous stage.

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        var executor = Executors.newSingleThreadExecutor(
            task -> new Thread(task, "async-worker")
        );
        var source = CompletableFuture.completedFuture(41);

        try {
            var result = source.thenApply(value -> {
                System.out.println("thenApply action: " + Thread.currentThread().getName());
                return value + 1;
            }).join();
            System.out.println("thenApply result: " + result);

            var asyncResult = source.thenApplyAsync(value -> {
                System.out.println("thenApplyAsync action: " + Thread.currentThread().getName());
                return value + 1;
            }, executor).join();
            System.out.println("thenApplyAsync result: " + asyncResult);
        } finally {
            executor.shutdown();
        }
    }
}
```

Output:

```txt
thenApply action: main
thenApply result: 42
thenApplyAsync action: async-worker
thenApplyAsync result: 42
```

### `thenCombine()` vs `thenCombineAsync()`

Both methods combine the results of two futures with a `BiFunction` after both
stages complete. They produce the same kind of result; only the execution
scheduling differs.

| Method | Where the combining function may run |
|---|---|
| `thenCombine(other, action)` | On a thread completing either input once both are complete, or on the registering thread if both are already complete. |
| `thenCombineAsync(other, action)` | Through the default asynchronous execution facility. An overload accepts an `Executor`. |

Use the non-async variant for a short combination when the completing thread is
appropriate. Use the async variant to schedule the combination separately, and
select an explicit executor when the work needs a particular execution policy.

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        var executor = Executors.newSingleThreadExecutor(
            task -> new Thread(task, "async-worker")
        );
        var first = CompletableFuture.completedFuture(10);
        var second = CompletableFuture.completedFuture(5);

        try {
            var total = first.thenCombine(second, (left, right) -> {
                System.out.println("thenCombine action: " + Thread.currentThread().getName());
                return left + right;
            }).join();
            System.out.println("thenCombine result: " + total);

            var asyncTotal = first.thenCombineAsync(second, (left, right) -> {
                System.out.println("thenCombineAsync action: " + Thread.currentThread().getName());
                return left + right;
            }, executor).join();
            System.out.println("thenCombineAsync result: " + asyncTotal);
        } finally {
            executor.shutdown();
        }
    }
}
```

Output:

```txt
thenCombine action: main
thenCombine result: 15
thenCombineAsync action: async-worker
thenCombineAsync result: 15
```

### `thenAcceptBothAsync()` vs `thenCombineAsync()`

Both methods wait for two futures to complete and then run an asynchronous
callback. `thenAcceptBothAsync()` takes a `BiConsumer`, so it can use both
values for an action but does not produce a value; its returned future is a
`CompletableFuture<Void>`. `thenCombineAsync()` takes a `BiFunction` and
completes with the function's result in a `CompletableFuture<R>`. Both methods
also have overloads that accept an `Executor`.

Use `thenAcceptBothAsync()` for a side effect that needs both values. Use
`thenCombineAsync()` when the two values should be transformed into a result
for a later stage.

```java
import java.util.concurrent.CompletableFuture;

public class Main {
    public static void main(String[] args) {
        var first = CompletableFuture.completedFuture(10);
        var second = CompletableFuture.completedFuture(5);

        CompletableFuture<Void> consumed = first.thenAcceptBothAsync(
            second,
            (left, right) -> System.out.println("Consumed sum: " + (left + right))
        );
        CompletableFuture<Integer> combined = first.thenCombineAsync(
            second,
            Integer::sum
        );

        consumed.join();
        System.out.println("Combined result: " + combined.join());
    }
}
```

Output:

```txt
Consumed sum: 15
Combined result: 15
```

### `thenCompose()` vs `thenComposeAsync()`

Both methods chain an operation that returns another future, flattening the
result so the next stage receives the inner future's value rather than a nested
future. The difference is when the composing function is scheduled:
`thenCompose()` follows the non-async execution behavior described above, while
`thenComposeAsync()` uses the default asynchronous execution facility or a
supplied `Executor`. The async variant schedules the composing function; the
future returned by that function determines when the composed stage completes.

Use `thenCompose()` when the next asynchronous operation depends on the previous
result and it is appropriate to run the composing function on the completing
thread. Use `thenComposeAsync()` when you want to schedule that function
separately.

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        var executor = Executors.newSingleThreadExecutor(
            task -> new Thread(task, "async-worker")
        );
        var userId = CompletableFuture.completedFuture("user-42");

        try {
            var libraryId = userId.thenCompose(id -> {
                System.out.println("thenCompose action: " + Thread.currentThread().getName());
                return CompletableFuture.completedFuture("library-" + id);
            }).join();
            System.out.println("thenCompose result: " + libraryId);

            var asyncLibraryId = userId.thenComposeAsync(id -> {
                System.out.println("thenComposeAsync action: " + Thread.currentThread().getName());
                return CompletableFuture.completedFuture("library-" + id);
            }, executor).join();
            System.out.println("thenComposeAsync result: " + asyncLibraryId);
        } finally {
            executor.shutdown();
        }
    }
}
```

Output:

```txt
thenCompose action: main
thenCompose result: library-user-42
thenComposeAsync action: async-worker
thenComposeAsync result: library-user-42
```
