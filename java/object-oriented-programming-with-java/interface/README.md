### What is an Interface in Java?

An Interface is a blueprint defining a specific set of behaviors a class must implement. It specifies what a class should do, but not how it should do it.

```java
package com.javalms;

public interface TaxCalculator {
    double calculateTax();
}
```

We implement the interface in class `TaxCalculator2027.java`

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

Take a look how we use the interface in the [Dependancy Injection](/java/object-oriented-programming-with-java/dependency-injection/README.md) example.
