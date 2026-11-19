
We have 2 Point instances. But when we compare the instances we get `false` as both the reference has different addresses in memory. So, we will override the `equals` method.

```java
package com.javalms;

public class Main {
    public static void main(String[] args) {
        var pointA = new Point(1, 2);
        var pointB = new Point(1, 2);

        System.out.println(pointA.equals(pointA));
    }
}
```

Point.java

```java
package com.javalms;

import java.util.Objects;

public class Point {
    private int x;
    private int y;

    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)  return true;
        if (!(o instanceof Point point)) return false;
        return x == point.x && y == point.y;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);
    }
}
```

Output

```sh
true
```
