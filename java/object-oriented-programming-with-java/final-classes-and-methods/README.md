# 🔒 Final Classes and Methods in Java

Use `final` to stop a class from being extended or a method from being overridden. This can make the intended behavior of a class clear.

```java
public final class Controller {

    public final void handleRequest() {
    }
}
```

For example, `String` is a final class in Java. A final method can still be inherited, but a subclass cannot override it.
