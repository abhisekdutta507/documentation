# Update items in an Array

Lets consider the documents,

```js
db.students.insertMany([
  { "_id" : 1, "grades" : [ 85, 80, 80 ] },
  { "_id" : 2, "grades" : [ 88, 90, 92 ] },
  { "_id" : 3, "grades" : [ 85, 100, 90 ] }
]);
```

[Read for more details](https://www.mongodb.com/docs/manual/reference/operator/update/positional/0).

## What is the use of `$`?

```js
db.students.updateMany(
  { grades: 90 },
  { $set: { "grades.$" : 92 } }
);
```

The above operation will search for all students having grade 90. Then it will update all the 90's to 92.

### Use the positional `$` operator to update the `{ std: 11 }` field of the 1st array element that matches the `{ grade: 85 }` condition:

Let's consider the students collection looks like,

```js
db.students.insertMany([
  {
    _id: 1,
    grades: [
      { grade: 81, mean: 76, std: 8 },
      { grade: 79, mean: 76, std: 9 },
      { grade: 75, mean: 70, std: 10 }
    ]
  },
  {
    _id: 2,
    grades: [
      { grade: 80, mean: 75, std: 8 },
      { grade: 85, mean: 90, std: 9 },
      { grade: 85, mean: 85, std: 10 }
    ]
  }
]);
```

Solution is,

```js
db.students.updateOne({
  grades: {
    $elemMatch: {
      grade: 85
    }
  }
}, {
  $set: {
    "grades.$.std": 11
  }
});
```

The result will be,

```js
{
  _id: 2,
  grades: [
    {
      grade: 80,
      mean: 75,
      std: 8
    },
    {
      grade: 85,
      mean: 90,
      std: 11
    },
    {
      grade: 85,
      mean: 85,
      std: 10
    }
  ]
}
```

If you noticed, only the 2nd object in the `grades` array is updated. But, the 3rd object also has **{ grade: 85 }**. So, to make sure all the array objects are updated we must use `arrayFilters`.

### How to use `arrayFilters` to update every matched object in an array

```js
db.students.updateMany({
  grades: { $elemMatch: { grade: 85 } }
}, {
  $set: {
    "grades.$[element].std": 12
  }
}, {
  arrayFilters: [ { "element.grade": 85 } ]
});
```
