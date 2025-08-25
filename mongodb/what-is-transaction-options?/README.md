# What is TransactionOptions?

We must specify the transaction options during a transaction operation.

```ts
type TransactionOptions = import("mongodb").TransactionOptions;

const transactionOptions: TransactionOptions = {
  readPreference: 'primary',
  readConcern: { level: 'local' },
  writeConcern: { w: 'majority' },
  maxCommitTimeMS: 6000,
};
```

Please check here to see an [example of a transaction](../what-is-atomicity-and-transaction%3F/README.md#database-update-queries).
