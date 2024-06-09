# What is `this` pointer?

## In JavaScript, the `this` keyword is a reference to the context in which a function is executed.

### GUIDE

### `Global` Context

#### When used globally (i.e., outside of any function), `this` refers to the global object, which is `window` in browsers and `global` in Node.js.

#### Example 1:

```js
/*
 * @description when executed using Node.js runtime, `this` is an empty object `{}`.
 * When executed from Browser, `this` is object `Window`.
 */
console.log('@logger this is ', this);
```

### `Function` Context

#### When used inside a regular function, the value of `this` depends on how the function is called:

#### Example 2:

```js
'use strict'
/*
 * @description when executed with 'use strict' using Node.js runtime or Browser, `this` is undefined.
 */
function whatIsThis() {
  console.log('@logger this is ', this);
}

whatIsThis();
```

#### We must mention the context before calling the function using `call`, `apply` or `bind`.

#### Example 3:

```js
'use strict'

function whatIsThis() {
  console.log('@logger this is ', this);
}

const objectA = {
  name: 'Abhisek Dutta'
};

whatIsThis.call(objectA); // `this` is { name: 'Abhisek Dutta' }
```

#### What if we pass `this` from outside while calling the function using `call`.

#### Example 4:

```js
'use strict'

function whatIsThis() {
  console.log('@logger this is ', this);
}

whatIsThis.call(this); // `this` is {}. Exactly similar to Example 1.
```

#### When executed in non-strict mode.

#### Example 5:

```js
/*
 * @description when executed using Node.js runtime, `this` is object `Global`.
 * If executed using Browser, `this` is object `Window`.
 */
function whatIsThis() {
  console.log('@logger this is ', this);
}

whatIsThis();
```

#### Let's add some properties using the `this` keyword.

#### Example 6:

```js
/*
 * @description when executed using Node.js runtime, `this` is object `Global`.
 * If executed using Browser, `this` is object `Window`.
 */
function whatIsThis() {
  this.fistName = 'Abhisek';
  this.lastName = 'Dutta';
  
  console.log('@logger this is ', this); // It's either `Global` or `Window` but along with that `this` will have `fistName` & `lastName` props in it.
}

whatIsThis();
```

### `Method` Context

#### When a function is called as a method of an object, `this` refers to the object on which the method was called.

#### Example 7:

```js
const myObject = {
  name: 'Abhisek Dutta',
  getName: function() {
    return this.name; // `this` refers to myObject
  }
};

console.log(myObject.getName()); // Abhisek Dutta
```

#### When `this` is used in an `arrow function` then the function will inherit `this` from it's parent scope.

#### Example 8:

```js
const myObject = {
  name: 'Abhisek Dutta',
  age: 10,
  getName: function() {
    return this.name;
  },
  getThis: () => {
    return this;
  },
};

console.log(myObject.getName()); // `this` refers to myObject
console.log(myObject.getThis()); // `this` refers to Example 1. Either empty object or Window.
```

#### When we wrap the above example within a lexical scope then,

#### Example 9:

```js
function main() {
  this.age = 15;

  const myObject = {
    name: 'Abhisek Dutta',
    age: 10,
    getName: function() {
      return this.name;
    },
    getAge: () => {
      return this.age;
    },
  };

  console.log(myObject.getName());  // `this` refers to myObject. Output: Abhisek Dutta
  console.log(myObject.getAge());   // `this` refers to main. Output: 15
}

main();
```
