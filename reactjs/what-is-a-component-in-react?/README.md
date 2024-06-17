### What is a Component in React.js?

Components are building blocks of React.js applications. It allows us to split the UI into multiple independent & reusable pieces. There are 2 main types of components in React. **Functional** components & **Class** components.

#### Functional Components

Functional components are JavaScript functions that return JSX elements.

```jsx
function Greeting({ name = '' }) {
  return <h1>Hello, {name}!</h1>;
}
```

#### Class Components

Class components are ES6 classes. They can have their own lifecycle methods.

```jsx
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

#### Key Characteristics of Components

1. **Reusability:** Components can be reused throughout the application. It can reduce the amount of code to be written also easy to maintain.
2. **Props:** Properties are read-only inputs that are passed to components. They allow data to be passed from parent to child components.
    ```jsx
    function Greeting({ name = '' }) {
      return <h1>Hello, {name}!</h1>;
    }
    ```
3. **State:** States are built-in data members of each components. Using state a component holds data that may change over it's lifetime.
    **Class Component with State:**
    ```jsx
    class Counter extends React.Component {
      constructor(props) {
        super(props);
        this.state = { count: 0 };
      }

      increment = () => {
        this.setState({ count: this.state.count + 1 });
      }

      render() {
        return (
          <div>
            <p>Count: {this.state.count}</p>
            <button onClick={this.increment}>Increment</button>
          </div>
        );
      }
    }
    ```

    **Functional Component with State:**
    ```jsx
    import { useState } from 'react';

    function Counter() {
      const [count, setCount] = useState(0);

      const increment = () => {
        setCount(count + 1);
      };

      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={increment}>Increment</button>
        </div>
      );
    }
    ```
4. **Lifecycle Methods:** It is a concept of Class components. Though in Functional components we can use `useEffect` in different ways to achieve similar behaviour. But we can implement only few of the lifecycle methods in Functional components.
    ```jsx
    class MyComponent extends React.Component {
      componentDidMount() {
        // Runs after the component is mounted
      }

      componentDidUpdate(prevProps, prevState) {
        // Runs after the component updates
      }

      componentWillUnmount() {
        // Runs before the component is unmounted
      }

      render() {
        return <div>My Component</div>;
      }
    }
    ```

    **Functional Component with useEffect:**
    ```jsx
    const MyComponent = ({
      list = [],
    }) => {
      useEffect(() => {
        // Runs after the component is mounted. Compared with componentDidMount.

        return () => {
          // Runs before the component is unmounted. Compared with componentWillUnmount.
        };
      }, []); // Empty dependency array means it runs only once

      useEffect(() => {
        // Runs after the component updates. Compared with componentDidUpdate.
      }, [list]);

      return (
        <div className='my-component'>
          My Component
        </div>
      );
    }
    ```