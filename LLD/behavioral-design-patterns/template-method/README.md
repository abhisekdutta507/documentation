# Template Method

Example of `Inheritance with abstract method` in Object-oriented programming. 

## Problem

In the below example executing `this.#audit.log("audit logged");` is optional. So, the engineers might miss to add this line.

```ts
interface Audit {
  log(message: string): Promise<boolean>;
}

class AuditTrail implements Audit {
  log(message: string): Promise<boolean> {
    if (message.length) {
      console.log(message);
      return Promise.resolve(true);
    }
    return Promise.reject(false);
  }
}

class Transaction {
  #audit: Audit;

  constructor() {
    this.#audit = new AuditTrail();
  }

  async execute(): Promise<boolean> {
    try {
      this.#audit.log("audit logged");
      console.log("transfer money");
      return true;
    } catch(e) {
      console.log("failed to execute the task");
      return false;
    }
  }
}
```

## Solution

```ts
interface Audit {
  log(message: string): Promise<boolean>;
}

class AuditTrail implements Audit {
  log(message: string): Promise<boolean> {
    if (message.length) {
      console.log(message);
      return Promise.resolve(true);
    }
    return Promise.reject(false);
  }
}

abstract class Task {
  #audit: Audit;

  constructor() {
    this.#audit = new AuditTrail();
  }

  async execute() {
    try {
      await this.#audit.log("audit logged");
      console.log("execute the task");
      await this.doExecute();
    } catch (e) {
      console.log("failed to execute the task");
    }
  }

  protected abstract doExecute(): Promise<boolean>;
}

class Transaction extends Task {
  protected doExecute(): Promise<boolean> {
    console.log("transfer money");
    return Promise.resolve(true);
  }
}
```

When we create an object of the `class Transaction`. We will be able to access `execute()` but not `doExecute()`. So, we must call the `execute()` method which will automatically call the `doExecute()`.

```ts
async function templateMethod() {
  try {
    const transaction = new Transaction();
    await transaction.execute();
  } catch (e) {

  }
}

templateMethod();
```

Output will be,

```txt
audit logged
execute the task
transfer money
```
