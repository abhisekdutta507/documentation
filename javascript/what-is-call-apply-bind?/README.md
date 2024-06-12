### What is call, apply & bind?

`call`, `apply`, and `bind` are the methods in JavaScript that are used to control the execution context (the value of this) of a function.

#### GUIDE

1. `call`: This method is used to invoke a function with a specified this value and arguments provided individually. Here's the syntax:

```js
functionName.call(thisArg, arg1, arg2, ...);
```

- `thisArg`: The value to be passed as this to the function being called.
- `arg1, arg2, ...`: Optional arguments to be passed to the function.

#### Example:

```js
const personA = {
    firstName: 'Abhisek',
    lastName: 'Dutta',
    getFullName: function (city, country) {
        console.log(`${this.firstName} ${this.lastName} lives in ${city}, ${country}`);
    }
};

personA.getFullName('Kolkata', 'India');
// Output: Abhisek Dutta lives in Kolkata, India
```

**Pass reference of object personB** in `getFullName()` of object **personA**.

```js
const personB = {
    firstName: 'Anyone',
    lastName: 'Dutta'
};

/**
 * @description passing the reference of personB in getFullName()
 */
personA.getFullName.call(personB, 'Kolkata', 'India');
// Output: Anyone Dutta lives in Kolkata, India
```

<br>
<br>

2. `apply`: **apply** is very similar to **call**. The only difference is in the **arguments** provided as an array. The syntax is:

```js
functionName.call(thisArg, [arg1, arg2, ...]);
```

- `thisArg`: The value to be passed as this to the function being called.
- `[arg1, arg2, ...]`: An array or array-like object containing arguments to be passed to the function.

#### Example:

```js
/**
 * @description passing array as the 2nd argument unlike call
 */
personA.getFullName.apply(personB, ['Kolkata', 'India']);
// Output: Anyone Dutta lives in Kolkata, India
```

<br>
<br>

3. `bind`: **bind** instead of calling it creates a new `function`. That we can use in future. The syntax is:

```js
const newFunction = functionName.bind(thisArg, arg1, arg2, ...);
```

- `thisArg`: The value to be passed as `this` to the function when the new function is called.
- `arg1, arg2, ...`: Optional arguments to be partially applied to the new function.

#### Example:

```js
const personC = {
    firstName: 'Someone',
    lastName: 'Dutta'
};

/**
 * @description getFullName_v2 is a function
 */
const getFullName_v2 = personA.getFullName.bind(personC, 'Kolkata', 'India');

// call the function to execute
getFullName_v2();
// Output: Someone Dutta lives in Kolkata, India
```

#### With `bind` we can set default arguments

Setting default arguments with `bind`.

```js
const personD = {
    firstName: 'Anotherone',
    lastName: 'Dutta'
};

/**
 * @description passing only city argument as default
 */
const getFullName_v3 = personA.getFullName.bind(personD, 'Bangaluru');

// call the function to execute
getFullName_v3('Karnataka');
// Anotherone Dutta lives in Bangaluru, Karnataka
```
