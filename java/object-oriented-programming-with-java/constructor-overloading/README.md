# 🧰 Constructor Overloading in Java

Constructor overloading lets a class offer different ways to create an object. Each constructor must have a different parameter list.

```java
public class Point {
    private final int x;
    private final int y;

    public Point() {
        this(0, 0);
    }

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
```

`new Point()` creates a point at the origin, while `new Point(3, 5)` uses the values you provide. The no-argument constructor calls the other constructor with `this(0, 0)`.

### 🧠 Interview Reminder

Constructors are overloaded by their parameter lists; a different return type alone does not make a new constructor.