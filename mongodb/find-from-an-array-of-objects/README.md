# Find from an Array of objects

Lets consider the data looks like,

```js
[
  {
    _id: ObjectId('68af241dcc1c228aac6e44ee'),
    name: 'Bianka Weber',
    company: 'Lang - McKenzie',
    email: 'Luther_Grant13@gmail.com',
    address: {
      street: '600 Kertzmann Cove',
      zip: '51051-9466',
      state: 'West Virginia',
      country: 'Uzbekistan',
    },
    phone: '944.557.5187 x6843',
    photo: 'https://json-server.dev/ai-profiles/55.png',
    cars: [ 'BMW', 'VW' ]
  },
  {
    _id: ObjectId('68af241dcc1c228aac6e44f0'),
    name: 'Haylie Koepp',
    company: 'Pouros Group',
    email: 'Nicholaus.Boehm@yahoo.com',
    address: {
      street: '3150 Center Road',
      zip: '97022',
      state: 'Alaska',
      country: 'Russian Federation',
    },
    phone: '841-612-5436 x55005',
    photo: 'https://json-server.dev/ai-profiles/48.png',
    cars: [ 'Tata' ]
  },
  {
    _id: ObjectId('68af241dcc1c228aac6e44f1'),
    name: 'Natalie Johnson',
    company: 'Hand, Hirthe and Crooks',
    email: 'Dell.Conn69@hotmail.com',
    address: {
      street: '51322 Ari Ville',
      zip: '83525',
      state: 'Montana',
      country: 'Mauritania',
    },
    phone: '1-372-862-3588 x599',
    photo: 'https://json-server.dev/ai-profiles/29.png',
    cars: [ 'Toyota' ]
  },
  {
    _id: ObjectId('68af241dcc1c228aac6e44f2'),
    name: 'Helen Hermann',
    company: 'Mohr - Crona',
    email: 'Sydnie2@gmail.com',
    address: {
      street: '81175 Maye Oval',
      zip: '15690',
      state: 'Michigan',
      country: 'Anguilla',
    },
    phone: '1-211-464-5221 x8125',
    photo: 'https://json-server.dev/ai-profiles/9.png',
    cars: [ 'Honda', 'Toyota', 'Suzuki' ]
  },
  {
    _id: ObjectId('68af241dcc1c228aac6e44f3'),
    name: 'Marge Ebert',
    company: 'Dickens - Rolfson',
    email: 'Greta.Kohler@gmail.com',
    address: {
      street: '16889 W Union Street',
      zip: '89963',
      state: 'Alaska',
      country: 'Bhutan',
    },
    phone: '863.663.5131 x4072',
    photo: 'https://json-server.dev/ai-profiles/80.png',
    cars: [ 'BMW' ]
  },
]
```

## Now we want to find the users who ride BMW?

```js
db.users.find({
  cars: "BMW",
}).projection({
  _id: false,
  name: true,
  cars: true
}).toArray();
```

The response will be,

```js
[
  {
    name: 'Bianka Weber',
    cars: [ 'BMW', 'VW' ]
  },
  {
    name: 'Marge Ebert',
    cars: [ 'BMW' ]
  }
]
```

That means we can just pass the below object to filter from any Array.

```js
{
  cars: "BMW"
}
```

## We can also use comparison operator `$all` to do the same thing:

```js
db.users.find({
  cars: { $all: ["BMW"] }
}).projection({
  _id: false,
  name: true,
  cars: true
}).toArray();
```

The result is,

```js
[
  {
    name: 'Bianka Weber',
    cars: [ 'BMW', 'VW' ]
  },
  {
    name: 'Marge Ebert',
    cars: [ 'BMW' ]
  }
]
```

## Now we want to find the users who ride only BMW?

```js
db.users.find({
  cars: ["BMW"],
}).projection({
  _id: false,
  name: true,
  cars: true
}).toArray();
```

Which means the query changes to,

```js
{
  cars: ["BMW"],
}
```

## We can also use comparison operator `$eq` to do the same thing:

```js
db.users.find({
  cars: { $eq: ["BMW"] }
}).projection({
  _id: false,
  name: true,
  cars: true
}).toArray();
```

The result will the users who only use BMW,

```js
{
  name: 'Marge Ebert',
  cars: [ 'BMW' ]
}
```

## Difference between `$all`, `$in` and `$eq`:

Lets cnsider the objects are like this,

