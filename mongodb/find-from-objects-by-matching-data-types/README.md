# Find from objects by matching data types?

Let's consider we have a collection `users` with below objects,

```js
db.users.insertMany([
  {
    name: "Abhisek",
    age: 29,
    mobile: "9876543210",
  },
  {
    name: "Raja",
    age: 31,
    mobile: 9876543211,
  },
  {
    name: "Suraj",
    age: 14,
    mobile: null,
  },
  {
    name: "Anuradha",
    age: 30,
    bloodGroup: "O+"
  }
]);
```

## Find the documents with bloodGroup using `$exists`:

```js
db.users.find({
  bloodGroup: { $exists: true }
}).toArray();
```

We find only **Anuradha's** record:

```js
[
  {
    _id: ObjectId('68b002edd99d9860e588649c'),
    name: 'Anuradha',
    age: 30,
    bloodGroup: 'O+'
  }
]
```

## Find the documents with mobile using `$exists`:

```js
db.users.find({
  mobile: { $exists: true }
}).toArray();
```

We find **Abhisek**, **Raja** & **Suraj's** records:

```js
[
  {
    _id: ObjectId('68b00281d99d9860e5886499'),
    name: 'Abhisek',
    age: 29,
    mobile: '9876543210'
  },
  {
    _id: ObjectId('68b00281d99d9860e588649a'),
    name: 'Raja',
    age: 31,
    mobile: 9876543211
  },
  {
    _id: ObjectId('68b00281d99d9860e588649b'),
    name: 'Suraj',
    age: 14,
    mobile: null
  }
]
```

## Filter out the mobile numbers with null values:

In the above results we see **Suraj** is also there with `{ mobile: null }`. To filter him out,

```js
db.users.find({
  mobile: { $exists: true, $ne: null }
}).toArray();
```

Finally we get,

```js
[
  {
    _id: ObjectId('68b00281d99d9860e5886499'),
    name: 'Abhisek',
    age: 29,
    mobile: '9876543210'
  },
  {
    _id: ObjectId('68b00281d99d9860e588649a'),
    name: 'Raja',
    age: 31,
    mobile: 9876543211
  }
]
```

## Find the mobile numbers that has string data in it:

```js
db.users.find({
  mobile: { $type: "string" }
}).toArray();
```

Then we get,

```js
[
  {
    _id: ObjectId('68b00281d99d9860e5886499'),
    name: 'Abhisek',
    age: 29,
    mobile: '9876543210'
  }
]
```

## The `$type` operator accepts `string | number | string[] | number[]`:

```js
db.users.find({
  mobile: { $type: ["string"] }
}).toArray();
```

or

```js
db.users.find({
  mobile: { $type: ["double"] }
}).toArray();
```

or

```js
db.users.find({
  mobile: { $type: ["double", "string"] }
}).toArray();
```

Or we can pass numbers. Where `1 = "double"` & `2 = "string"`.

```js
db.users.find({
  mobile: { $type: [1, 2] }
}).toArray();
```

## What are the available types & their numeric values:

We can find the available types in the [documentation](https://www.mongodb.com/docs/manual/reference/operator/query/type/#available-types).
