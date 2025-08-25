# Explain the basic CRUD commands

## List the databases

```sh
show dbs
```

The output window looks like:

```sh
portfolio 156.00 KiB
practice  72.00 KiB
```

## We can select from the avaiable databases

```sh
use practice
```

## List the collections

```sh
show collections
```

The output window looks like:

```sh
products
accounts
orders
```

# What are everyday CRUD operations?

  * [insertOne()](#insert-a-document-in-collection)
  * [insertMany()](#insert-multiple-documents-in-collection)
  * [find()](#list-the-inserted-documents)
  * [findOne()](#find-a-document-by-_id)
  * [count()](#count-documents)
  * [countDocuments()](#so-when-we-try-countdocuments)
  * [estimatedDocumentCount()](#lets-try-estimateddocumentcount)
  * [updateOne()](#update-a-document)
  * [updateMany()](#update-multiple-documents)
  * [update()](#what-does-the-update-function-do)
  * [replaceOne()](#replace-a-document-completely)
  * [deleteOne()](#delete-a-document)
  * [deleteMany()](#delete-multiple-documents)
  * [bulkWrite()](#perform-multiple-updates-through-bulkwrite)

## Insert a document in collection

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

### Insert multiple documents in collection

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

### Insert document with custom `_id` in collection

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

## List the inserted documents

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

### Find a document by _id

```js
db.products.findOne({ _id: ObjectId("68aae075be8183d30623d92e") });
```

The result will look like,

```js
{
  _id: ObjectId('68aae075be8183d30623d92e'),
  name: 'T-Shirt',
  price: 609,
  brand: 'Aldo'
}
```

If no result found,

```js
null
```

## Find distinct items from a collection

```js
const field = "author";
const query = {}; // optional

db.collection.distinct(field, query);
```

It will return the author names in an Array,

```js
[ 'Abhisek Dutta', 'Pitambar Laha' ]
```


## Count documents

```js
db.products.count({ type: "Casual" });
```

We will get a warning. But, it will also return the response.

```js
DeprecationWarning: Collection.count() is deprecated. Use countDocuments or estimatedDocumentCount.
3 // a number
```

### So, when we try `countDocuments`:

```js
db.products.countDocuments({ type: "Casual" });
```

or

```js
db.products.countDocuments({});
```

or

```js
db.products.countDocuments();
```

All the above 3 are correct syntaxes. The response will be,

```js
3 // a number
```

### Let's try `estimatedDocumentCount`:

```js
db.products.estimatedDocumentCount();
```

or

```js
db.products.estimatedDocumentCount({});
```

Both the syntaxes are correct. The response will be,

```js
3 // a number
```

**NOTE**: The `estimatedDocumentCount` function **does not take query filter**. It returns an **estimated number of documents** in a collection based on collection metadata. Because of that it is must **faster** than `countDocuments`.

## Update a document

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

### Update a document by _id

```js
db.products.updateOne({ _id: ObjectId("68aad9b9be8183d30623d928") }, { $set: { price: 156 } });
```

### Update multiple documents

```js
db.products.updateMany({ price: { $gt: 15 } }, { $set: { type: "Premium" } });
```

### What if we do not pass any argument in the `updateOne` or `updateMany` function?

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

### What does the `update` function do?

The `update()` method is deprecated in the [mongosh](https://www.mongodb.com/docs/mongodb-shell/reference/compatibility/).

By default, the `db.collection.update()` method updates a single document. Include the option `multi: true` to update all documents that match the query.

```js
db.products.update({
  author: "Agent A"
}, {
  author: "Agent B"
}, {
  multi: true
});
```

If run on mongosh then it will throw an error,

```js
DeprecationWarning: Collection.update() is deprecated. Use updateOne, updateMany, or bulkWrite.
```

But, the Node.js drivers older than version 6 will be able handle it.

## Replace a document completely

```js
db.products.replaceOne({
  _id: ObjectId("68aad9b9be8183d30623d928")
}, {
  name: 'Book A',
  price: 240,
  type: 'Casual',
  author: 'Pitambar Laha'
});
```

**NOTE**: There is no need to pass `$set` atomic operator to replace an object.

## Delete a document

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

### What if we do not pass any argument in the `deleteOne` function?

It will throw an error,

```js
MongoshInvalidInputError: [COMMON-10001] Missing required argument at position 0 (Collection.deleteOne)
```

### Delete multiple documents

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

### What if we do not pass any argument in the `deleteMany` function?

The result will be same as `deleteOne`. But we can pass,

```json
{}
```

```js
db.products.deleteMany({});
```

This will delete all the documents from the products collection.

### Perform multiple updates through bulkWrite

```js
db.products.bulkWrite([
  {
    insertOne: {
      document: {},
    },
  },
  {
    updateOne: {
      filter: {},
      update: {
        $set: {}
      },
      upsert: false, // Default false
    },
  },
  {
    updateMany: {
      filter: {},
      update: {
        $set: {}
      },
      upsert: false, // Default false
    },
  },
  {
    replaceOne: {
      filter: {},
      replacement: {},
      upsert: false, // Default false
    },
  },
  {
    deleteOne: {
      filter: {},
    }
  },
  {
    deleteMany: {
      filter: {},
    }
  }
]);
```

The available options we can pass are: `insertOne`, `updateOne`, `updateMany`, `replaceOne`, `deleteOne` & `deleteMany`.

# Errors mostly the engineers make

When performing `updateMany` & `deleteMany` we are allowed to pass `{}` but we should never do that without intention.

That will update/delete all the documents present in a collection.
