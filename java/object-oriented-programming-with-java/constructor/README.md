# 🏗️ Constructors in Java

A constructor runs when you create an object. Use it to give the object its starting values. A constructor has the same name as its class and no return type.

```java
package com.javalms;

public class Employee {
    private int baseSalary;
    private int hourlyRate;

    Employee(int baseSalary, int hourlyRate) {
        setBaseSalary(baseSalary);
        setHourlyRate(hourlyRate);
    }
}

public class Main {
    public static void main(String[] args) {
        var employee = new Employee(50_000, 20);
    }
}
```