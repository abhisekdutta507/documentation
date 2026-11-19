### What is `throws` in Java?

It forces the caller / user of the methods / classes to use exception handling.

Account.java

```java
package com.advancejavatutorials;

public class Account {
    public void deposit(float value) {
        if (value < 1)
            throw new IllegalArgumentException();
    }
}
```

The class `IllegalArgumentException` does not throw any exception. It is called an `Unchecked` class. But to force the users to use the `try-catch` block we should change it to a `Checked` class.

```java
package com.advancejavatutorials;

import java.io.IOException;

public class Account {
    public void deposit(float value) throws IOException {
        if (value < 1)
            throw new IOException();
    }
}
```

Main.java

```java
package com.advancejavatutorials;

public class Main {
    public static void main() {
        var account = new Account();
        account.deposit(400.00F);
    }
}
```

Here, the snippet `account.deposit(400.00F);` will throw a compilation error. To fix that error, we must wrap the `deposit` call into a `try-catch` block.

```java
package com.advancejavatutorials;

import java.io.IOException;

public class Main {
    public static void main() {
        try {
            var account = new Account();
            account.deposit(400.00F);
        } catch (IOException e) {
            // ...
        }
    }
}
```
