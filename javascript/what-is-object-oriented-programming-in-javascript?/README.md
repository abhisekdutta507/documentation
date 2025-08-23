## What is Object-Oriented Programming?

In our daily programming journey we create variables & functions. Let's consider we are creating a variable `name` & a function `getName`.

```ts
let name: string = "Abhisek Dutta";

function getName() {
  return name;
}
```

In **Object-Oriented Programming** we create a group of the properties & the member functions. The group is called an object. And the technique of grouping will be called **Encapsulation**.

### What are the principles of Object-Oriented Programming?

The principles of **Object-Oriented Programming** (OOP) include,

  * [Encapsulation](./encapsulation/README.md)
  * [Abstraction](./abstraction/README.md)
  * [Inheritance](./inheritance/README.md)
  * [Polymorphism](./polymorphism/README.md)

These principles help to organize the code better and promote reusability.

### Create an object using object literals:

The below snippet is an example of an object declared using literals.

```ts
const circleA = {
  radius: 10,
  draw() {
    console.log("draw");
  },
};
```

Problems with literals are suppose, we have another object,

```ts
const circleB = {
  radius: 15,
  draw() {
    console.log("draw");
  },
};
```

### Create an object using object Factory Functions:

From here if we want to modify the **draw function** then we have to change in 2 different places. The best practice will be creating a **Factory Functions** to initialize the objects.

```ts
function createCircle(radius: number) {
  return {
    radius,
    draw() {
      console.log("draw");
    },
  };
}

const circleA = createCircle(10);
const circleB = createCircle(15);
```

### Create an object using JavaScript Constructor Function:

Similar to Factory Functions we can also create objects using Contructor Function in JavaScript.

```ts
function Circle(radius: number) {
  this.radius = radius;
  this.draw = function() {
    console.log("drawing circle with radius", this.radius);
  }
}

const circleA = new Circle(10);
const circleB = new Circle(15);
```

We must use the `new` keyword to create an object. Otherwise we will get a compilation error.

```sh
this.radius = radius;

TypeError: Cannot set properties of undefined (setting 'radius')
```

The function name can also start with `c`. That means the below snippet is also valid.

```ts
function circle(radius: number) {
  this.radius = radius;
  this.draw = function() {
    console.log("drawing circle with radius", this.radius);
  }
}
```

### Every object has a constructor:

In either way we declare an object, all of them will have a default constructor.

```ts
const circleA = {
  radius: 10,
  draw() {
    console.log("draw");
  },
};

console.log(circleA.constructor); // Is a valid function
```

When created using **Factory Function**:

```ts
function createCircle(radius: number) {
  return {
    radius,
    draw() {
      console.log("draw");
    },
  };
}

const circleA = createCircle(10);
console.log(circleA.constructor); // Is a valid function
```

If we create using **Constructor**:

```ts
function Circle(radius: number) {
  this.radius = radius;
  this.draw = function() {
    console.log("drawing circle with radius", this.radius);
  }
}

const circleA = new Circle(10);
console.log(circleA.constructor); // Is a valid function
```

When created using **Constructor** we can also use the **Constuctor** to modify the object.

```ts
function Circle(radius: number) {
  this.radius = radius;
  this.draw = function() {
    console.log("drawing circle with radius", this.radius);
  }
}

const circleA = new Circle(10);
circleA.draw(); // drawing circle with radius 10

circleA.constructor(25);
circleA.draw(); // drawing circle with radius 25
```

### JavaScript has it's inbuilt constructors:

Using the constructors we can create objects as shown below,

```ts
const objectA = new Object();   // {}
const stringA = new String();   // [String: '']
const numberA = new Number();   // [Number: 0]
const booleanA = new Boolean(); // [Boolean: false]
const functionA = new Function(); // function anonymous() {}
const errorA = new Error();
const typeErrorA = new TypeError();
const referenceErrorA = new ReferenceError();
```

#### Tricky Interview Question

**What is the output of the given code snippet?**

```ts
function isTrue(bool: boolean): string {
  if (new Boolean(bool)) {
    return "TRUE";
  } else {
    return "FALSE";
  }
}

console.log(isTrue(true));  // TRUE
console.log(isTrue(false)); // TRUE
```

In both cases the response will be `TRUE`.

**Can we declare a function using new Function()? Create the below function using new Function().**

```ts
function isTrue(bool: boolean): string {
  if (Boolean(bool)) {
    return "TRUE";
  } else {
    return "FALSE";
  }
}
```

Here is the snippet for creating a **new Function()**.

```ts
const isTrue = new Function("bool", `
  if (Boolean(bool)) {
    return "TRUE";
  } else {
    return "FALSE";
  }
`);
```

**What is the output of the below snippet?**

```ts
console.log(isTrue(false));
console.log(isTrue.name);
console.log(isTrue.length);
console.log(isTrue.prototype);
```

Outputs will be as follows,

```sh
FALSE
isTrue  // only works when created using function keyword
1       // no of arguments
{}
```

Outputs will different when created using **const isTrue = new Function()** syntax,

```sh
FALSE
anonymous // only works when created using function keyword
1         // no of arguments
{}
```
