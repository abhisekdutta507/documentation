### What are Generics in Java?

#### Generic of Reference Types

GenericList.java

```java
package com.advancejavatutorials.generics;

public class GenericList<T> {
    private final T[] items = (T[]) new Object[10];
    private short count;

    public void append(T item) {
        items[count++] = item;
    }

    public T getItem(short index) {
        return items[index];
    }
}
```

How to use it in Main.java?

```java
package com.advancejavatutorials;

import com.advancejavatutorials.generics.GenericList;

public class Main {
    public static void main() {
        var list = new GenericList<Short>();
        list.append((short) 10);

        try {
            short item = list.getItem((short) 0);
            System.out.println(item);
        } catch (ArrayIndexOutOfBoundsException ex) {
            System.out.println(ex.getMessage());
        }
    }
}

```

##### What are the limitations?

The below snippet is illegal. As we can not pass Primitive types into a Generic of reference types.

```java
package com.advancejavatutorials;

import com.advancejavatutorials.generics.GenericList;

public class Main {
    public static void main() {
        var list = new GenericList<int>();
    }
}
```

#### What is Boxing & Unboxing?

The GenericList is a type of Reference type `Integer`. When we pass an instance of Integer `list.append(10);` we call it Boxing.

When we fetch the value back `int item = list.getItem(0); // Unboxing` we call it Unboxing.

```java
package com.advancejavatutorials;

import com.advancejavatutorials.generics.GenericList;

public class Main {
    public static void main() {
        GenericList<Integer> list = new GenericList<>();
        list.append(10); // Boxing
        int item = list.getItem(0); // Unboxing
        System.out.println(item);
    }
}
```

#### Adding Constraints

```java
public class GenericList<T extends Number> {
    // ...
}
```

It will allow only Number type of GenericList to be created.

#### The Comparable Interface

The Comparable interface takes a generic type.

```java
package com.advancejavatutorials;

public class User implements Comparable<User> {
    private int points;

    public User(int points) {
        this.points = points;
    }

    @Override
    public int compareTo(User other) {
        return points - other.points;
    }
}
```

How do we use it?

```java
package com.advancejavatutorials;

import com.advancejavatutorials.generics.User;

public class Main {
    static void main() {
        var user1 = new User(10);
        var user2 = new User(20);
        System.out.println(user1.compareTo(user2));
    }
}
```

Output

```txt
-10
```

#### Generic Methods

```java
package com.advancejavatutorials.generics;

public class Utils {
    public static <T extends Comparable> T max(T first, T second) {
        return (first.compareTo(second) > 0) ? first : second;
    }
}

```

Main.java

```java
package com.advancejavatutorials;

import com.advancejavatutorials.generics.Utils;

public class Main {
    static void main() {
        System.out.println(Utils.max(10, 99)); // 99
    }
}
```

#### Multiple Type Parameters

```java
public static <K, V> void print(K key, V value) {
    System.out.println(key + " = " + value);
}
```

#### Wildcards

Utils.java

```java
package com.advancejavatutorials.generics;

public class Utils {
    public static void printUser(User user) {
        System.out.println(user);
    }

    public static void printUsers(GenericList<User> users) {
        System.out.println(users);
    }
}

```

Main.java

This is a valid syntax. The `Instructor` class is a sub class of `User`.

```java
User user = new Instructor(10);
```

That makes the below snippet also valid.

```java
Utils.printUser(new User(10));
Utils.printUser(new Instructor(10));
```

##### The Problem

But, the `printUsers` method only takes a `GenericList` of type `User`. Instead if we pass `new GenericList<Instructor>()` that will throw compilation error.

```java
Utils.printUsers(new GenericList<User>()); 
Utils.printUsers(new GenericList<Instructor>()); // COMPILATION ERROR   
```

##### The Solution

```java
public static void printUsers(GenericList<? extends User> users) {
    System.out.println(users);
}
```
