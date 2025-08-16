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

2. Using `ES2020 Private Fields`: Private fields are the most modern and straightforward approach, but require support for ES2020.

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

3. Using ES6 Classes with `WeakMaps`: WeakMaps provide a way to create private variables in ES6 and beyond.

### Can we consider using **WeakMap** to create private variables?

The answer should be **no**. Private variables should not be directly accessible from outside the class. But with **WeakMap** we can actually change the value from outside the class.

```js
const privateData = new WeakMap();

class Counter {
  constructor() {
    privateData.set(this, { count: 0 });
  }

  increment() {
    const data = privateData.get(this);
    return ++data.count;
  }

  decrement() {
    const data = privateData.get(this);
    return --data.count;
  }

  getCount() {
    const data = privateData.get(this);
    return data.count;
  }
}

const counter = new Counter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.increment()); // 3
console.log(counter.decrement()); // 2
console.log(counter.getCount());  // 2
console.log(counter.count);       // undefined
console.log(privateData);         // WeakMap { <items unknown> }
```

#### How do we change the count from outside the class?

```ts
const privateData = new WeakMap();
const counter = new Counter();

const data = privateData.get(counter);
data.count = 10;
console.log(counter.getCount());  // 10
```
