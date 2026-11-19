### Chaining Multiple Similar Type of Exceptions into One.

We will replace the `InsufficientFundsException` class with the `AccountException` class. The `AccountException` will wrap all other `Account` related exceptions like `InsufficientFundsException`.

Main.java

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
        } catch (AccountException | IOException e) {
            var cause = e.getCause();
            System.out.println(cause.getMessage());
        }
    }
}
```

AccountException.java

```java
package com.advancejavatutorials;

public class AccountException extends Exception {
    public AccountException(Exception cause) {
        super(cause);
    }
}
```

We only change the method `withdraw`. Here, instead of throwing the `InsufficientFundsException` directly we now throw a wrapped `Exception` object.

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

    public void withdraw(float amount) throws AccountException, IOException {
        if (amount < 1)
            throw new IOException();
        if (amount > funds)
            throw new AccountException(new InsufficientFundsException());
        funds -= amount;
    }

    public float getFunds() {
        return funds;
    }
}
```

Output

```shell
com.advancejavatutorials.AccountException: com.advancejavatutorials.InsufficientFundsException: Insufficient funds in your account.
	at com.advancejavatutorials.Account.withdraw(Account.java:18)
	at com.advancejavatutorials.Main.main(Main.java:10)
Caused by: com.advancejavatutorials.InsufficientFundsException: Insufficient funds in your account.
	... 2 more
```