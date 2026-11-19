# 🧩 Interface Segregation Principle in Java

The Interface Segregation Principle (ISP) says that a class should not have to implement methods it does not use. Prefer small interfaces that each describe one focused job.

#### Why do we need Interface Segregation?
- Break down Complex interfaces into smaller interfaces
- Improves abstraction by hiding lot of unnecessary functionalities


#### Example of a polluted interface

Here we have an interface called `Store`.

```java
public interface Store {
    public void save();
    public void delete();
    public void update();
    public void fetch();
}
```

We have a `DBStore` class that implements all the methods.

```java
public class DBStore implements Store {
    @Override
    public void save() {

    }

    @Override
    public void save() {
        
    }

    @Override
    public void save() {
        
    }

    @Override
    public void save() {
        
    }
}
```

But, now we need to implement a `CacheStore` class.

```java
public class DBStore {
    @Override
    public void addKey() {

    }

    @Override
    public void deleteKey() {
        
    }

    @Override
    public void evictKey() {
        
    }
}
```

Here we can not implement the interface `Store`. Neigther we should add the `addKey`, `deleteKey` or `evictKey` methods in the interface. That will violate the single responsiblity principle.

Instead we should have 2 different interfaces like `IDatabaseStore` & `ICacheStore`,

IDatabaseStore.java

```java
public interface IDatabaseStore {
    public void save();
    public void delete();
    public void update();
    public void fetch();
}
```

ICacheStore.java

```java
public interface ICacheStore {
    public void addKey();
    public void deleteKey();
    public void evictKey();
}
```

Then the classes can implement this interfaces.
