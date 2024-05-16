# Should you start learning programming with JavaScript?

### GUIDE

#### Starting with JavaScript can be a great choice for learning programming. Here are a few reasons why starting with JavaScript might be a good idea:

1. **Popularity and Versatility:** JavaScript is one of the most popular programming languages in the world. It's used for web development (both front-end and back-end), mobile app development, game development, and even for building desktop applications using frameworks like Electron.

2. **Immediate Feedback:** You can run JavaScript code directly in a web browser, which provides immediate feedback. This makes it easier to see the results of your code and debug any issues.

3. **Abundant Learning Resources:** There are numerous online tutorials, courses, and resources available for learning JavaScript, making it easier to find help and guidance as you learn.

#### However, you might gain bad practices too if you start with JavaScript. Here are some potential disadvantages to consider when starting with JavaScript:

1. **Weak Typing:** Unlike C or C++, JavaScript is a weakly/loosely typed language, meaning variables can change types dynamically. While this can provide flexibility, it can also lead to unexpected behavior and bugs if not managed carefully.

2. **Scope of Use:** Although JavaScript is versatile, it may not be the best choice for certain types of development, such as low-level system programming or high-performance computing. Other languages like C++ or Rust may be more suitable for such tasks.

3. **Missing OOPs:** JavaScript does not follow the concept of Object Oriented Programming. Which can lead the codebase into a garbage if not maintained carefully. Along with JavaScript you should also learn TypeScript which is an open-source programming language developed by Microsoft. TypeScript brings some of the OOPs principles into JavaScript.

#### JavaScript Snippet

```js
const studentA = {
  name: 'Pritam Saha', // string
  age: 16 // number
};

// we can assign a string value to age. JavaScript has no restriction for that.
studentA.age = '17';
```

#### TypeScript Snippet

```ts
interface Student {
  name: string;
  age: number;
};

const studentA: Student = {
  name: 'Pritam Saha',
  age: 17
};
```

#### The below line will throw a compilation error: **Type 'string' is not assignable to type 'number'.**

```ts
studentA.age = '17';
```
