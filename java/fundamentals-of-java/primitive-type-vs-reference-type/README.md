# 🧩 Primitives vs. Reference Types in Java
*A critical concept in Java programming. Understand the core differences, memory allocation, and performance implications for technical interviews.*
Type | Size | Range
byte | 1 byte | [-128, 127]
short | 2 byte | [-32k, 32k]
int | 4 byte | [-2B, 2B]
long | 8 byte |
float | 4 byte |
double | 8 byte |
char | 2 byte |
boolean | 1 byte | [true, false]

```java
byte x = 100;
byte y = x;

x = 99;

System.out.println(y);
```

Output:

```sh
100
```


What is Reference in Java?

Example of reference type values,

```java
import java.util.Date;

public class Main {
    static void main() {
        Date now = new Date();
        System.out.println(now.getTime());
    }
}
```

Output:

```sh
1793020536080
```

Another example to show how the memory management is different from Primitives,

```java
import java.awt.*;

public class Main {
    static void main() {
        Point pointA = new Point(100, 78);
        Point pointB = pointA;

        pointA.y = 92;

        System.out.println(pointB);
    }
}
```

Output:

```sh
java.awt.Point[x=100,y=92]
```
