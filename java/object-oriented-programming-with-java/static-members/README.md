# 🧮 Static Members in Java

A `static` field or method belongs to the class, not to one object. Access it with the class name when it represents shared data or behavior.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(Math.max(4, 9));
    }
}
```

`max` is static, so you call it as `Math.max(...)` without creating a `Math` object.
```