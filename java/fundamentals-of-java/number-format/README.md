# How to use a number format?

The class NumberFormat is imported from `java.text` package.

```java
import java.text.NumberFormat;
import java.util.Locale;

public class Main {
    static void main() {
        Locale locale = new Locale("en", "IN");
        NumberFormat currency = NumberFormat.getCurrencyInstance(locale);
        System.out.println(currency.format(1000000));
    }
}
```

Output:

```sh
₹1,000,000.00
```
