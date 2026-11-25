# Lambda Expressions and Functional Interfaces

Lambda expressions provide a short syntax for implementing functional
interfaces. They are commonly used with streams and the Collections API.

## Functional Interface

A **functional interface** has exactly one abstract method.

```java
@FunctionalInterface
interface Greeting {
    void sayHello(String name);
}
```

## Lambda Expression

A lambda can implement that interface without a separate class:

```java
Greeting greeting = name -> System.out.println("Hello, " + name);
greeting.sayHello("Java");
```

## Common Functional Interfaces

| Interface | Abstract method | Purpose |
|---|---|---|
| `Predicate<T>` | `boolean test(T value)` | Test a condition |
| `Function<T,R>` | `R apply(T value)` | Transform a value |
| `Consumer<T>` | `void accept(T value)` | Perform an action |
| `Supplier<T>` | `T get()` | Produce a value |

## Examples

```java
Predicate<Integer> isPositive = value -> value > 0;
Function<Integer, String> toText = value -> "Value: " + value;
Consumer<String> print = System.out::println;
Supplier<Double> randomValue = Math::random;
```

## Lambda with Streams

```java
List<Integer> scores = List.of(85, 42, 91, 60);

List<Integer> passed = scores.stream()
    .filter(score -> score >= 60)
    .map(score -> score + 5)
    .toList();
```

## Method References

A method reference is a shorter form of a lambda when the lambda only calls a
method.

```java
names.forEach(System.out::println);
```

This is similar to:

```java
names.forEach(name -> System.out.println(name));
```

## Interview Quick Notes

- A lambda is not a method; it provides an implementation of a functional
  interface.
- An interface can remain functional when it has default or static methods.
- Lambdas are useful for callbacks, filtering, mapping, sorting, and event
  handling.