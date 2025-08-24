## Explain collection & document is MongoDB?

### Install and connect MongoDB on local machice

Please read the [bitbucket documentation](https://bitbucket.org/abhisekdutta507/mongod-core-commands/src/master/).

### Collection in MongoDB

  * A collection is a group of documents and is similar to a table in relational databases.

### Document in MongoDB

  * A document is a single data record, stored in a format called BSON.
  * Every document has a unique `_id` field that acts as its primary key, either assigned automatically or specified by the user.

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

```mongo
db.products.insertOne({
  name: "T-Shirt",
  price: 499,
  brand: "Zara"
});
```

The output will look like:

```bson
{
  acknowledged: true,
  insertedId: ObjectId('68aadab1be8183d30623d92a')
}
```

### Insert multiple documents in collection

```mongo
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

```mongo
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('68aae075be8183d30623d92d'),
    '1': ObjectId('68aae075be8183d30623d92e')
  }
}
```

### Insert document with custom `_id` in collection

```mongodb
db.products.insertOne({
  _id: "JKT-OLP-IU9",
  name: "T-Shirt",
  price: 1299,
  brand: "UCB"
});
```

The output looks like,

```mongodb
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

```mongo
MongoshInvalidInputError: [COMMON-10001] Missing required argument at position 0 (Collection.deleteOne)
```

or

```mongodb
MongoshInvalidInputError: [COMMON-10001] Missing required argument at position 0 (Collection.deleteOne)
```

or

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

#### What if we do not pass any argument in the `deleteMany` function?

The result will be same as `deleteOne`.

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
