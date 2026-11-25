# Exceptions in Java

An **exception** is an event that interrupts normal program execution. Java
groups exceptions and errors into a clear hierarchy so code can handle failures
predictably.

## Types of Exceptions

| Type | Base class | Typical examples | How it is handled |
|---|---|---|---|
| Checked exception | `Exception` | `IOException`, `SQLException` | Must be handled or declared |
| Unchecked exception | `RuntimeException` | `NullPointerException`, `ArithmeticException` | Optional handling |
| Error | `Error` | `OutOfMemoryError`, `StackOverflowError` | Usually not application-handled |

## Checked Exceptions

Checked exceptions represent recoverable conditions that the compiler requires
you to handle or propagate. Examples include `FileNotFoundException`,
`IOException`, and `ParseException`.

## Unchecked Exceptions

Unchecked exceptions usually indicate programming mistakes or invalid runtime
conditions. Examples include:

- `NullPointerException`
- `ArithmeticException`
- `IllegalArgumentException`
- `IndexOutOfBoundsException`
- `IllegalStateException`

## Handling Multiple Exceptions

Use separate `catch` blocks when each exception needs different handling.

```java
try {
    // ...
} catch (FileNotFoundException exception) {
    // ...
} catch (IOException exception) {
    // ...
} catch (ParseException exception) {
    // ...
}
```

```java
try {
    // ...
} catch (IOException | ParseException exception) {
    // ...
}
```

```java
package com.javalms.exceptions;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class ExceptionsDemo {
    public static void show() {
        try {
            var reader = new FileReader("file.txt");
            var value = reader.read();
        } catch (FileNotFoundException exception) {
            System.out.println();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        try {
            var reader = new FileReader("file.txt");
            var value = reader.read();
        } catch (Exception exception) {
            System.out.println();
        }
    }

}
```