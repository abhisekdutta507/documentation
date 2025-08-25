## What is Atomicity?

Lets understand Atomicity through examples,

### Example

Consider a collection with this document:

```js
db.games.insertOne({ _id: 1, score: 80 });
```

These update operations occur concurrently:

```js
// Update A
db.games.updateOne(
  { score: 80 },
  {
    $set: { score: 90 }
  }
);

// Update B
db.games.updateOne(
  { score: 80 },
  {
    $set: { score: 100 }
  }
);
```

One update operation sets the document's **score** field to either **90** or **100**.

After this update completes, the second update operation no longer matches the query `{  score: 80  }`, and is not performed.

But think about a scenario where the query is `{ _id: 1 }`. Here for both the operations the query will match.

```js
// Update A
db.games.updateOne(
  { _id: 1 },
  {
    $set: { score: 260 }
  }
);

// Update B
db.games.updateOne(
  { _id: 1 },
  {
    $set: { score: 250 }
  }
);
```

As a result, both update operations occur and the **score** will be updated to **250**.

**This is problematic because the client that issued the first update does not receive any indication that the update was overwritten.**

To prevent conflicting write operations when your update filter is on a different field than the one being updated, use the **$inc** operator.

Read more about [$inc operator here](https://www.mongodb.com/docs/manual/reference/operator/update/inc/#mongodb-update-up.-inc).

```js
// Update A
db.games.updateOne(
  { _id: 1 },
  {
    $inc: { score: 10 }
  }
);

// Update B
db.games.updateOne(
  { _id: 1 },
  {
    $inc: { score: 20 }
  }
);
```

The above **updateOne()** operations uses the **$inc** operator to:

  * increase the **score** field by 10.
  * then again increase the **score** field by 20.

The updated document would resemble:

```js
{
  _id: ObjectId('68aada04be8183d30623d929'),
  name: 'Book B',
  price: 280,
  author: 'Abhisek Dutta'
}
```

## What is Transaction?

When a single write operation modifies multiple documents, the modification of each document is atomic, but the operation as a whole is not atomic.

For situations that require atomicity of reads and writes to multiple documents, MongoDB supports distributed transactions.

Lets understand Transactions through examples,

### Example

Consider 2 collections **users** and **accounts** with the below documents.

#### Collection: users 

```js
{
  _id: 1,
  name: "Agent A",
  age: 29
}
{
  _id: 2,
  name: "Agent B",
  age: 30
}
```

#### Collection: accounts

```js
{
  _id: 10,
  balance: 10000,
  userId: 1
}
{
  _id: 11,
  balance: 10000,
  userId: 2
}
```

#### Database update queries

If the banking system allows the users to have maximum **10000** in their bank account.

Then, if **Agent A** transfers **2000** to **Agent B**'s account,

```js
// Update A
db.accounts.updateOne({
  userId: 1
}, {
  $inc: {
    balance: -2000
  }
});

// Update B
db.accounts.updateOne({
  userId: 2
}, {
  $inc: {
    balance: 2000
  }
});
```

Technically, the 2nd query should fail. Because, **Agent B** already has **10000** in their account which is the maximun limit allowed by the bank.

If the 2nd query fails for any reason, we must reverse the **2000** deducted by the 1st query.

This kind of complex operations must be handled within **transaction**.

```ts
import { MongoClient, ObjectId, ClientSession } from "mongodb";

type TransactionOptions = import("mongodb").TransactionOptions;

enum DB {
  practice = "practice"
}

enum Collection {
  products = "products",
  users = "users",
  accounts = "accounts",
}

enum AccountType {
  savings = "savings",
  fd = "fd",
  rd = "rd",
  loan = "loan",
}

interface Account {
  type: AccountType;
  balance: number;
  userId: ObjectId;
}

type AccountWithId = import("mongodb").WithId<Account>;

interface TransferAmountResponse {
  error: boolean;
  message: string;
}

const maxAllowedLimit: number = 10000;
const checkMaxAllowedLimit = false;
const uri: string = "mongodb+srv://<<username>>:<<password>>@<<cluster>>.tgsonor.mongodb.net/";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

const transactionOptions: TransactionOptions = {
  readPreference: 'primary',
  readConcern: { level: 'local' },
  writeConcern: { w: 'majority' },
};

async function main() {
  const session = client.startSession();

  try {
    const transfer = await transferAmount(
      new ObjectId("68ac11d98fd94f291c4f8c63"), // 10000
      new ObjectId("68ac11d98fd94f291c4f8c64"), // invalid user _id
      6000,
      session
    );
    console.log(transfer);
  } catch (e) {
    
  } finally {
    await session.endSession();
    await client.close();
  }
}

async function transferAmount(from: ObjectId, to: ObjectId, amount: number, session: ClientSession): Promise<TransferAmountResponse> {
  const response: TransferAmountResponse = {
    error: false,
    message: "",
  };

  try {
    await session.withTransaction<{}>(async () => {
      const accounts = client.db(DB.practice).collection(Collection.accounts);

      const sender = await accounts.findOne({ userId: from }) as AccountWithId;
      if (!sender) {
        throw new Error("Failed to find the sender account!");
      }

      if (sender?.balance < amount) {
        throw new Error("Insufficient balance in the sender account!");
      }

      if (checkMaxAllowedLimit) {
        const recepient = await accounts.findOne({ userId: to }) as AccountWithId;
        if (!recepient) {
          throw new Error("Failed to find the recepient account!");
        }

        const balanceToBe: number = recepient?.balance + amount;
        if (balanceToBe > maxAllowedLimit) {
          throw new Error("Max balance limit will be exceded in recepient account!");
        }
      }

      const updateA = await accounts.updateOne({ userId: from }, { $inc: { balance: amount * -1 } }, { session });
      if (updateA?.modifiedCount !== 1) {
        throw new Error("Failed to deduct the amount from sender account!");
      }

      const updateB = await accounts.updateOne({ userId: to }, { $inc: { balance: amount } }, { session });
      if (updateB?.modifiedCount !== 1) {
        throw new Error("Failed to transfer the amount to recepient account!");
      }

      return {};
    }, transactionOptions);
  } catch(e) {
    response.error = true;
    response.message = e?.message;
  } finally {
    return response;
  }
}

main();
```
