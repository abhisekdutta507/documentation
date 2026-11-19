# 🧩 Abstract Class vs Interface in Java

Both abstract classes and interfaces define behavior that other classes can use. The key difference is that an **abstract class can share state and implementation**, while an **interface defines a contract** that different classes can follow.

## Quick Comparison

| Feature | Abstract class | Interface |
| --- | --- | --- |
| Main purpose | Share a base for closely related classes | Describe a capability or contract |
| Fields | Can hold per-object state | Fields are constants (`public static final`) |
| Constructor | Can have constructors | Cannot have constructors |
| Methods | Can mix abstract and implemented methods | Can have abstract methods and `default` or `static` methods |
| Inheritance | A class can extend one class | A class can implement multiple interfaces |
| Create an instance? | No | No |

## Example: Abstract Class for Shared State and Code

Use an abstract class when related classes share data or common behavior, but each class must provide some details of its own.

```java
abstract class Vehicle {
    private final String registration;

    protected Vehicle(String registration) {
        this.registration = registration;
    }

    public String getRegistration() {
        return registration;
    }

    public void start() {
        System.out.println("Starting vehicle");
    }

    public abstract int maxSpeed();
}

class Car extends Vehicle {
    Car(String registration) {
        super(registration);
    }

    @Override
    public int maxSpeed() {
        return 180;
    }
}
```

`Vehicle` stores data and provides the shared `start` method. Each concrete vehicle supplies its own `maxSpeed`.

## Example: Interface for a Shared Capability

Use an interface when different classes should provide the same action, even if they are otherwise unrelated.

```java
interface Notifier {
    void send(String message);
}

class EmailNotifier implements Notifier {
    @Override
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

class SmsNotifier implements Notifier {
    @Override
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}
```

Both notifier classes follow the same contract, so other code can use either one through the `Notifier` type.

## When to Use Each

Choose an **abstract class** when:

- The classes are closely related and share state or implementation.
- You need a constructor to set up common data.
- You want to provide some methods while requiring subclasses to implement others.

Choose an **interface** when:

- Different classes need to support the same capability.
- You want a class to be able to follow multiple contracts.
- You want to describe what an object can do without tying it to one class hierarchy.

A class can extend one abstract class and implement multiple interfaces, so the two approaches can also work together.

### 🧠 Interview Reminder

**Abstract class: shared base. Interface: shared contract.** Both can declare methods that implementing subclasses must provide, but only an abstract class can hold per-object state and run a constructor.