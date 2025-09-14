# Memento Pattern 

Example of `Polymorphism` in Object-oriented programming. Let's implement the undo mechanism using Memento Pattern.

## Problem

The below snippet is a regular code snippet which holds multiple states & stacks to maintain the undo mechanism for each states.

```ts
interface IEditorState {
  name: string;
  mobile: number;
  email: string;
}

class Editor {
  #name: string;
  #mobile: number;
  #email: string;
  #nameStack: string[];
  #mobileStack: number[];
  #emailStack: string[];

  constructor(state: IEditorState) {
    this.#name = state.name;
    this.#mobile = state.mobile;
    this.#email = state.email;

    this.#nameStack = [];
    this.#mobileStack = [];
    this.#emailStack = [];
  }

  set state(state: IEditorState) {
    this.#nameStack.push(this.#name);
    this.#mobileStack.push(this.#mobile);
    this.#emailStack.push(this.#email);
    this.#name = state.name;
    this.#mobile = state.mobile;
    this.#email = state.email;
  }

  get state(): IEditorState {
    return {
      name: this.#name,
      mobile: this.#mobile,
      email: this.#email,
    };
  }

  undo() {
    if (this.#nameStack.length) 
      this.#name = this.#nameStack.pop() as string;

    if (this.#mobileStack.length) 
      this.#mobile = this.#mobileStack.pop() as number;

    if (this.#emailStack.length) 
      this.#email = this.#emailStack.pop() as string;
  }
}
```

To execute the above snippet,

```ts
function mementoPattern() {
  const editor = new Editor({
    name: "",
    mobile: 0,
    email: ""
  });
  editor.state = {
    name: "Abhisek Dutta",
    mobile: 876543210,
    email: ""
  };
  editor.state = {
    name: "Abhisek Dutta is a programmer",
    mobile: 8765432190,
    email: "abhisek@email.com"
  };

  editor.undo();
  editor.undo();

  console.log(editor.state);
}

mementoPattern();
```

## Solution

In Memento Pattern we breakdown the `class Editor` into `class EditorState` & `class StateHistory`.

```ts
interface IEditorState {
  name: string;
  age?: number;
  email?: string;
  mobile?: string;
}

class Editor {
  #state: EditorState;
  #history: StateHistory;

  constructor(state: IEditorState) {
    this.#state = new EditorState(state);
    this.#history = new StateHistory();
  }

  set state(state: IEditorState) {
    this.#history.push(this.#state);
    this.#state = new EditorState(state);
  }

  get state() {
    return this.#state.state;
  }

  undo() {
    if (!this.#history.isEmpty) {
      this.#state = this.#history.pop() as EditorState;
    }
  }
}
```

Let's understand the `class EditorState`.

```ts
class EditorState {
  #state: IEditorState;

  constructor(state: IEditorState) {
    this.#state = state;
  }

  set state(state: IEditorState) {
    this.#state = state;
  }

  get state() {
    return this.#state;
  }
}
```

Let's understand the `class StateHistory`.

```ts
class StateHistory {
  #history: EditorState[];

  constructor() {
    this.#history = [];
  }

  push(state: EditorState) {
    this.#history.push(state);
  }

  get isEmpty() {
    return this.#history.length === 0;
  }

  pop() {
    if (!this.isEmpty) {
      return this.#history.pop();
    }
    return undefined;
  }
}
```

The usage will be simple,

```ts
function mementoPattern() {
  const editor = new Editor({
    name: "",
    mobile: 0,
    email: "",
    mobile: ""
  });
  editor.state = {
    name: "Abhisek Dutta",
    mobile: 876543210,
    email: "",
    mobile: ""
  };
  editor.state = {
    name: "Abhisek Dutta is a programmer",
    mobile: 8765432190,
    email: "abhisek@email.com",
    mobile: ""
  };

  editor.undo();
  editor.undo();

  console.log(editor.state);
}

mementoPattern();
```
