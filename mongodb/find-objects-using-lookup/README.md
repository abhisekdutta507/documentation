# Find objects using lookup

Let's consider 2 different collections `students` & `marksheets`,

```js
db.students.insertMany([
  {
    name: "Raju Das",
    roll: 1,
    class: 6
  },
  {
    name: "Biplab Saha",
    roll: 2,
    class: 6
  },
  {
    name: "Ajay Manna",
    roll: 3,
    class: 6
  }
]);
```

and

```js
db.marksheets.insertMany([
  {
    maths: 78,
    english: 89,
    studentId: ObjectId('68b1592cf5c47ae26797d125')
  },
  {
    maths: 82,
    english: 87,
    studentId: ObjectId('68b1592cf5c47ae26797d126')
  },
  {
    maths: 83,
    english: 88,
    studentId: ObjectId('68b1592cf5c47ae26797d127')
  }
]);
```

## To join the 2 collections we will use `aggregation` framework

```js
db.students.aggregate([
  {
    $lookup: {
      from: "marksheets",
      localField: "_id",
      foreignField: "studentId",
      as: "marksheet"
    }
  }
]);
```

Output:

```js
[
  {
    _id: ObjectId('68b1592cf5c47ae26797d125'),
    name: 'Raju Das',
    roll: 1,
    class: 6,
    marksheet: [
      {
        _id: ObjectId('68b15995f5c47ae26797d128'),
        maths: 78,
        english: 89,
        studentId: ObjectId('68b1592cf5c47ae26797d125')
      }
    ]
  },
  {
    _id: ObjectId('68b1592cf5c47ae26797d126'),
    name: 'Biplab Saha',
    roll: 2,
    class: 6,
    marksheet: [
      {
        _id: ObjectId('68b15995f5c47ae26797d129'),
        maths: 82,
        english: 87,
        studentId: ObjectId('68b1592cf5c47ae26797d126')
      }
    ]
  },
  {
    _id: ObjectId('68b1592cf5c47ae26797d127'),
    name: 'Ajay Manna',
    roll: 3,
    class: 6,
    marksheet: [
      {
        _id: ObjectId('68b15995f5c47ae26797d12a'),
        maths: 83,
        english: 88,
        studentId: ObjectId('68b1592cf5c47ae26797d127')
      }
    ]
  }
]
```

### We got the marksheets as an array of objects. What if we only want to show 1 object instead of an array.

```js
db.students.aggregate([
  {
    $lookup: {
      from: "marksheets",
      localField: "_id",
      foreignField: "studentId",
      as: "marksheets",
      pipeline: [{
        $project: {
          _id: 0,
          maths: 1,
          english: 1
        }
      }]
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      class: 1,
      marksheet: {
        $arrayElemAt: ["$marksheets", 0]
      }
    }
  }
]);
```

Output:

```js
[
  {
    name: 'Raju Das',
    class: 6,
    marksheet: {
      maths: 78,
      english: 89,
    }
  },
  {
    name: 'Biplab Saha',
    class: 6,
    marksheet: {
      maths: 82,
      english: 87,
    }
  },
  {
    name: 'Ajay Manna',
    class: 6,
    marksheet: {
      maths: 83,
      english: 88,
    }
  }
]
```
