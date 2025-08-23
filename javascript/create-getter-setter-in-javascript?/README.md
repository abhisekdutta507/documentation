## How to create getter & setter in TypeScript?

With the help of getter & setters we can add validation to **private fields** in TypeScript.

```ts
class Student {
  #name: string;
  #roll: number;
  #remarks: string;

  constructor(name: string, roll: number) {
    this.#name = name;
    this.#roll = roll;
    this.#remarks = "";
  }

  get name() {
    return this.#name;
  }

  get roll() {
    return this.#roll;
  }

  get remarks() {
    return this.#remarks;
  }

  set remarks(remarks: string) {
    if (typeof remarks !== "string") {
      throw TypeError(`Cannot assign ${typeof name} into string`);
    }

    if (remarks.length < 10) {
      throw ReferenceError(`Remarks must be 10 characters long`);
    }

    this.#remarks = remarks;
  }
}

const abhisek = new Student("Abhisek", 10);
abhisek.remarks = "Good!";
```

The output will be:

```sh
throw ReferenceError(`Remarks must be 10 characters long`);

ReferenceError: Remarks must be 10 characters long
```

If we change the remarks,

```ts
const abhisek = new Student("Abhisek", 10);
abhisek.remarks = "It was great being a part of the school!";

console.log("Name", abhisek.name);
console.log("Roll", abhisek.roll);
console.log("Remarks", abhisek.remarks);
```

This works fine without any error,

```sh
Name Abhisek
Roll 10
Remarks It was great being a part of the school!
```

What if we try to **set value to roll**.

```ts
const abhisek = new Student("Abhisek", 10);
abhisek.roll = 1;

console.log("Name", abhisek.name);
console.log("Roll", abhisek.roll);
```

We will get a compilation error,

```sh
abhisek.roll = 1;

TypeError: Cannot set property roll of #<Student> which has only a getter
```

## How to create getter & setter in JavaScript?

```js
class Student {
  #name;
  #roll;
  #remarks;

  constructor(name, roll) {
    this.#name = name;
    this.#roll = roll;
    this.#remarks = "";
  }

  get name() {
    return this.#name;
  }

  get roll() {
    return this.#roll;
  }

  get remarks() {
    return this.#remarks;
  }

  set remarks(remarks) {
    if (typeof remarks !== "string") {
      throw TypeError(`Cannot assign ${typeof name} into string`);
    }

    if (remarks.length < 10) {
      throw ReferenceError(`Name must be 10 characters long`);
    }

    this.#remarks = remarks;
  }
}

const abhisek = new Student("Abhisek", 10);
abhisek.remarks = "It was great being a part of the school!";

console.log("Name", abhisek.name);
console.log("Roll", abhisek.roll);
```

This works fine without any error,

```sh
Name Abhisek
Roll 10
Remarks It was great being a part of the school!
```

What if we try to **set value to roll**.

```ts
const abhisek = new Student("Abhisek", 10);
abhisek.roll = 1;

console.log("Name", abhisek.name);
console.log("Roll", abhisek.roll);
```

We will get a compilation error,

```sh
abhisek.roll = 1;

TypeError: Cannot set property roll of #<Student> which has only a getter
```

**NOTE:** Either TypeScript/JavaScript the behaviour stays as it is.

### Create getter & setter with JavaScript Constructor

```js
function Student(n, r) {
  let name = n;
  let roll = r;
  let remarks;

  Object.defineProperties(this, {
    name: {
      get: function get() {
        return name;
      }
    },
    roll: {
      get: function get() {
        return roll;
      }
    },
    remarks: {
      get: function get() {
        return remarks;
      },
      set: function set(r) {
        if (typeof r !== "string") {
          throw TypeError(`Cannot assign ${typeof r} into string`);
        }

        if (r.length < 10) {
          throw ReferenceError(`Remarks must be 10 characters long`);
        }

        remarks = r;
      }
    }
  });
}

const abhisek = new Student("Abhisek", 10);
abhisek.remarks = "It was great being a part of the school!";

console.log("Name", abhisek.name);
console.log("Roll", abhisek.roll);
console.log("Remarks", abhisek.remarks);
```

The output works fine as expected,

```sh
Name Abhisek
Roll 10
Remarks It was great being a part of the school!
```

### Create a StopWatch using getter & setter

```ts
function StopWatch() {
  let startTime = 0;
  let stopTime = 0;
  let running = false;
  let duration = 0;

  this.start = function start() {
    if (running) {
      throw new ReferenceError("Stopwatch has already started!");
    }

    startTime = new Date().getTime();
    running = true;
  }

  this.stop = function stop() {
    if (!running) {
      throw new ReferenceError("Stopwatch was never started!");
    }

    stopTime = new Date().getTime();
    running = false;
    duration += (stopTime - startTime) / 1000;
  }

  this.reset = function reset() {
    startTime = 0;
    stopTime = 0;
  }

  Object.defineProperty(this, "duration", {
    get: function get() {
      return duration;
    }
  });
}

const sw = new StopWatch();
```
