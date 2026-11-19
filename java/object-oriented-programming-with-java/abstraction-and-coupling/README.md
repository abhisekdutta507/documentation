# 🎭 Abstraction and Coupling in Java

Abstraction gives callers a simple way to use an object while hiding how it works inside. In this example, callers use `calculateWage` without accessing or changing the employee's private salary details. This keeps callers focused on the operation instead of its implementation.

## Display Only the Needed Method

```java
package com.javalms;

import java.text.NumberFormat;
import java.util.Locale;

public class Main {
    public static void main(String[] args) {
        var employee = new Employee(
            50_000, 20);
        int wage = employee.calculateWage(10);

        Locale locale = new Locale("en", "IN");
        NumberFormat currency = NumberFormat.getCurrencyInstance(locale);
        System.out.println(currency.format(wage));
    }
}
```

```java
package com.javalms;

public class Employee {
    private int baseSalary;
    private int hourlyRate;

    Employee(int baseSalary, int hourlyRate) {
        setBaseSalary(baseSalary);
        setHourlyRate(hourlyRate);
    }

    public int calculateWage(int extraHours) {
        return getBaseSalary() + getHourlyRate() * extraHours;
    }

    private int getBaseSalary() {
        return baseSalary;
    }

    private void setBaseSalary(int baseSalary) {
        if (baseSalary <= 0)
            throw new IllegalArgumentException("Salary can not be 0 or less!");
        this.baseSalary = baseSalary;
    }

    private int getHourlyRate() {
        return hourlyRate;
    }

    private void setHourlyRate(int hourlyRate) {
        if (hourlyRate <= 0)
            throw new IllegalArgumentException("Hourly rate can not be 0 or less!");
        this.hourlyRate = hourlyRate;
    }
}
```
