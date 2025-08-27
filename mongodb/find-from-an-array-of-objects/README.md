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
  cars: { $eq: ["cars"] }
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
