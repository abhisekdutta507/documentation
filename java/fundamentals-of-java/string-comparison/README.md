### Compare String

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
