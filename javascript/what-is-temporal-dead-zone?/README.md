# What is Temporal Dead Zone(TDZ)?

## The Temporal Dead Zone (TDZ) is a behavior in JavaScript that occurs with variables declared using `let` and `const`. The TDZ starts at the beginning of the block where the variable is declared and ends when the variable is initialized with a value.

### Example Illustrating Temporal Dead Zone:

#### Using `let`:

```js
console.log(x);       // ReferenceError: x is not defined
{
  // TDZ starts here for `x`

  console.log(x);     // ReferenceError: Cannot access 'x' before initialization

  let x = 5; // TDZ ends here for `x`
  console.log(x); // Output: 5
}
```
