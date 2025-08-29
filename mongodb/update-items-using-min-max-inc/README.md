# Update items using `$min`, `$max` & `$inc`

```js
db.students.insertMany([
  {
    _id: ObjectId('68b146ddf5c47ae26797d11f'),
    name: "Rajiv Saha",
    roll: 10,
    class: 6,
    score: 34
  },
  {
    _id: ObjectId('68b146ddf5c47ae26797d120'),
    name: "Sucheta Biswas",
    roll: 11,
    class: 6,
    score: 86
  },
  {
    _id: ObjectId('68b146ddf5c47ae26797d121'),
    name: "Biswajit Jana",
    roll: 12,
    class: 6,
    score: 92
  }
]);
```

## Promote everyone except roll 10

```js
db.students.updateMany({
  roll: { $nin: [10] }
}, {
  $inc: { class: 1 }
});
```

## Promote Rajiv by giving more marks

```js
db.students.updateOne({
  _id: ObjectId('68b146ddf5c47ae26797d11f')
}, {
  $max: { score: 46 }
});
```

The `$max` operator can increase the value if it is lower.

## Corrects Biswajit's marks using `$min`

```js
db.students.updateOne({
  _id: ObjectId('68b146ddf5c47ae26797d121')
}, {
  $min: { score: 46 }
});
```

The `$min` operator can decrease the value if it is higher.
