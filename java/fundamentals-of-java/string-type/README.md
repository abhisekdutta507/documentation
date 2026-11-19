### What is String in Java?

`String` is a reference type. Specifically, it is a built-in class `java.lang.String` provided by the Java standard library.

```java
package com.javalms;

public class Main {
    static void main() {
        String name = "Abhisek";
        String hisName = "Abhisek";

        name = "Dutta";

        System.out.println(name);
        System.out.println(hisName);
    }
}
```

### What is String Literals?

When we enclose text in double quotes (like `"Delhi"`), the Java compiler automatically recognizes it as a string literal.

### What is String Pool?

To save memory and improve performance, the JVM maintains a special area in the heap memory called the **String Pool**.
