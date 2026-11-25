# Exception Handling with `try-catch`

Use `try-catch-finally` to execute potentially failing code and release
resources when the operation completes.

## Manual Resource Cleanup

```java
package com.javalms.exceptions;

import java.io.FileReader;
import java.io.IOException;

public class ExceptionsDemo {
    public static void show() {
        FileReader reader = null;

        try {
            reader = new FileReader("file.txt");
            var value = reader.read();
        } catch (IOException exception) {
            //
        } finally {
            if (reader instanceof  FileReader) {
                try {
                    reader.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

}
```

### Simplify the syntax using `try-with-resources` block,

```java
package com.javalms.exceptions;

import java.io.FileReader;
import java.io.IOException;

public class ExceptionsDemo {
    public static void show() {
        try (
            var reader = new FileReader("file.txt");
        ) {
            var value = reader.read();
        } catch (IOException exception) {
            //
        }
    }

}
```

The above syntax only works because the `FileReader` class implements the [AutoCloseable](https://docs.oracle.com/javase/8/docs/api/java/lang/AutoCloseable.html) interface in Java.


Using multiple `catch` statement in a single block,

```java
import java.io.FileReader;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class Main {
    public static void main() {
        try (
            var reader = new FileReader("file1.txt");
        ) {
            int content = reader.read();

            new SimpleDateFormat().parse("");
        } catch (IOException | ParseException e) {
            // ...
        }
    }
}
```

#### Implement custom LinkedList with `try-with-resources` block,

LinkedListException.java

```java
package com.advancejavatutorials;

public abstract class LinkedListException extends Exception {
    // ...
}
```

LinkedList.java

```java
package com.advancejavatutorials;

public class LinkedList implements AutoCloseable {
    public LinkedList() throws LinkedListException {

    }

    @Override
    public void close() throws LinkedListException {
        try {
            // ...
        } catch (Exception e) {
            // ...
        }
    }
}
```

Main.java

```java
package com.advancejavatutorials;

public class Main {
    public static void main() {
        try (
            var list = new LinkedList();
        ) {
            // ...
        } catch (LinkedListException ex) {
            // ...
        }
    }
}
```
