# 💳 Mortgage Calculator: A Practical Java Financial Tool
*A complete console application demonstrating input validation, complex financial calculations, and formatted output in Java.*

```sh
Principal: 10000
Annual Interest Rate: 9
Period (Years): 1

MORTGAGE
--------------------

₹874.51


PAYMENT BREAKDOWN
--------------------

₹10,494.11
₹9,619.60
₹8,745.09
₹7,870.58
₹6,996.07
₹6,121.56
₹5,247.05
₹4,372.54
₹3,498.04
₹2,623.53
₹1,749.02
₹874.51
₹0.00
```

Code:

```java
import java.text.NumberFormat;
import java.util.Locale;
import java.util.Scanner;

public class Main {
    static final byte PERCENTAGE = 100;
    static final byte MONTHS_IN_A_YEAR = 12;

    static double readDouble(String prompt, double min, double max) {
        double value;

        while (true) {
            Scanner scanner = new Scanner(System.in);
            System.out.print(prompt);

            try {
                value = scanner.nextDouble();
                if (value >= min && value <= max)
                    break;
                else
                    throw new Error();
            } catch (Exception exception) {
                System.out.println("Enter a value between " + min + " and " + max);
            }
        }

        return value;
    }

    static double calculateMortgage(double principal, float annualInterestRate, byte periodsInYear) {
        float monthlyInterestRate = annualInterestRate / PERCENTAGE / MONTHS_IN_A_YEAR;
        byte noOfPayments = (byte) (periodsInYear * MONTHS_IN_A_YEAR);

        double constant = Math.pow((1 + monthlyInterestRate), noOfPayments);
        return principal * ((monthlyInterestRate * constant) / (constant - 1));
    }

    static void printLoanPaymentBreakdown(double mortgage, byte periodsInYear, NumberFormat currency) {
        byte noOfPayments = (byte) (periodsInYear * 12);
        double totalAmountToBePaid = mortgage * noOfPayments;

        while (totalAmountToBePaid > 0) {
            System.out.println(currency.format(totalAmountToBePaid));
            totalAmountToBePaid = totalAmountToBePaid - mortgage;
        }

        System.out.println(currency.format(0));
    }

    static void main() {
        double P = readDouble("Principal: ", 100, 1000000);
        float annualInterestRate = (float) readDouble("Annual Interest Rate: ", 1, 10);
        byte periodsInYear = (byte) readDouble("Period (Years): ", 1, 30);
        double M = calculateMortgage(P, annualInterestRate, periodsInYear);

        Locale locale = new Locale("en", "IN");
        NumberFormat currency = NumberFormat.getCurrencyInstance(locale);

        System.out.println("\nMORTGAGE");
        System.out.println("--------------------\n");
        System.out.println(currency.format(M) + "\n");

        System.out.println("\nPAYMENT BREAKDOWN");
        System.out.println("--------------------\n");
        printLoanPaymentBreakdown(M, periodsInYear, currency);
    }
}
```
