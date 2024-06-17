### How to create a custom hook in React?

#### We will create a custom hook that returns the time every second

#### Considerations
  1. **Naming**: Custom hooks should always start with `use` to follow React’s conventions and ensure that hooks are identified correctly.
  1. **Dependencies**: Pay attention to dependencies in hooks like useEffect to avoid unnecessary re-renders or missed updates.
  1. **Testing**: Custom hooks can be tested separately from components, making your tests more focused and easier to write.

#### Example

```jsx
import React from 'react';

const Home = () => {
  const { time } = useTime(1);

  return (
    <div className='home'>
      <label className='m-r-1'>Time:</label>
      <div className='time'>{time}</div>
    </div>
  );
};
```

#### Implementation of the `useTime()` custom hook

```jsx
import React, { useState, useEffect, useRef } from 'react';

const useTime = (interval = 1) => {
  const [time, setTime] = useState('');
  const timer = useRef(0);

  useEffect(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }

    timer.current = setInterval(() => {
      setTime('');
    }, 1000 * interval);

    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return { time };
};
```
