# What is an ordered insert?

While we are inserting data MongoDB by default assigns an `ObjectId` to each document. We can explicitly pass the `_id` property to override the `ObjectId`.

In that case, we must make sure the explicit `_id` is always unique.

When performing the `insertOne` or `insertMany` operations MongoDB generates and auto assigns the `ObjectId` to each object. The `ObjectId` will be generated in a chronological order of time.

```js
db.products.insertMany(
  [
    {
      _id: "acer-aspire-laptop-2025",
      name: "Aspire 2025",
      type: "Casual",
      price: 35000,
      manufacturer: "Acer",
    },
    {
      _id: "lenovo-ideapad-laptop-2025",
      name: "IdeaPad 2025",
      type: "Premium",
      price: 90000,
      manufacturer: "Lenovo",
    },
  ],
  {
    ordered: true, // default is true
  }
);
```

## What if an _id acer-aspire-laptop-2025 already exists in the collection?

MongoDB will ignore the next inserts. So, the object **lenovo-ideapad-laptop-2025** won't be inserted.

```js
E11000 duplicate key error collection: practice.products index: _id_ dup key: { _id: "acer-aspire-laptop-2025" }
```

## How to get rid of the above situation

By default, the `ordered` property will be set to `true`. When inserting if 1 insert fails. MongoDB will ignore the next inserts. To avaoid that situation,

```js
db.products.insertMany(
  [
    {
      _id: "acer-aspire-laptop-2025",
      name: "Aspire 2025",
      type: "Casual",
      price: 35000,
      manufacturer: "Acer",
    },
    {
      _id: "lenovo-ideapad-laptop-2025",
      name: "IdeaPad 2025",
      type: "Premium",
      price: 90000,
      manufacturer: "Lenovo",
    },
  ],
  {
    ordered: false, // default is true
  }
);
```

We can pass ordered as `false`.

## What if the requirement is to fail the entire operation when 1 fails.

We can use `transaction` to implement the same.

```js
import { MongoClient, ClientSession } from "mongodb";

/**
 * @typedef {Object} Product
 * @property {string} _id
 * @property {string} name
 * @property {string} type
 * @property {number} price
 * @property {string} manufacturer
 */

/**
 * @typedef {Object} GenericServiceResponse
 * @property {boolean} error
 * @property {string} errorCode
 * @property {string} message
 */

const ERROR_CODE = {
  yHxteqS3: "yHxteqS3",
  imFzrka5: "imFzrka5",
  generic: "generic",
};

/**
 * @type {Map<string, GenericServiceResponse>}
 */
const ERROR_COLLETION = new Map([
  [ERROR_CODE.yHxteqS3, {
    error: true,
    errorCode: ERROR_CODE.yHxteqS3,
    message: "Error message ...",
  }],
  [ERROR_CODE.imFzrka5, {
    error: true,
    errorCode: ERROR_CODE.imFzrka5,
    message: "Error message ...",
  }],
  [ERROR_CODE.generic, {
    error: true,
    errorCode: ERROR_CODE.generic,
    message: "Error message ...",
  }],
]);

/**
 * @type {(products: Product[], client: MongoClient, session: ClientSession) => Promise<GenericServiceResponse>}
 */
export async function insertProductsWithId(products, client, session) {
  /**
   * @type {GenericServiceResponse}
   */
  let genericServiceResponse = {
    error: false,
    errorCode: "",
    message: "",
  };

  try {
    const productsCollection = client.db("practice").collection("products");
    await session.withTransaction(async () => {
      await productsCollection.insertMany(products, { session });
    });
  } catch (e) {
    const errorType = e?.message || "";
    if (!ERROR_COLLETION.has(errorType)) {
      genericServiceResponse = ERROR_COLLETION.get(ERROR_CODE.generic);
      genericServiceResponse.message = errorType;
    } else {
      genericServiceResponse = ERROR_COLLETION.get(errorType);
    }
  } finally {
    return genericServiceResponse;
  }
}
```
