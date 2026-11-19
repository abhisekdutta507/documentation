# 🔄 Type Casting in Java: Conversions Made Simple
*A guide to how Java handles type conversions, both implicit and explicit, along with string parsing.*


### ➡️ Implicit Type Conversion (Widening)
Implicit casting occurs when a smaller data type is automatically converted to a larger one by the compiler. This is always safe because no data is lost. It is a key concept in interviews for discussing type promotion.

A short type value can be automatically converted to int.

```java
public class Main {
    static void main() {
        short a = 1;
        int b = a + 3;
        System.out.println(b);
    }
}
```

Output:

```sh
4
```

### 🎯 Explicit Type Conversion (Narrowing)
Explicit casting is required when a larger data type is forced into a smaller one. This process carries the risk of data loss (truncation) and must be explicitly signaled by the programmer. Always be aware of potential overflow when discussing this in an interview.

```java
public class Main {
    static void main() {
        int a = 1;
        byte b = (byte) (a + 3);
        System.out.println(b);
    }
}
```

Output:

```sh
4
```

#### Convert String into Float

```java
public class Main {
    static void main() {
        String input = "10.01";
        float n1 = Float.parseFloat(input);
        System.out.println(n1);
    }
}
```

Output:

```sh
10.01
```
