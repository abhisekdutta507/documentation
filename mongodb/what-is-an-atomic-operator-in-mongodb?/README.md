## What is an Atomic operator?

The concept of `"atomic operators"` refers to the update operators that ensure atomicity at the single-document level.

This means an operation using atomic operators either completes entirely or it fails completely.

### List of Atomic operators:

Please go-through the [MongoDB documentation](https://www.mongodb.com/docs/manual/reference/mql/update/).

#### Field Update Operators:

  * **$set**: Sets the value of a field. If the field does not exist, it creates the new field.
  * **$setOnInsert**: Sets the value of a field only if the update operation results in an insert (i.e., when `upsert: true` is used and no document matches the query criteria).
  * **$unset**: Removes a specified field from a document.
  * **$inc**: Increments the value of a field by a specified amount. If the field does not exist, it creates the field with the specified value.
  * **$mul**: Multiplies the value of a field by a specified amount. If the field does not exist, it creates the field with the value 0 and then multiplies it.
  * **$rename**: Renames a field.
  * **$min**: Only updates the field if the specified value is less than the current field value.
  * **$max**: Only updates the field if the specified value is greater than the current field value.
  * **$currentDate**: Sets the value of a field to the current date, either as a Date object or a Unix timestamp.

#### Array Update Operators:

  * **$push**: Appends a value to an array.
  * **$each**: Used with `$push` to add multiple values to an array.
  * **$position**: The `$position` modifier specifies the location in the array at which the `$push` operator inserts elements.
  * **$slice**: Used with `$push` to limit the number of elements in an array after the `$push` operation.
  * **$sort**: Used with `$push` to sort the array after the push operation.
  * **$addToSet**: Adds a value to an array only if it is not already present.
  * **$pop**: Removes the first or last element from an array. Pass `$pop` a value of `-1` to remove the first element of an array and `1` to remove the last element in an array.
  * **$pull**: Removes all instances of a specified value from an array.
  * **$pullAll**: Removes all instances of the specified values from an array.

#### Other Operators:

  * **$bit**: Performs a bitwise operation (AND, OR, XOR) on a field.

