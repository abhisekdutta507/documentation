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