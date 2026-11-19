### What is Math class in Java?


```java
public class Main {
    static void main() {
        float f1 = 10.4F;
        float f2 = 10.5F;

        byte b1 = (byte) Math.round(f1);
        System.out.println("Round of " + f1 + " = " + b1);

        byte b2 = (byte) Math.round(f2);
        System.out.println("Round of " + f2 + " = " +  b2 + "\n");

        byte b3 = (byte) Math.floor(f1);
        System.out.println("Floor of " + f1 + " = " +  b3 + "\n");

        byte b4 = (byte) Math.ceil(f1);
        System.out.println("Ceiling of " + f1 + " = " +  b4);
    }
}
```

Output:

```sh
Round of 10.4 = 10
Round of 10.5 = 11

Floor of 10.4 = 10

Ceiling of 10.4 = 11
```

#### Write a function that generates random number each time it is called.

```java
public class Main {
    static byte generateRandomNumber() {
        byte random = (byte) (Math.random() * 100);

        if (random < 10) {
            return (byte) (random + 10);
        } else if (random > 100) {
            return (byte) (random - 10);
        } else {
            return random;
        }
    }

    static void main() {
        System.out.println(generateRandomNumber());
    }
}
```
