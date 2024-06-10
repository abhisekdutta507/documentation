# What is Promise? What are the 3 stages of a Promise?

## `Promise` is a way to handle asynchronous operations in JavaScript.

### The 3 stages of a `Promise`:

  * **Pending:** The initial state of a Promise. The operation is still ongoing, and the Promise is neither fulfilled nor rejected.
  * **Fulfilled:** The Promise is completed successfully. It has a resolved value.
  * **Rejected:** The Promise is failed. It has a reason for the failure (error).

### Promise.resolve()

#### Example 1: Resolving with a Value

```js
const promise = Promise.resolve(42);

promise.then((value) => {
  console.log(value); // Output: 42
});
```

#### Example 2: Resolving with Another Promise

```js
const originalPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hello');
  }, 1000);
});

const wrappedPromise = Promise.resolve(originalPromise);

wrappedPromise.then((value) => {
  console.log(value); // Output: Hello (after 1 second)
});

```

#### Example 3: Resolving with a Thenable

```js
const thenable = {
  then: function(resolve, reject) {
    resolve('Resolved from thenable');
  }
};

const promise = Promise.resolve(thenable);

promise.then((value) => {
  console.log(value); // Output: Resolved from thenable
});

```

### Promise.reject()

#### Example 1: Rejecting with an Error

```js
const promise = Promise.reject(new Error('Something went wrong'));

promise.catch((error) => {
  console.error(error); // Output: Error: Something went wrong
});

```

#### Example 2: Rejecting with a String

```js
const promise = Promise.reject('Error: Operation failed');

promise.catch((error) => {
  console.error(error); // Output: Error: Operation failed
});

```

#### Example 3: Using `Promise.reject()` in a Function

```js
function fetchData(url) {
  if (!url.startsWith('https://')) {
    return Promise.reject(new Error('Invalid URL'));
  }
  
  // Simulate an asynchronous operation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'Sample data' });
    }, 1000);
  });
}

fetchData('http://example.com')
  .then((response) => {
    console.log('Data received:', response);
  })
  .catch((error) => {
    console.error('Failed to fetch data:', error); // Output: Error: Invalid URL
  });

```

### Promise.race():

#### Resolves or rejects as soon as one of the promises resolves or rejects.

```js
const wait = async (n = 1) => {
  return new Promise((next = () => {}) => {
    setTimeout(() => {
      return next({});
    }, 1000 * n);
  });
};

const promiseA = async () => {
  await wait(9);
  throw new Error('Simple execution error!');
}

const promiseB = async () => {
  await wait(8);
  return 10;
}

const promiseC = async () => {
  await wait(6);
  return 15;
}

const promiseD = async () => {
  await wait(2);
  return 20;
}

async function main() {
  try {
    /*
     * @description promiseD will be executed the earliest.
     */
    const response = await Promise.race([promiseB(), promiseA(), promiseD()]);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

main();

```

##### Output

```shell
20
```

#### If promiseA was executed earliest. Then the output will be different.

```shell
Error: Simple execution error!
    at promiseA (/index.js:11:9)
    at async main (/index.js:31:22)
```

### Promise.all()

#### Short-circuits and rejects if any promise rejects. All promises must be resolved.

```js
const wait = async (n = 1) => {
  return new Promise((next = () => {}) => {
    setTimeout(() => {
      return next({});
    }, 1000 * n);
  });
};

const promiseA = async () => {
  await wait(8);
  throw new Error('Simple execution error!');
}

const promiseB = async () => {
  await wait(8);
  return 10;
}

const promiseC = async () => {
  await wait(6);
  return 15;
}

const promiseD = async () => {
  await wait(2);
  return 20;
}

async function main() {
  try {
    const response = await Promise.all([promiseB(), promiseA(), promiseD()]);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

main();

```

##### Output

```shell
Error: Simple execution error!
    at promiseA (/index.js:11:9)
    at async main (/index.js:31:22)
```

### Promise.allSettled():

#### `Promise.allSettled()` is a method in JavaScript that returns a promise when all of the given promises are either resolved or rejected.

```js
const wait = async (n = 1) => {
  return new Promise((next = () => {}) => {
    setTimeout(() => {
      return next({});
    }, 1000 * n);
  });
};

const promiseA = async () => {
  await wait(1);
  throw new Error('Simple execution error!');
}

const promiseB = async () => {
  await wait(8);
  return 10;
}

const promiseC = async () => {
  await wait(6);
  return 15;
}

const promiseD = async () => {
  await wait(5);
  return 20;
}

async function main() {
  try {
    /*
     * @description promiseA() will be rejected.
     */
    const response = await Promise.allSettled([promiseB(), promiseA(), promiseD()]);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

main();
```

##### Output

```shell
[
  { status: 'fulfilled', value: 10 },
  {
    status: 'rejected',
    reason: Error: Simple execution error!
        at promiseA (/index.js:11:9)
        at async Promise.allSettled (index 1)
        at async main (/index.js:31:22)
  },
  { status: 'fulfilled', value: 20 }
]
```

### Promise.any():

#### Resolves as soon as any promise resolves, ignores rejections until all promises reject.

```js
const wait = async (n = 1) => {
  return new Promise((next = () => {}) => {
    setTimeout(() => {
      return next({});
    }, 1000 * n);
  });
};

const promiseA = async () => {
  await wait(2);
  throw new Error('Simple execution error!');
}

const promiseB = async () => {
  await wait(8);
  return 10;
}

const promiseC = async () => {
  await wait(6);
  return 15;
}

const promiseD = async () => {
  await wait(4);
  return 20;
}

async function main() {
  try {
    /*
     * @description promiseA will be rejected twice. But promiseB will be resolved. So, output will be the result of promiseB.
     */
    const response = await Promise.any([promiseA(), promiseA(), promiseB()]);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

main();

```

##### Output

```shell
10
```

#### When all the promises are rejected then

```js
async function main() {
  try {
    const response = await Promise.any([promiseA(), promiseA(), promiseA()]);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

main();
```

##### Output

```shell
[AggregateError: All promises were rejected] {
  [errors]: [
    Error: Simple execution error!
        at promiseA (index.js:11:9)
        at runNextTicks (node:internal/process/task_queues:60:5)
        at listOnTimeout (node:internal/timers:533:9)
        at process.processTimers (node:internal/timers:507:7)
        at async Promise.any (index 0)
        at async main (index.js:31:22),
    Error: Simple execution error!
        at promiseA (index.js:11:9)
        at runNextTicks (node:internal/process/task_queues:60:5)
        at listOnTimeout (node:internal/timers:533:9)
        at process.processTimers (node:internal/timers:507:7)
        at async Promise.any (index 1)
        at async main (index.js:31:22),
    Error: Simple execution error!
        at promiseA (index.js:11:9)
        at async Promise.any (index 2)
        at async main (index.js:31:22)
  ]
}
```

#### When all the promises are resolved then

```js
async function main() {
  try {
    /*
     * @description promiseB takes 8 sec
     * promiseC takes 6 sec
     * promiseD takes 4 sec
     */
    const response = await Promise.any([promiseB(), promiseC(), promiseD()]);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

main();
```

##### Output

```shell
20 # will take 8 sec. but returns the response received earliest.
```