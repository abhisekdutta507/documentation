# How to remove/rename a field from an object

Let's consider we have an object,

```js
db.customers.insertMany([
  {
    name: "Ajay Manna",
    mobile: "9876543210",
    billAmount: 600
  },
  {
    name: "Bijoy Saha",
    mobile: "9876543211",
    billAmount: 360
  },
  {
    name: "Chetna Talukdar",
    mobile: "9876543212",
    billAmount: 460
  },
]);
```

## Let's remove the mobile from the documents

```js
db.customers.updateMany({
}, {
  $unset: { "mobile": false }
});
```

## Let's rename the billAmount to pendingAmount

```js
db.customers.updateMany({

}, {
  $rename: {
    billAmount: "pendingAmount"
  }
});
```
