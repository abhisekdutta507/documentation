### What is a Component in React.js?

Components are building blocks of React.js applications. It allows us to split the UI into multiple independent & reusable pieces. There are 2 main types of components in React. **Functional** components & **Class** components.

#### Functional Components

Functional components are JavaScript/TypeScript functions that return JSX/TSX elements.

```tsx
interface ICardProps {
  label: string;
  fontColor: string;
  bgColor: string;
}

function Card({
  label,
  bgColor,
  fontColor
}: ICardProps) {
  return (
    <div className={`flex w-[240px] h-[240px] ${bgColor} ${fontColor} items-center justify-center`}>
      {label}
    </div>
  );
}
```

#### Class Components

Class components are ES6 classes. They can have their own lifecycle methods. **We cannot use class based components on server side**. We must write `"use client";` to use class based components.

```tsx
"use client";

import { Component } from "react";

interface ICardProps {
  label: string;
  fontColor: string;
  bgColor: string;
}

export class Card extends Component<ICardProps> {
  constructor(props: ICardProps) {
    super(props);
  }

  render() {
    const { label, bgColor, fontColor } = this.props;
    return (
      <div className={`flex w-[240px] h-[240px] ${bgColor} ${fontColor} items-center justify-center`}>
        {label}
      </div>
    );
  }
}
```

#### Key Characteristics of Components

1. **Reusability:** Components can be reused throughout the application. It can reduce the amount of code to be written also easy to maintain.
2. **Props:** Properties are read-only inputs that can be passed to components. They allow to pass data from parent to child components.
    ```tsx
    interface IGreetingProps {
      name: string;
    }

    function Greeting({
      name,
    }: IGreetingProps) {
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
    ```tsx
    "use client";

    import { FormEvent, useState } from "react";

    export function Counter() {
      const [count, setCount] = useState<number>(0);

      const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCount(count + 1);
      };

      return (
        <form className="flex flex-wrap gap-2 p-4 max-w-md" method="post" onSubmit={handleSubmit}>
          <span className="flex items-center justify-center w-3xs h-8">{count}</span>
          <button type="submit" className="cursor-pointer">Increase</button>
        </form>
      );
    };
    ```

    **Functional Component with FormData:**
    ```tsx
    "use client";

    import { FormEvent } from "react";

    export function SummationForm() {
      const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = new FormData(event?.currentTarget);
        const valueA = form.get("valueA") as string;
        const valueB = form.get("valueB") as string;

        try {
          const numberA = Number(valueA);
          const numberB = Number(valueB);
          const summation = numberA + numberB;
          alert(`${numberA} + ${numberB} = ${summation}`);
        } catch (e) {
          alert("Failed to read the numbers!");
        }
      };

      return (
        <form className="flex flex-wrap gap-2 p-4 max-w-md" method="post" onSubmit={handleSubmit}>
          <input name="valueA" type="number" placeholder="Number A" />
          <input name="valueB" type="number" placeholder="Number B" />
          <button type="submit" className="cursor-pointer">Sum</button>
        </form>
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