# What is Aggregation?

Aggregation in MongoDB processes documents through pipeline stages to filter, group, analyze and transform data.

## Explain aggregation with examples:

Let's consider we have a users collection:

```js
db.users.insertMany([
  {
    _id: ObjectId("68b189fbd9e431d6fa188943"),
    name: "AceCore",
    age: 29,
    email: "acecore@example.com"
  },
  {
    _id: ObjectId("68b189fbd9e431d6fa188944"),
    name: "ElectroXehanort",
    age: 34,
    email: "electroxehanort@example.com"
  },
  {
    _id: ObjectId("68b189fbd9e431d6fa188945"),
    name: "JackalPunch",
    age: 33,
    email: "jackalpunch@example.com"
  },
  {
    _id: ObjectId("68b189fbd9e431d6fa188946"),
    name: "BadassPower",
    age: 32,
    email: "badasspower@example.com"
  },
  {
    _id: ObjectId("68b189fbd9e431d6fa188947"),
    name: "RadianceWarrior",
    age: 30,
    email: "radiancewarrior@example.com"
  },
  {
    _id: ObjectId("68b189fbd9e431d6fa188948"),
    name: "FelineMelody",
    age: 28,
    email: "felinemelody@example.com"
  },
  {
    _id: ObjectId("68b189fbd9e431d6fa188949"),
    name: "SunburstFrenzy",
    age: 31,
    email: "sunburstfrenzy@example.com"
  },
]);
```

We have a products collection:

```js
db.products.insertMany([
  {
    sku: "SKU-1",
    description: {
      label: "Moto g85",
      varient: "12GB",
      price: 14999
    }
  },
  {
    sku: "SKU-2",
    description: {
      label: "Realme P3 5G",
      varient: "12GB",
      price: 14999
    }
  },
  {
    sku: "SKU-3",
    description: {
      label: "Realme P3X",
      varient: "8GB",
      price: 11699
    }
  },
  {
    sku: "SKU-4",
    description: {
      label: "Vivo T4 Lite 5G",
      varient: "8GB",
      price: 9499
    }
  },
  {
    sku: "SKU-5",
    description: {
      label: "Moto g45 8GB",
      varient: "8GB",
      price: 10999
    }
  },
  {
    sku: "SKU-6",
    description: {
      label: "Oppo K13 5G",
      varient: "8GB",
      price: 10999
    }
  }
]);
```

We have a carts collection:

```js
db.shoppingcarts.insertMany([
  {
    _id: ObjectId('68b188cad9e431d6fa188942'),
    items: [
      {
        product: "SKU-1",
        quantity: 1
      }
    ],
    couponsApplied: [
      
    ],
    userId: ObjectId("68b189fbd9e431d6fa188943")
  }
]);
```

We will run lookup to join the collections:

### Join users & shoppingcarts:

```js
db.users.aggregate([
  {
    $match: {
      _id: ObjectId("68b189fbd9e431d6fa188943")
    }
  },
  {
    $lookup: {
      from: "shoppingcarts",
      localField: "_id",
      foreignField: "userId",
      as: "shoppingcart",
      pipeline: [
        {
          $project: {
            _id: 0,
            userId: 0
          }
        }
      ]
    }
  },
  {
    $unwind: {
      path: "$shoppingcart",
      preserveNullAndEmptyArrays: true
    }
  }
]);
```

Output:

```js
{
  _id: ObjectId('68b189fbd9e431d6fa188943'),
  name: 'AceCore',
  age: 29,
  email: 'acecore@example.com',
  shoppingcart: {
    items: [
      {
        product: 'SKU-1',
        quantity: 1
      }
    ],
    couponsApplied: []
  }
}
```

### Join shoppingcarts & products:

```js
db.shoppingcarts.aggregate([
  {
    $match: {
      _id: ObjectId("68b188cad9e431d6fa188942")
    }
  },
  {
    $lookup: {
      from: "products",
      localField: "items.product",
      foreignField: "sku",
      as: "products",
      pipeline: [
        {
          $project: {
            _id: 0,
          }
        }
      ]
    }
  },
  {
    $project: {
      userId: 0
    }
  }
]);
```

Output:

```js
{
  _id: ObjectId('68b188cad9e431d6fa188942'),
  items: [
    {
      product: 'SKU-1',
      quantity: 1
    }
  ],
  couponsApplied: [],
  products: [
    {
      sku: 'SKU-1',
      description: {
        label: 'Moto g85',
        varient: '12GB',
        price: 14999
      }
    }
  ]
}
```

### Join users, shoppingcarts & products:

**Step 1**

```js
db.users.aggregate([
  {
    $match: {
      _id: ObjectId("68b189fbd9e431d6fa188943")
    }
  },
  {
    $lookup: {
      from: "shoppingcarts",
      localField: "_id",
      foreignField: "userId",
      as: "shoppingcart",
      pipeline: [
        {
          $lookup: {
            from: "products",
            localField: "items.product",
            foreignField: "sku",
            as: "products",
            pipeline: [
              {
                $project: {
                  _id: 0,
                }
              }
            ]
          }
        },
        {
          $project: {
            _id: 0,
            userId: 0
          }
        }
      ]
    }
  },
  {
    $unwind: {
      path: "$shoppingcart",
      preserveNullAndEmptyArrays: true
    }
  }
]);
```

Output:

```js
{
  _id: ObjectId('68b189fbd9e431d6fa188943'),
  name: 'AceCore',
  age: 29,
  email: 'acecore@example.com',
  shoppingcart: {
    items: [
      {
        product: 'SKU-1',
        quantity: 1
      }
    ],
    couponsApplied: [],
    products: [
      {
        sku: 'SKU-1',
        description: {
          label: 'Moto g85',
          varient: '12GB',
          price: 14999
        }
      }
    ]
  }
}
```

**To simplify this let's create an object:**

```js
db.paymentsqueue.insertOne({
  _id: ObjectId('68b189fbd9e431d6fa188943'),
  name: 'AceCore',
  age: 29,
  email: 'acecore@example.com',
  shoppingcart: {
    items: [
      {
        product: 'SKU-1',
        quantity: 1
      }
    ],
    couponsApplied: [],
    products: [
      {
        sku: 'SKU-1',
        description: {
          label: 'Moto g85',
          varient: '12GB',
          price: 14999
        }
      }
    ]
  }
});
```

**Now we want to merge the `shoppingcart.items` with `shoppingcart.products`.**

```js
db.paymentsqueue.aggregate([
  {
    $match: {
      _id: ObjectId('68b189fbd9e431d6fa188943')
    }
  },
  {
    $addFields: {
      "shoppingcart.items": {
        $map: {
          input: "$shoppingcart.items",
          as: "item",
          in: {
            $mergeObjects: [
              "$$item",
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$shoppingcart.products",
                      as: "product",
                      cond: {
                        $eq: ["$$product.sku", "$$item.product"]
                      }
                    }
                  },
                  0
                ]
              }
            ]
          }
        }
      }
    }
  },
  {
    $project: {
      "shoppingcart.products": 0,
      "shoppingcart.items.product": 0
    }
  }
]);
```

Output:

```js
{
  _id: ObjectId('68b189fbd9e431d6fa188943'),
  name: 'AceCore',
  age: 29,
  email: 'acecore@example.com',
  shoppingcart: {
    items: [
      {
        quantity: 1,
        sku: 'SKU-1',
        description: {
          label: 'Moto g85',
          varient: '12GB',
          price: 14999
        }
      }
    ],
    couponsApplied: []
  }
}
```
