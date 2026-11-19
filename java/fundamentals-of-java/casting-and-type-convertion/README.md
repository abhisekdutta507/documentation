### What is Type Casting?


#### Implicit Casting

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

#### Explicit Casting

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
