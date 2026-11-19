### What is Dependency Injection?

Example of a dependant classes.

TaxCalculator2026.java

```java
package com.javalms;

public class TaxCalculator2026 {
    private double taxableIncome;

    public TaxCalculator2026(double taxableIncome) {
        this.taxableIncome = taxableIncome;
    }

    @Override
    public double calculateTax() {
        return taxableIncome * 0.4;
    }
}
```

TaxCalculator2027.java

```java
package com.javalms;

public class TaxCalculator2027 {
    private double taxableIncome;

    public TaxCalculator2027(double taxableIncome) {
        this.taxableIncome = taxableIncome;
    }

    @Override
    public double calculateTax() {
        return taxableIncome * 0.3;
    }
}
```

TaxReport.java

```java
package com.javalms;

public class TaxReport {
    private TaxCalculator2026 calculator;

    public TaxReport(double taxableIncome) {
        calculator = new TaxCalculator2026(taxableIncome);
    }

    public void show() {
        var tax = calculator.calculateTax();
        System.out.println("Tax: " + tax);
    }
}
```

In the above example the `TaxReport` class is dependant on `TaxCalculator2026`. When the year is changed to 2027 we have to modify the `TaxReport` class. Also, if the calculation logic changes in both the `TaxCalculator2026` & `TaxCalculator2027` classes the `TaxReport` class has to be also compiled along with `TaxCalculator2026` & `TaxCalculator2027`.

This coupling is considered as a bad practice for production grade applications. To de-couple them we can introduce `Dependancy Injection`.

We introduce an interface `TaxCalculator.java`.

TaxCalculator.java

```java
package com.javalms;

public interface TaxCalculator {
    double calculateTax();
}
```

First, we change the `TaxCalculator2026` & `TaxCalculator2027` classes like below,

```java
package com.javalms;

public class TaxCalculator2027 implements TaxCalculator {
    private double taxableIncome;

    public TaxCalculator2027(double taxableIncome) {
        this.taxableIncome = taxableIncome;
    }

    @Override
    public double calculateTax() {
        return taxableIncome * 0.3;
    }
}
```

Then we change the class `TaxReport`. It removes the dependancy from both `TaxCalculator2026` & `TaxCalculator2027` classes.

TaxReport.java

```java
package com.javalms;

public class TaxReport {
    private TaxCalculator calculator;

    public void show() {
        var tax = calculator.calculateTax();
        System.out.println("Tax: " + tax);
    }

    public void setCalculator(TaxCalculator calculator) {
        this.calculator = calculator;
    }
}
```

Now we change the `Main.java`.

```java
package com.javalms;

public class Main {
    public static void main(String[] args) {
        var report = new TaxReport();
        report.setCalculator(new TaxCalculator2026(10000));
        report.show();
    }
}
```

#### How many ways we can do Dependancy Injection?

- Contructor Injection
- Setter Injection (The above example)
- Method Injection
