# 🔍 String Comparison in Java: Beyond Simple Equality
*A guide focusing on the complexities of comparing strings. Learn when to use `.equals()`, `.equalsIgnoreCase()`, and why `==` often fails for objects.*

We use `item.equals("")` to compare string.

```java
import java.util.Locale;
import java.util.Scanner;

public class Main {
    static void main() {
        String input = "";
        do {
            System.out.print("Input: ");
            Scanner scanner = new Scanner(System.in);
            input = scanner.nextLine();
        } while (!input.toLowerCase(Locale.ROOT).equals("quit"));
    }
}
```
