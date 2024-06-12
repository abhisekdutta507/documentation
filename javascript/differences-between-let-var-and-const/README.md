### Differences between let, const & var.

In JavaScript, let, const, and var are used to declare variables, but they have different characteristics and scopes.

#### **var**

  * **Scope:**
    * **Function Scope:** Variables declared with `var` within a function are function-scoped. They are only accessible within the function they are declared in.
    * **Global Scope:** If declared outside a function, `var` variables are globally scoped.

  * **Hoisting:**
    * Variables declared with `var` are hoisted at the top of their scope. But initialized with `undefined`.

  * **Re-declaration:**
    * Variables declared with `var` can be re-declared within the same scope.

We can re-declare and use variables declared using `var`.

```js
console.log(age); // Output: undefined

var age = 10;
var age = 12;

console.log(age); // Output: 12

function multiplyBy2(_a = 0) {
  {
    var a = _a;
    var b = 2;
  }
  return a * b; // a & b are function scoped
}

console.log(multiplyBy2(20)); // Output: 40
// but
console.log(a); // ReferenceError: a is not defined
```

#### **let**

  * **Scope:**
    * **Block Scope:** Variables declared with `let` are block-scoped. Meaning they are only accessible within the block (**{}**) they are declared in.
  
  * **Hoisting:**
    * Variables declared with `let` are not hoisted. This results in a **ReferenceError** if we try to access them before the declaration.

  * **Re-declaration:**
    * Variables declared with `let` cannot be re-declared within the same scope. But we can assign values to them.

We cannot re-declare variables declared using `let`. But we can re-assign values to them.

```js
function multiplyBy2(_a = 0) {
  let a = 10;
  let b = 2;
  a = _a; // correct syntax
  return a * b;
}

console.log(a); // ReferenceError: a is not defined
// but
console.log(multiplyBy2(20)); // Output: 40

// but
function multiplyBy3(_a = 0) {
  {
    let a = _a;
    let b = 3;
  }
  return a * b; // a & b are block-scoped. cannot access here
}

console.log(multiplyBy3(20)); // ReferenceError: a is not defined
```

#### **const**

  * **Scope:**
    * **Block Scope:** Variables declared with `cost` are block-scoped. Meaning they are only accessible within the block (**{}**) they are declared in.
  
  * **Hoisting:**
    * Variables declared with `const` are not hoisted. This results in a **ReferenceError** if we try to access them before the declaration.

  * **Re-declaration:**
    * Variables declared with `const` cannot be re-declared within the same scope.
    * Also, we cannot assign values to them.

  * **Mutability**
    * The variables do not allow reassignment but it does not make the value immutable. Objects and Arrays declared with `const` can be modified after declaration.

We cannot re-assign variables declared using `const`.

```js
function multiplyBy4(_a = 0) {
  const a = 10;
  const b = 4;
  a = _a; // incorrect syntax
  return a * b;
}

console.log(multiplyBy4(20)); // TypeError: Assignment to constant variable.

// but
function multiplyBy4(_number = { a: 0 }) {
  const number = {
    a: 10,
    b: 4
  };
  number.a = _number.a; // correct syntax
  return number.a * number.b;
}

console.log(multiplyBy4({ a: 20 })); // Output: 80
```
