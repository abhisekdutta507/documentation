# Java Collections

The Java Collections Framework provides standard interfaces and implementations
for storing and processing groups of objects.

## Core Interfaces

| Interface | Ordered | Allows duplicates | Common implementations |
|---|---:|---:|---|
| `List` | Yes | Yes | `ArrayList`, `LinkedList` |
| `Set` | Usually no | No | `HashSet`, `LinkedHashSet`, `TreeSet` |
| `Queue` | Yes | Yes | `ArrayDeque`, `PriorityQueue` |
| `Map` | No guarantee | Keys: no; values: yes | `HashMap`, `LinkedHashMap`, `TreeMap` |

## List

Use `ArrayList` for fast indexed access and iteration. Use `LinkedList` when
frequent insertion or removal near the ends is important.

```java
List<String> names = new ArrayList<>();
names.add("Java");
names.add("Spring");
```

## Set

Use a `Set` when duplicate values must be prevented.

```java
Set<Integer> numbers = new HashSet<>();
numbers.add(10);
numbers.add(10); // Only one value is stored.
```

## Map

A `Map` stores key-value pairs. Keys must be unique within the map.

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 90);
Integer aliceScore = scores.get("Alice");
```

## Iteration

Use an enhanced `for` loop or `Iterator`. Use `Iterator.remove()` when removing
elements while iterating.

```java
for (String name : names) {
    System.out.println(name);
}
```

## Interview Quick Notes

- `ArrayList` has constant-time indexed access in typical cases.
- `HashMap` does not preserve insertion order.
- `LinkedHashMap` preserves insertion order; `TreeMap` keeps keys sorted.
- `HashSet` relies on `hashCode()` and `equals()` to identify duplicates.