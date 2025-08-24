## Explain the basic MongoDB commands

### List the databases

```sh
show dbs
```

The output window looks like:

```sh
portfolio 156.00 KiB
practice  72.00 KiB
```

#### We can select from the avaiable databases

```sh
use practice
```

### List the collections

```sh
show collections
```

The output window looks like:

```sh
products
accounts
orders
```

### Insert a document in collection

Lets consider we want to insert a document in a collection called **products**.

```js
db.products.insertOne({
  name: "T-Shirt",
  price: 499,
  brand: "Zara"
});
```

The output will look like:

```js
{
  acknowledged: true,
  insertedId: ObjectId('68aadab1be8183d30623d92a')
}
```

#### Insert multiple documents in collection

```js
db.products.insertMany([
  {
    name: "T-Shirt",
    price: 599,
    brand: "Adidas"
  },
  {
    name: "T-Shirt",
    price: 609,
    brand: "Aldo"
  }
]);
```

The output will look like:

```js
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('68aae075be8183d30623d92d'),
    '1': ObjectId('68aae075be8183d30623d92e')
  }
}
```

#### Insert document with custom `_id` in collection

```js
db.products.insertOne({
  _id: "JKT-OLP-IU9",
  name: "T-Shirt",
  price: 1299,
  brand: "UCB"
});
```

The output looks like,

```js
{
  acknowledged: true,
  insertedId: 'JKT-OLP-IU9'
}
```

### List the inserted documents

```js
db.products.find();
```

The output will look like:

```js
{
  _id: ObjectId('68aad9b9be8183d30623d928'),
  name: 'A Book',
  price: 12.99
}
{
  _id: ObjectId('68aada04be8183d30623d929'),
  name: 'Book B',
  price: 15,
  author: 'Abhisek Dutta'
}
{
  _id: ObjectId('68aadab1be8183d30623d92a'),
  name: 'HP Computer',
  price: 20000,
  description: {
    make: 'HP',
    cpu: 'Intel Ultra 7',
    RAM: 16,
    SSD: 512
  }
}
{
  _id: ObjectId('68aae075be8183d30623d92d'),
  name: 'T-Shirt',
  price: 599,
  brand: 'Adidas'
}
{
  _id: ObjectId('68aae075be8183d30623d92e'),
  name: 'T-Shirt',
  price: 609,
  brand: 'Aldo'
}
{
  _id: 'JKT-OLP-IU9',
  name: 'T-Shirt',
  price: 1299,
  brand: 'UCB'
}
```

### Update a document

```js
db.products.updateOne({name: "A Book"}, { $set: { name: "Book A" } });
```

The output will look like:

```js
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
```

#### Update a document by _id

```js
db.products.updateOne({ _id: ObjectId("68aad9b9be8183d30623d928") }, { $set: { price: 156 } });
```

#### Update multiple documents

```js
db.products.updateMany({ price: { $gt: 15 } }, { $set: { type: "Premium" } });
```

#### What if we do not pass any argument in the `updateOne` or `updateMany` function?

It will throw an error,

```js
MongoshInvalidInputError: [COMMON-10001] Missing required argument at position 0 (Collection.updateOne)
```

or

```js
MongoshInvalidInputError: [COMMON-10001] Missing required argument at position 0 (Collection.updateMany)
```

But we can pass

```json
{}
```

into the `updateMany` function. We can update all the documents in a collection.

```js
db.products.updateMany({}, { $set: { author: "Abhisek Dutta" } });
```

### Delete a document

```js
db.products.deleteOne({ _id: "JKT-OLP-IU9" });
```

The output will look like:

```js
{
  acknowledged: true,
  deletedCount: 1
}
```

#### What if we do not pass any argument in the `deleteOne` function?

It will throw an error,

```js
MongoshInvalidInputError: [COMMON-10001] Missing required argument at position 0 (Collection.deleteOne)
```

#### Delete multiple documents

```js
db.products.deleteMany({ name: "T-Shirt" });
```

The output will look like:

```js
{
  acknowledged: true,
  deletedCount: 3
}
```

#### What if we do not pass any argument in the `deleteMany` function?

The result will be same as `deleteOne`. But we can pass,

```json
{}
```

```js
db.products.deleteMany({});
```

This will delete all the documents from the products collection.

## Errors mostly the engineers make

When performing `updateMany` & `deleteMany` we are allowed to pass `{}` but we should never do that without intention.

That will update/delete all the documents present in a collection.