```js
[
  {
    cars: ["Honda"]
  },
  {
    cars: ["Suzuki"]
  },
  {
    cars: ["Toyota"]
  },
  {
    cars: ["VW"]
  },
  {
    cars: ["Honda", "Suzuki"]
  },
  {
    cars: ["Honda", "Suzuki", "Toyota"]
  },
  {
    cars: ["Honda", "Suzuki", "Toyota", "VW"]
  }
]
```

### What happens if we use `$all`?

**Query 1**

```js
db.users.countDocuments({
  cars: { $all: ["Honda"] }
});
```

Count we will get,

```js
4
```

**Query 2**

```js
db.users.countDocuments({
  cars: { $all: ["Honda", "Suzuki"] }
});
```

We will get the users who us Honda & Suzuki both,

```js
3
```

### What happens if we use `$in`?

**Query 1**

```js
db.users.countDocuments({
  cars: { $in: ["Honda"] }
});
```

Count we will get,

```js
4
```

**Query 2**

```js
db.users.countDocuments({
  cars: { $in: ["Honda", "Suzuki"] }
});
```

We will get the users who use `Honda or Suzuki`,

```js
5
```

### What happens if we use `$eq`?

**Query 1**

```js
db.users.countDocuments({
  cars: { $eq: ["Honda"] }
});
```

It will match users who use only Honda,

```js
1
```

**Query 2**

```js
db.users.countDocuments({
  cars: { $eq: ["Honda", "VW"] }
});
```

It will match users who use `only Honda & VW both`,

```js
0
```

## Another interesting operator in `$elemMatch`. It can find from an array within the documents.

Let's consider we have documents into `survey` collection:

```js
db.survey.insertMany( [
  {
    "_id": 1,
    "results": [
      { "product": "abc", "score": 10 },
      { "product": "xyz", "score": 5 }
    ]
  },
  {
    "_id": 2,
    "results": [
      { "product": "abc", "score": 8 },
      { "product": "xyz", "score": 7 }
    ]
  },
  {
    "_id": 3,
    "results": [
      { "product": "abc", "score": 7 },
      { "product": "xyz", "score": 8 }
    ]
  },
  {
    "_id": 4,
    "results": [
      { "product": "abc", "score": 7 },
      { "product": "def", "score": 8 }
    ]
  },
  {
    "_id": 5,
    "results": {
      "product": "xyz", "score": 7
    }
  }
]);
```

### Let's find the surveys with `{ product: "xyz" }`:

```js
db.survey.find({
  results: {
    $elemMatch: {
      product: "xyz"
    }
  }
}).projection({
  _id: true,
}).toArray();
```

In the result we get,

```js
[ { _id: 1 }, { _id: 2 }, { _id: 3 } ]
```

**NOTICE:** We do not get the object `{ _id: 5 }`. Because `$elemMatch` only matches the objects within **results** array. But in that case **results** was not an array.

### Let's find the surveys with `{ product: "xyz" }`. And also where the `score is greater than equals 8`.

```js
db.survey.find({
  results: {
    $elemMatch: {
      product: "xyz",
      score: { $gte: 8 }
    }
  }
}).projection({
  _id: true,
}).toArray();
```

We get the result:

```js
[ { _id: 3 } ]
```

## We can also find by Array length:

Let's consider we have a collection `resumes`,

```js
db.resumes.insertMany([
  {
    _id: 1,
    projects: ["java", "c++"]
  },
  {
    _id: 2,
    projects: ["java", "c++", "python"]
  },
  {
    _id: 3,
    projects: ["c"]
  }
  {
    _id: 4,
    projects: ["c", "c++"]
  },
  {
    _id: 5,
    projects: ["python", "javascript", "html"]
  },
  {
    _id: 6,
    projects: ["golang"]
  }
]);
```

### Find the resumes with 2 projects:

```js
db.resumes.find({
  projects: { $size: 2 }
}).toArray();
```

We will find,

```js
[
  { _id: 1, projects: [ 'java', 'c++' ] },
  { _id: 4, projects: [ 'c', 'c++' ] }
]
```

### What is we want the find the resumes with minimum 2 projects

```js
db.resumes.find({
  $expr: {
    $gte: [{ $size: "$projects" }, 2],
  }
}).toArray();
```

We get the result as,

```js
[
  { _id: 1, projects: [ 'java', 'c++' ] },
  { _id: 2, projects: [ 'java', 'c++', 'python' ] },
  { _id: 4, projects: [ 'c', 'c++' ] },
  { _id: 5, projects: [ 'python', 'javascript', 'html' ] }
]
```

For more `$expr` information please read the [documentation](https://www.mongodb.com/docs/manual/reference/operator/query/expr/).
