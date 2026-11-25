
# ⚖️ Comparing Objects in Java

`==` checks whether two references point to the same object. To compare object values, override `equals`; also override `hashCode` so equal objects work correctly in hash-based collections.

The two `Point` objects below have the same coordinates but are separate objects. The `equals` method compares those values.

```java
package com.javalms;

public class Main {
    public static void main(String[] args) {
        var pointA = new Point(1, 2);
        var pointB = new Point(1, 2);

        System.out.println(pointA.equals(pointB));
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
