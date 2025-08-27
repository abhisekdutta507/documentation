# Remove from an Array

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
    courses: ["c", "c++"],
  },
  {
    _id: ObjectId('68af241dcc1c228aac6e44f1'),
    name: "final year",
    courses: ["c", "c++", "java"],
  }
]
```

## We want to remove `c++` from 2nd year

```js
db.courses.updateOne({
  _id: ObjectId('68af241dcc1c228aac6e44f0')
}, {
  $pull: {
    courses: "c++"
  } 
});
```

## We want to remove both `c++` and `java` from final year

```js
db.courses.updateOne({
  _id: ObjectId('68af241dcc1c228aac6e44f1')
}, {
  $pullAll: {
    courses: ["c++", "java"]
  } 
});
```

## We want to remove using `$pop`

The `$pop` operator removes the first or last element of an array. Pass `$pop` a value of `-1` to remove the first element of an array and `1` to remove the last element in an array.

```js
db.courses.updateOne({
  _id: ObjectId('68af241dcc1c228aac6e44f1')
}, {
  $pop: {
    courses: -1
  }
});
```

or

```js
db.courses.updateOne({
  _id: ObjectId('68af241dcc1c228aac6e44f1')
}, {
  $pop: {
    courses: 1
  }
});
```
