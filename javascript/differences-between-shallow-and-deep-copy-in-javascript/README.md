# What is shallow copy in javascript?

## A shallow copy creates a new object or array and copies the primitive values of the original object or array's properties into it. For non-primitive values (like objects or arrays), it copies the references.

### GUIDE

#### Example:

```js
const original = {
  name: 'Abhisek',
  address: {
    lane1: '43/31 Nabapally 22 Bigha, P.O.: Joka, Thakurpukur',
    pin: 700104,
  },
};

const shallowCopy = original;
// or
const shallowCopy = Object.assign({}, original);
// or
const shallowCopy = { ...original };

shallowCopy.address.pin = 700063;
console.log(original.address); // Output: 700063
```

#### How to get rid of this issue?

The solution is `Deep Copy`. A deep copy creates a new object or array and recursively copies all objects and arrays found within the original. This ensures a complete duplication of the entire structure.

1. We can use **JSON.parse(JSON.stringify())** to do a deep copy. But it has limitations. It cannot handle `functions`, `undefined`, `Date objects`, etc.

2. **Manual Recursive Function:** Custom function to handle deep copy, especially for complex structures.

3. **Libraries:** Libraries like Lodash provide a cloneDeep method for deep copying.

#### Manual Recursive Function

```js
function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepCopy(item));
  }

  const copiedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copiedObj[key] = deepCopy(obj[key]);
    }
  }
  return copiedObj;
}

const deepCopyObject = deepCopy(original);

deepCopyObject.address.pin = 700063;
console.log(original.address); // Output: 700104
```
