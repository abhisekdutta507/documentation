### What is closure? How to create private variables using JavaScript?

A closure gives you access to an outer function's scope from an inner function. In JavaScript we can create private variables using **Closure** & **Private Field**.

#### GUIDE

1. Using `Closure`: Closures are useful for simple use cases and can be implemented in older JavaScript versions.

#### Example:

```js
function createCounter() {
  let count = 0; // private variable

  function increment() {
    return ++count;
  }

  function decrement() {
    return --count;
  }

  function getCount() {
    return count;
  }

  return {
    increment,
    decrement,
    getCount,
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.increment()); // 3
console.log(counter.decrement()); // 2
console.log(counter.getCount());  // 2
console.log(counter.count);       // undefined
```

2. We can also use JavaScript Constructor to create private variable.

#### Example:

```ts
function Counter() {
  let count = 0; // private variable

  this.increment = function increment() {
    return ++count;
  }

  this.decrement = function decrement() {
    return --count;
  }

  this.getCount = function getCount() {
    return count;
  }
}

const counter = new Counter();
```

3. Using `ES2020 Private Fields`: Private fields are the most modern and straightforward approach, but require support for ES2020.

#### Example:

```js
class Counter {
  #count = 0; // private field

  increment() {
    return ++this.#count;
  }

  decrement() {
    return --this.#count;
  }

  getCount() {
    return this.#count;
  }
}

const counter = new Counter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.increment()); // 3
console.log(counter.decrement()); // 2
console.log(counter.getCount());  // 2
console.log(counter.#count);      // SyntaxError: Private field '#count' must be declared in an enclosing class
```

### Can we consider using **WeakMap** to create private variables?

The answer should be **no**. Private variables should not be directly accessible from outside the class. But with **WeakMap** we can actually change the value from outside the class.

```ts
class Counter {
  privateField: WeakMap<object, { count: number }>;

  constructor(_c: number) {
    this.privateField = new WeakMap();
    this.privateField.set(this, { count: _c });
  }

  getCount() {
    const field = this.privateField.get(this) || { count: 0 };
    return field.count;
  }

  increment() {
    const field = this.privateField.get(this) || { count: 0 };
    return ++field.count;
  }

  decrement() {
    const field = this.privateField.get(this) || { count: 0 };
    return --field.count;
  }
}

const counter = new Counter(0);
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.increment()); // 3
console.log(counter.decrement()); // 2
console.log(counter.getCount());  // 2
console.log(counter.privateField);         // WeakMap { <items unknown> }
```

#### How do we change the count from outside the class?

```ts
const counter = new Counter(0);
counter.privateField.set(counter, { count: 10 });
console.log(counter.getCount());  // 10
```
