### What is function currying?

Function currying is a functional programming technique that involves breaking down a function into multiple functions where each function takes signle arguments as a parameter.

#### **function currying** using **bind prototype**.

```js
function multiply(x, y) {
  console.log(x * y);
}

multiply(3, 5);
// Output: 15

/**
 * @description function currying
 */
const multiplyByFive = multiply.bind(this, 5);

multiplyByFive(2); // Output: 10
```

#### **function currying** using **closure**.

```js
function multiply(x) {
  return function by(y) {
    // closure (multiply)
    // x: 4
    console.log(x * y);
  }
}

const multiplyByFour = multiply(4);

multiplyByFour(5); // Output: 20
```
