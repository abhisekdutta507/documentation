# ☕ Java Streams: Map, Filter, and Reduce

Use these three stream operations to work with array data: **change each item**, **keep matching items**, or **combine items into one result**. These patterns are common in Java code and often come up in interviews.

## 🔁 `map`: Change Every Item

`map` applies a function to each item and returns the transformed values. Here, it multiplies every number by three.

```java
package com.advancejavatutorials;

import java.util.Arrays;

public class Main {
    static void main() {
        int[] items = new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

        var tableOf3 = Arrays.stream(items)
            .map(item -> item * 3)
            .toArray();

        System.out.println(Arrays.toString(tableOf3));
    }
}

```

Output:

```txt
[3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
```

## 🎯 `filter`: Keep Matching Items

`filter` keeps only the items that pass a condition. This example selects the even numbers.

```java
package com.advancejavatutorials;

import java.util.Arrays;

public class Main {
    static void main() {
        int[] items = new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

        var evenItems = Arrays.stream(items)
            .filter(item -> item % 2 == 0)
            .toArray();

        System.out.println(Arrays.toString(evenItems));
    }
}

```

Output:

```txt
[2, 4, 6, 8, 10]
```

## ➕ `reduce`: Combine Items into One Result

`reduce` combines the items into a single value. The starting value here is `0`, and `Integer::sum` adds each number to the running total.

```java
package com.advancejavatutorials;

import java.util.Arrays;

public class Main {
    static void main() {
        int[] items = new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

        var sumOfItems = Arrays.stream(items)
            .reduce(0, Integer::sum);

        System.out.println(sumOfItems);        
    }
}

```

Output:

```txt
55
```

### 🔗 Method Reference and Lambda Equivalent

`Integer::sum` is a method reference: a shorter way to refer to the existing `sum` method. It does the same work as the lambda expression `(a, b) -> a + b`.

```java
var sumOfItems = Arrays.stream(items)
    .reduce(0, Integer::sum);
```

The equivalent lambda expression is:

```java
var sumOfItems = Arrays.stream(items)
    .reduce(0, (a, b) -> a + b);
```

### 🧠 Interview Reminder

- **`map` transforms** each item.
- **`filter` selects** items that match a condition.
- **`reduce` combines** items into one result.
