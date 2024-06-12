### What is var args or variable arguments?

The `variable arguments` (often referred to as `var args`) allow functions to accept a variable number of arguments. There are two main ways to handle variable arguments in JavaScript:

  - Using the **arguments** object
  - Using **ES6 rest parameters**

#### Using the **arguments** object:

The `arguments` object is an array-like object available within all non-arrow functions. It contains all the arguments passed to the function.

```js
function sum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

console.log(sum(1, 2, 3, 4)); // Output: 10

```

#### Using **ES6 rest parameters**:

Rest parameters provide a more modern and readable way to handle variable arguments.

```js
function sum(...numbers) {
  let total = 0;
  for (let number of numbers) {
    total += number;
  }
  return total;
}

console.log(sum(1, 2, 3, 4)); // Output: 10

```

#### Characteristics:

  * **Array:** The rest parameter is a real array, we can traverse & access it's elements.
  * **Must be the last parameter:** The rest parameter must be the last parameter in the function definition.

```js
function multiply(factor, ...numbers) {
  return numbers.map(number => number * factor);
}

console.log(multiply(2, 1, 2, 3)); // Output: [2, 4, 6]

```
