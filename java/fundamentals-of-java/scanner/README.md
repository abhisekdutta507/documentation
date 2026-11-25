# 📥 The Scanner Class in Java: Robust Input Handling
*A guide to using the `java.util.Scanner` class for reading user input. This is a crucial skill for creating console-based Java applications.*

```java
import java.util.Scanner;

public class Main {
    static void main() {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Type next line: ");
        String nextLine = scanner.nextLine();

        try {
            double d = Double.parseDouble(nextLine);
            byte input = (byte) d;
            System.out.println("Next line is: " + input);
        } catch (Exception exception) {
            System.out.println("ERROR: " + exception.getMessage());
        }
    }
}
```
