### What is Array.map()?

In JavaScript, with `Array.prototype.map()` we can prepare a new array from another array elements.

#### Syntax

```javascript
Array.map(callback(currentValue, index, Array), thisArg);
```

- **callback**: A function that is executed on each element of the array. It takes three arguments:
  - **currentValue**: The current element being processed in the array.
  - **index** (optional): The index of the current element being processed.
  - **array** (optional): The array `map` was called upon.
- **thisArg** (optional): Value to use as `this` when executing the callback function.

#### Key Characteristics

- **Returns a new array**: `map` does not modify the original array; it creates a new array with the transformed elements.

#### Basic Example

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

In this example, each element of the `numbers` array is multiplied by 2, and the result is stored in the `doubled` array.

#### Using Index and Array Parameters

```javascript
const numbers = [1, 2, 3, 4, 5];
const result = numbers.map((num, index, array) => {
  return `${num} is at index ${index} in [${array.join(', ')}]`;
});
console.log(result);
/*
[
  '1 is at index 0 in [1, 2, 3, 4, 5]',
  '2 is at index 1 in [1, 2, 3, 4, 5]',
  '3 is at index 2 in [1, 2, 3, 4, 5]',
  '4 is at index 3 in [1, 2, 3, 4, 5]',
  '5 is at index 4 in [1, 2, 3, 4, 5]'
]
*/
```

This example shows how you can use the `index` and `array` parameters to get more information about each element during the transformation.

#### Using `thisArg`

```javascript
const multiplier = {
  factor: 2,
  multiply(num) {
    return num * this.factor;
  }
};

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(num) {
  return this.multiply(num);
}, multiplier);

console.log(doubled); // [2, 4, 6, 8, 10]
```

In this example, we pass an object (`multiplier`) as `thisArg` to the `map` method. Inside the callback function, `this` refers to the `multiplier` object.
