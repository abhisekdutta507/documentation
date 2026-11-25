# Custom Exceptions in Java

A custom exception represents a domain-specific failure that built-in exception
types do not describe clearly. It makes error handling more meaningful and
readable in business code.

## Example: Insufficient Funds

This example uses a checked custom exception. The caller must handle it with
`try-catch` or declare it with `throws`.

```java
package com.advancejavatutorials;

import java.io.IOException;

public class Main {
    public static void main() {
        try {
            var account = new Account();
            account.deposit(100.00F);
            account.withdraw(200.00F);
            System.out.println("Funds: " + account.getFunds());
        } catch (InsufficientFundsException | IOException e) {
            System.out.println(e.getMessage());
        }
    }
}
```

Output

```txt
Insufficient funds in your account.
```

The `InsufficientFundsException` is a Checked exception / throws compile time exception. Below we will implement the exception.

InsufficientFundsException.java

```java
package com.advancejavatutorials;

public class InsufficientFundsException extends Exception {
    public InsufficientFundsException() {
        super("Insufficient funds in your account.");
    }

    public InsufficientFundsException(String message) {
        super(message);
    }
}
```

Now, we will code the `Account` class which throws the exceptions.

Account.java

```java
package com.advancejavatutorials;

import java.io.IOException;

public class Account {
    private float funds;

    public void deposit(float amount) throws IOException {
        if (amount < 1)
            throw new IOException();
        funds += amount;
    }

    public void withdraw(float amount) throws InsufficientFundsException, IOException {
        if (amount < 1)
            throw new IOException();
        if (amount > funds)
            throw new InsufficientFundsException();
        funds -= amount;
    }

    public float getFunds() {
        return funds;
    }
}
```
