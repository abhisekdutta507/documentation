### What is Destructuring?

Destructuring in JavaScript is a syntax feature that allows you to extract values from arrays or properties from objects.

#### Array Destructuring

```js
const array = [1, 2, 3, 4];

// Traditional way
const a = array[0];
const b = array[1];

// Using destructuring
const [x, y] = array;

console.log(x); // Output: 1
console.log(y); // Output: 2
```

#### Skipping Elements:

```js
const array = [1, 2, 3, 4];
const [first, , third] = array;

console.log(first); // Output: 1
console.log(third); // Output: 3
```

#### Last Element of an Array:

```js
const array = [1, 2, 3, 4];

/**
 * The last element is: array[3]
 * That means array[array.length - 1]
 * We can utilize the [] snippet for Objects as well like obj["fistName"]
 * That means we can destructure the last element like an Object destructure
 */
const { [0]: first } = users;
const { [1]: second } = users;
const { [array.length - 1]: second } = array;

console.log(first);   // 1
console.log(second);  // 2
console.log(second);  // 4
```

#### Using Rest Operator:

```js
const array = [1, 2, 3, 4];
const [first, ...rest] = array;

console.log(first); // Output: 1
console.log(rest);  // Output: [2, 3, 4]

```

#### Object Destructuring

```js
const person = {
  name: 'Abhisek',
  age: 28,
  country: 'India'
};

// Traditional way
const name = person.name;
const age = person.age;

// Using destructuring
const { name, age } = person;

console.log(name); // Output: Abhisek
console.log(age);  // Output: 28

```

#### Renaming Variables:

```js
const person = {
  name: 'Abhisek',
  age: 28,
  country: 'India'
};

const { name: personName, age: personAge } = person;

console.log(personName); // Output: Abhisek
console.log(personAge);  // Output: 28

```

#### Default Values:

```js
const person = {
  name: 'Abhisek',
  age: 28
};

const { name, age, country = 'Unknown' } = person;

console.log(country); // Output: Unknown

```

#### Nested Destructuring:

```js
const person = {
  name: 'Abhisek',
  address: {
    city: 'Kolkata',
    zip: '700104'
  }
};

const { address: { city, zip } } = person;

console.log(city); // Output: Kolkata
console.log(zip);  // Output: 700104

```

#### Function Parameters Destructuring

```js
function greet({ name, age }) {
  console.log(`Hello, my name is ${name} and I am ${age} years old.`);
}

const person = { name: 'Abhisek', age: 28 };
greet(person); // Output: Hello, my name is Abhisek and I am 28 years old.

```

#### But, the below example in a syntax error:

```js
const list = [...new Array(5)];
const table = list.map((, index) => index * 2); // SyntaxError: Unexpected token ','
```
