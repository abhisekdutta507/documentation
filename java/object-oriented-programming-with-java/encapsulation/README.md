# 🔐 Encapsulation in Java

Encapsulation keeps an object's data private and lets other code use it through clear methods. Those methods can check values before changing the object's state.

```java
public class BankAccount {
    private int balance;

    public int getBalance() {
        return balance;
    }

    public void deposit(int amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive.");
        }
        balance += amount;
    }
}
```

Callers cannot change `balance` directly. They use `deposit`, which protects the account from invalid amounts.

### 🧠 Interview Reminder

Encapsulation is more than adding getters and setters: keep data private and expose only operations that protect the object's rules.