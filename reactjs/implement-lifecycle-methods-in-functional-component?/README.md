### 1. `componentDidMount`

#### Class component

```jsx
import React from 'react';

class MyComponent extends React.Component {
  componentDidMount() {
    // Code to run after the component mounts
  }

  render() {
    return <div>Hello, World!</div>;
  }
}
```

#### Functional component

```jsx
import React, { useEffect } from 'react';

const MyComponent = () => {

  useEffect(() => {
    // Code to run after the component mounts
  }, []); // Empty dependency array means this runs once after initial render

  return (
    <div>Hello, World!</div>
  );
}
```

### 2. `componentDidUpdate`

#### Class component

```jsx
import React from 'react';

class MyComponent extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    // Code to run after the component updates
  }

  render() {
    return <div>Hello, World!</div>;
  }
}
```

#### Functional component

```jsx
import React, { useEffect } from 'react';

const MyComponent = ({ someProp }) => {

  useEffect(() => {
    // Code to run after the component updates
  }, [someProp]); // Only re-run the effect if someProp changes

  return (
    <div>Hello, World!</div>
  );
}
```

### 3. `componentWillUnmount`

#### Class component

```jsx
import React from 'react';

class MyComponent extends React.Component {
  componentWillUnmount() {
    // Code to run just before the component unmounts
  }

  render() {
    return <div>Hello, World!</div>;
  }
}
```

#### Functional component

```jsx
import React, { useEffect } from 'react';

const MyComponent = () => {

  useEffect(() => {
    
    return () => {
      // Code to run just before the component unmounts
    };
  }, []); // Empty dependency array ensures this runs once, similar to componentDidMount

  return <div>Hello, World!</div>;
}
```

### 4. Implementing `shouldComponentUpdate` in Functional component

In functional components, the `shouldComponentUpdate` method, which is available in class components, can be mimicked using the `React.memo` function and the `useMemo` hook. `React.memo` is a higher-order component that optimizes performance by memoizing the result, only re-rendering the component when its props change.

#### Using `React.memo`

`React.memo` is the functional component equivalent of `shouldComponentUpdate`. It allows you to prevent unnecessary re-renders by memoizing the component and re-rendering it only when its props change.

#### Basic Example of `React.memo`

Here’s an example of how to use `React.memo` to optimize a functional component:

```jsx
import React from 'react';

const MyComponent = React.memo(function MyComponent({ name }) {
  console.log('MyComponent rendered');
  return <div>Hello, {name}</div>;
});

export default MyComponent;
```

In this example, `MyComponent` will only re-render if its `name` prop changes.

#### Custom Comparison Function

By default, `React.memo` performs a shallow comparison of props. If you need more control over when the component should update, you can provide a custom comparison function as the second argument to `React.memo`.

#### Example with Custom Comparison Function

```jsx
import React from 'react';

const MyComponent = React.memo(function MyComponent({ name, age }) {
  console.log('MyComponent rendered');
  return (
    <div>
      Hello, {name}. You are {age} years old.
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.name === nextProps.name && prevProps.age === nextProps.age;
});

export default MyComponent;
```

In this example, `MyComponent` will only re-render if either the `name` or `age` prop changes. The custom comparison function ensures that the component only updates when necessary.

#### Using `useMemo` for Memoizing Expensive Calculations

For cases where you need to optimize performance within the component itself, you can use the `useMemo` hook to memoize expensive calculations.

#### Example with `useMemo`

```jsx
import React, { useMemo } from 'react';

function ExpensiveComponent({ count }) {
  const computeExpensiveValue = (count) => {
    console.log('Computing expensive value');
    // Simulate an expensive calculation
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += i;
    }
    return result + count;
  };

  const expensiveValue = useMemo(() => computeExpensiveValue(count), [count]);

  return (
    <div>
      <p>Expensive value: {expensiveValue}</p>
    </div>
  );
}

export default ExpensiveComponent;
```

In this example, the `computeExpensiveValue` function is only re-executed when the `count` prop changes, thanks to the `useMemo` hook.

#### Summary

To implement `shouldComponentUpdate` in functional components, you can use:

- **`React.memo`**: Wrap your functional component with `React.memo` to prevent unnecessary re-renders based on prop changes.
- **Custom comparison function**: Provide a custom comparison function to `React.memo` for more granular control over when the component should update.
- **`useMemo`**: Memoize expensive calculations within the component to optimize performance.

These techniques help you manage re-renders and optimize the performance of your React functional components effectively.
