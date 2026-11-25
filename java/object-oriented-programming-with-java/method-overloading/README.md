# 🔁 Method Overloading in Java

Method overloading lets a class use the same method name for related actions with different parameter lists. Java chooses which version to call based on the arguments.

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

### 🧠 Interview Reminder

Overloaded methods must differ by their parameters (number, types, or order). A different return type alone is not enough.