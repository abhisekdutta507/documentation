# 🧩 Abstract Classes in Java

An abstract class provides a shared base for related classes. It can hold common code and declare abstract methods that each concrete subclass must implement. You cannot create an instance of an abstract class directly.

```java
abstract class Shape {
    public abstract double area();
}

class Circle extends Shape {
    private final double radius;

    Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}
```

`Shape` sets the behavior every shape must provide. `Circle` supplies its own area calculation.

### 🧠 Interview Reminder

Use an abstract class when related classes need a shared base or common implementation. Use an interface to describe a behavior that different classes can provide.
