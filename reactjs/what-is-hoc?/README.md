### What is HOC?

A **HOC** is a function that takes a Component as an argument and returns a new component.

#### Syntax

```jsx
import React, { useState } from 'react';

/**
 * @description Higher order custom component 
 */
const Custom = (OriginalComponent) => {

  const WithCustom = (props) => {

    const [state, setState] = useState({
      value: 0
    });

    const task = () => {
      setState({
        // update the value
      });
    };

    return <OriginalComponent {...props} value={state.value} task={task} />
  };

  return WithCustom;
}

export default Custom;
```

For more details please check the [bitbucket documentation](https://bitbucket.org/abhisekdutta507/react-higher-order-component/src/master/).
