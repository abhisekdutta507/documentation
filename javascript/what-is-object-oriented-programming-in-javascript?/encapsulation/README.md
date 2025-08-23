## What is Encapsulation?

In **Object-Oriented Programming** we create a group of the properties & the member functions. The group is called an object. And the technique of grouping will be called **Encapsulation**.

### Example:

```ts
const employee = {
  name: "Abhisek Dutta",
  email: "abhisek.dutta.507@gmail.com",
  mobile: 9876543210,
  getName() {
    return this.name;
  },
  getEmail() {
    return this.email;
  },
  getMobile() {
    return this.mobile;
  },
};

console.log(employee.getName());
```
