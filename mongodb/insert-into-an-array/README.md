# Insert into an array

Let's consider we have documents that look like this,

```js
[
  {
    _id: ObjectId('68af241dcc1c228aac6e44ee'),
    name: "1st year",
    courses: ["c"],
  },
  {
    _id: ObjectId('68af241dcc1c228aac6e44f0'),
    name: "2nd year",
    courses: ["c"],
  },
  {
    _id: ObjectId('68af241dcc1c228aac6e44f1'),
    name: "final year",
    courses: ["c"],
  }
]
```

## We want to add `c++` on 2nd year

```js
db.courses.updateOne({
  _id: ObjectId('68af241dcc1c228aac6e44f0')
}, {
  $push: {
    courses: "c++"
  }
});
```

## We want to add `c++` & `java` on final year

```js
db.courses.updateOne({
  _id: ObjectId("68af241dcc1c228aac6e44f1")
}, {
  $push: {
    courses: {
      $each: ["c++", "java"]
    }
  }
});
```

## What is the use of `$each` operator

The `$push` operator can push only 1 item at a time. With the help of `$each` we can push multiple items.

## How to keep the items unique when pushing new items

```js
db.courses.updateOne({
  _id: ObjectId("68af241dcc1c228aac6e44f1")
}, {
  $addToSet: {
    courses: {
      $each: ["c", "c++", "java"]
    }
  }
});
```

The result will be,

```js
{
  _id: ObjectId('68af241dcc1c228aac6e44f1'),
  name: 'final year',
  courses: [
    'c',
    'c++',
    'java'
  ]
}
```

## The difference between `$addToSet` & `$push`

 * `$addToSet` will keep the items unique in the array.
 * `$push` will simply append new items at the end. So, the items might become repeatative.
