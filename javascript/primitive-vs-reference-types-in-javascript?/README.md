## What are Primitive/Value Types in JavaScript?

The Primitive/Value types are as follows,

  * Number
  * String
  * Boolean
  * Symbol
  * undefined
  * null

## What are Object/Reference Types in JavaScript?

The Object/Reference types are as follows,

  * Object
  * Function
  * Array

### In JavaScript, Functions & Arrays are also Objects.

Here are some examples,

```ts
function isTrue(bool: boolean): string {
  if (new Boolean(bool)) {
    return "TRUE";
  } else {
    return "FALSE";
  }
}

console.log(isTrue.name);
console.log(isTrue.length);
```

The outputs are,

```sh
isTrue  // only works when created using function keyword
1       // no of arguments
```

Even if we did not set the properties **name** & **length** to the **function isTrue** but they are automatically created by JavaScript.

```ts
const list = [1, 2, 3];
console.log(typeof list);
```

The output is,

```sh
object
```

#### Tricky Interview Question

**What will be the output of the below snippet?**

```ts
let count = 10;

function increment(count: number) {
  count++;
}

increment(count);
console.log(count);
```

The output will be:

```sh
10
```

**What will be the output of the below snippet?**

```ts
let count = { value: 10 };

function increment(count: { value: number }) {
  count.value++;
}

increment(count);
console.log(count);
```

The output will be:

```sh
{ value: 11 }
```

**The above 2 snippets are identical but their results are different. Explain why?**

In the first snippet we are using **primitive data type**. So, when calling the function we actually create a new variable **count**.

But in the second snippet we are using **reference data type**. So, instead of creating a new variable we simply assign the reference of the first object.
