### Example of a Contructor


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