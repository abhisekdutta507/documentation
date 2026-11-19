What is an Array in Java?

```java
package com.javalms;

import java.util.Arrays;

public class Main {
    static void main() {
        byte[] numbers = new byte[10];
        System.out.println(Arrays.toString(numbers));
    }
}
```

Output:

```sh
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
```

```java
import java.util.Arrays;

public class Main {
    static void main() {
        byte[] numbers = {2, 3, 5, 1, 4};
        System.out.println(Arrays.toString(numbers));
    }
}
```

Output:

```sh
[2, 3, 5, 1, 4]
```

### Sort the Array elements

```java
import java.util.Arrays;

public class Main {
    static void main() {
        byte[] numbers = {2, 3, 5, 1, 4};
        Arrays.sort(numbers);
        System.out.println(Arrays.toString(numbers));
    }
}
```

Output:

```sh
[1, 2, 3, 4, 5]
```
