### What is Method Overloading in Java?

Method overloading happens when a class has multiple methods with the same name but a different signature (differing in the number, type, or order of their parameters).

```java
public class Employee {
    private int baseSalary;
    private int hourlyRate;

    public int calculateWage(int extraHours) {
        return getBaseSalary() + getHourlyRate() * extraHours;
    }

    public int calculateWage() {
        return getBaseSalary();
    }

    private int getBaseSalary() {
        return baseSalary;
    }

    private int getHourlyRate() {
        return hourlyRate;
    }
}
```