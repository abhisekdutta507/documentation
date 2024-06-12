### Can we create our custom Array.map function?

We define a new method named myMap on the `Array.prototype` object. This allows us to call myMap on any array instance.

#### Example

Create a custom `myMap` that works exactly same as `map`.

```javascript
Array.prototype.myMap = function(callback) {
  const newArray = [];
  for (let i = 0; i < this.length; i++) {
    const element = this[i]; // Access current element
    const result = callback(element, i, this); // Call callback with element, index, and array
    callback(element, i, this);
    newArray.push(result);
  }
  return newArray;
};
```

Usage,

```javascript
const numbers = [1, 2, 3];

const doubledNumbers = numbers.myMap(number => number * 2);
console.log(doubledNumbers); // Output: [2, 4, 6]
```
