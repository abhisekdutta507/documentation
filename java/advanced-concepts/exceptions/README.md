### What is an Exception in Java?


#### How many types of Exception is there?

There are 3 types of Exceptions,
 - Checked (Exception)
 - Unchecked (RuntimeException)
 - Error

#### Example of Checked Exceptions

 - FileNotFoundExceptio


#### Example of Runtime Exceptions

 - NullPointerException
 - ArithmeticException
 - IllegalArgumentException
 - IndexOutOfBoundsException
 - IllegalStateException

#### Example of Error

 - StackOverflow
 - OutOfMemory

#### Multiple Exceptions can be handled at once

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