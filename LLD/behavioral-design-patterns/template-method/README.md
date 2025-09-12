# Template Method

Example of `Inheritance with abstract method` in Object-oriented programming. 

## Solution

```ts
class AuditTrail {
  record() {
    console.log("Recording audit");
  }
}

abstract class Task {
  #auditTrail: AuditTrail;

  constructor(auditTrail: AuditTrail) {
    this.#auditTrail = auditTrail;
  }

  execute() {
    this.#auditTrail.record();
    console.log("Execute the task");
    this.doExecute();
  }

  protected abstract doExecute(): boolean;
}

class TransferMoney extends Task {
  protected doExecute(): boolean {
    console.log("Transferring money");
    return true;
  }
}
```

When we create an object of the `class TransferMoney`. We will be able to access `execute()` but not `doExecute()`. So, we must call the `execute()` method which will automatically call the `doExecute()`.

```ts
const transferMoney = new TransferMoney(new AuditTrail());
transferMoney.execute();
```

Output will be,

```txt
Recording audit
Execute the task
Transferring money
```
