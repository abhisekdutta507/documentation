### What is Hoisting?

Hoisting is the default behavior of moving all the declarations at the top of the scope before the code execution.

#### **Hoisting** using **var** keyword.

```js
console.log(x);  // Output: undefined

var x = 5;
console.log(x);  // Output: 5
```

#### **Hoisting** using **function** keyword.

```js
console.log(sum(7, 9)); // Output: 16

function sum(a, b) {
  return a + b;
}
```

#### **let** and **const** are also hoisted. But the behaviour will be different than **var** and **function**.

```js
console.log(y);  // ReferenceError: Cannot access 'y' before initialization

let y = 10;
```

```js
console.log(x);  // ReferenceError: Cannot access 'x' before initialization

const x = 5;
```

#### Important Note.

The **var** keyword is hoisted and the value will be initialized with **undefined**.

```js
multiply(5, 4); // TypeError: multiply is not a function

var multiply = function(a, b) {
  return a * b;
};
```
