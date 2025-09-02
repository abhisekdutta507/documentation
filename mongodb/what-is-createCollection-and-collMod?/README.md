# What is createCollection?

CreateCollection is a method in MongoDB used to create a new collection within a database. We can specify the schema with custom validation.

```js
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["firstName", "lastName", "mobile", "email"],
      properties: {
        firstName: {
          bsonType: "string",
          description: "'firstName' must be a string and is required"
        },
        lastName: {
          bsonType: "string",
          description: "'lastName' must be a string and is required"
        },
        mobile: {
          bsonType: "string",
          description: "'mobile' must be a string and is required"
        },
        email: {
          bsonType: "string",
          description: "'email' must be a string and is required"
        },
        dob: {
          bsonType: "date",
          description: "'date' must be a Date"
        }
      }
    }
  }
});
```

# What is collMod?

What if the collection already exists. We can apply schema validation to existing collections.

```js
db.runCommand({
  collMod: "users",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["firstName", "lastName", "mobile", "email"],
      properties: {
        firstName: {
          bsonType: "string",
          description: "'firstName' must be a string and is required"
        },
        lastName: {
          bsonType: "string",
          description: "'lastName' must be a string and is required"
        },
        mobile: {
          bsonType: "string",
          description: "'mobile' must be a string and is required"
        },
        email: {
          bsonType: "string",
          description: "'email' must be a string and is required"
        },
        dob: {
          bsonType: "date",
          description: "'date' must be a Date"
        }
      }
    }
  }
});
```

## Set `minimum` & `maximum` values for properties.

We will set minimum to **0** and maximum to **12000**.

```js
db.runCommand({
  collMod: "accounts",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["balance", "userId"],
      properties: {
        balance: {
          bsonType: "number",
          minimum: 0,
          maximum: 12000
        },
        userId: {
          bsonType: "objectId"
        }
      }
    }
  }
});
```

Output:

```js
{
  ok: 1,
  '$clusterTime': {
    clusterTime: Timestamp({ t: 1756854115, i: 3 }),
    signature: {
      hash: Binary.createFromBase64('Ji5oqSsS3kYZ429QCQST1MtaPCI=', 0),
      keyId: Long('7512551327222726659')
    }
  },
  operationTime: Timestamp({ t: 1756854115, i: 3 })
}
```