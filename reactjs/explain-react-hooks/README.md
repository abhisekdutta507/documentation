### Explain React Hooks.

In React hooks are special type of functions that allow developers to implement states & lifecycles in Functional components.

#### Commonly Used Hooks

1. **useState**
    - Manages state in a functional component.
    ```jsx
    import React, { useState } from 'react';

    function Counter() {
      const [count, setCount] = useState(0);

      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
      );
    }
    ```
1. **useEffect**
    - Handles side effects in functional components.
    ```jsx
    import React, { useEffect, useState } from 'react';

    function DataFetcher() {
      const [data, setData] = useState(null);

      useEffect(() => {
        fetch('https://api.example.com/data')
          .then(response => response.json())
          .then(data => setData(data));

        return () => {
          // Cleanup if necessary
        };
      }, []); // Empty dependency array means it runs only once

      return <div>{data ? data.message : 'Loading...'}</div>;
    }
    ```
1. **useContext**
    - Avoids prop drilling by providing a way to share values between components without passing props explicitly.
    ```jsx
    import React, { useContext, createContext } from 'react';

    const MyContext = createContext({
      userName: '',
      setUserName: () => {},
    });

    function MyComponent() {
      const { userName, setUserName } = useContext(MyContext);

      const handleChange = ({ target }) => {
        const { value } = target;
        setUserName(value);
      }

      return <input name='userName' value={userName} onChange={handleChange} />;
    }

    function App() {
      const [userName, setUserName] = useState('');

      return (
        <MyContext.Provider
          value={{
            userName,
            setUserName,
          }}
        >
          <MyComponent />
        </MyContext.Provider>
      );
    }
    ```
1. **useReducer**
    - Manages more complex state logic than useState.
    - Similar to Redux, it uses a reducer function to handle state transitions.
    ```jsx
    import React, { useReducer } from 'react';

    const initialState = { count: 0 };

    function reducer(state, action) {
      switch (action.type) {
        case 'increment':
          return { count: state.count + 1 };
        case 'decrement':
          return { count: state.count - 1 };
        default:
          throw new Error();
      }
    }

    function Counter() {
      const [state, dispatch] = useReducer(reducer, initialState);

      return (
        <div>
          <p>Count: {state.count}</p>
          <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
          <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
        </div>
      );
    }
    ```
1. **useRef**
    - Creates a mutable object that persists across re-renders.
    ```jsx
    import React, { useRef, useEffect } from 'react';

    function TextInputWithFocusButton() {
      const inputEl = useRef(null);

      const onButtonClick = () => {
        inputEl.current.focus();
      };

      return (
        <div>
          <input ref={inputEl} type="text" />
          <button onClick={onButtonClick}>Focus the input</button>
        </div>
      );
    }
    ```
1. **useMemo**
    - useMemo memoizes a value to avoid expensive calculations on every render. [Find more here](https://bitbucket.org/abhisekdutta507/react-usememo/src/master/).
1. **useCallback**
    - useCallback memoizes a function to avoid re-creating it on every render. [Find more here](https://bitbucket.org/abhisekdutta507/react-usecallback/src/master/).
1. **useImperativeHandle**
    - It allows us to control the values and methods of a Child component from it's parent via `ref`. [Find more here](https://bitbucket.org/abhisekdutta507/react-use-imperative-handle/src/master/).
    
    **Syntax**
    ```jsx
    useImperativeHandle(ref, createHandle, [deps])
    ```
1. **Custom Hooks**
    ```jsx
    import { useState, useEffect } from 'react';

    function useFetch(url) {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            setData(data);
            setLoading(false);
          });
      }, [url]);

      return { data, loading };
    }

    function DataComponent() {
      const { data, loading } = useFetch('https://api.example.com/data');

      if (loading) return <div>Loading...</div>;
      return <div>{data.message}</div>;
    }
    ```
