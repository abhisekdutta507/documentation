### Snippet description of `call`

**Pass reference of object B** in `getFullName()` of object **A**.

```js
const personA = {
    firstName: 'Abhisek',
    lastName: 'Dutta',
    getFullName: function (city, country) {
        console.log(`${this.firstName} ${this.lastName} lives in ${city}, ${country}`);
    }
};

const personB = {
    firstName: 'Anyone',
    lastName: 'Dutta'
};

personA.getFullName('Kolkata', 'India');
// Output: Abhisek Dutta lives in Kolkata, India

/**
 * @description passing the reference of personB in getFullName()
 */
personA.getFullName.call(personB, 'Kolkata', 'India');
// Output: Anyone Dutta lives in Kolkata, India
```

### Snippet description of `apply`

**apply** is very similar to **call**. The only difference is in the **arguments**.

```js
/**
 * @description passing array as the 2nd argument unlike call
 */
personA.getFullName.apply(personB, ['Kolkata', 'India']);
// Output: Anyone Dutta lives in Kolkata, India
```

### Snippet description of `bind`

**bind** instead of calling it creates a new `function`. That we can use in future.

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

### With `bind` we can set default arguments

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
