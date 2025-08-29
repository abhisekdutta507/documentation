# Find from strings using `$regex`.

Let's consider we have the documents like,

```js
db.products.insertMany( [
  { _id: 100, sku: "abc123", description: "Single line description." },
  { _id: 101, sku: "abc789", description: "First line\nSecond line" },
  { _id: 102, sku: "xyz456", description: "Many spaces before     line" },
  { _id: 103, sku: "xyz789", description: "Multiple\nline description" },
  { _id: 104, sku: "Abc789", description: "SKU starts with A" }
]);
```

## Let's find the descriptions with the word `line`:

```js
db.products.find({
  description: { $regex: /line/gmi }
});
```

Output:

```js
[
  { _id: 100, sku: 'abc123', description: 'Single line description.' },
  { _id: 101, sku: 'abc789', description: 'First line\nSecond line' },
  {
    _id: 102,
    sku: 'xyz456',
    description: 'Many spaces before     line'
  },
  {
    _id: 103,
    sku: 'xyz789',
    description: 'Multiple\nline description'
  }
]
```
