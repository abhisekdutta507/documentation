# Java Concurrency Patterns and Fixes

## ⚠️ Race Conditions
A race condition occurs when multiple threads attempt to read and modify a shared object simultaneously, leading to an indeterminate and often incorrect final state (e.g., incorrect final download size).

## 🛡️ Thread Safety Strategies
Methods to ensure thread safety include:
- **Confinement**: Restricting resource access to a single thread.
- **Immutability/Locks**: Guaranteeing data integrity using immutable state and synchronization primitives.
- **Synchronization**: Coordinating thread execution using `wait()` and `notify()`.
- **Atomic Objects**: Utilizing specialized classes (like `AtomicInteger`) for guaranteed atomic updates.
- **Partitioning**: Dividing state among multiple concurrent tasks.

## 🚀 Modern Concurrency (Virtual Threads)
Modern Java can utilize virtual threads (via `Executors.newVirtualThreadPerTaskExecutor()`). These threads allow for highly scalable concurrency with lightweight task management, often combined with mechanisms like `Semaphore` to enforce bounded concurrency.