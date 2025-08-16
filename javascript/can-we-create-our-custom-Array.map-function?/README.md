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

Create the custom **myMap** using **TypeScript**.

```ts
function myMap<T>(callback: (item: T, index: number, items: T[]) => T) {
  const updatedItems: T[] = [];
  for (let index = 0; index < this.length; index++) {
    const item = this[index];
    updatedItems.push(callback(item, index, this));
  }
  return updatedItems;
}

Object.assign(Array.prototype, { myMap });
```

Create the custom **myMap** using **TypeScript** as a regular function not an Array prototype.

```ts
function myMap<T>(items: T[], callback: (item: T, index: number, items: T[]) => T) {
  const updatedItems: T[] = [];
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    updatedItems.push(callback(item, index, items));
  }
  return updatedItems;
}
```

Usage,

```javascript
const numbers = [1, 2, 3];

const doubledNumbers = numbers.myMap(number => number * 2);
console.log(doubledNumbers); // Output: [2, 4, 6]
```
