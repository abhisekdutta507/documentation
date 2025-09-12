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

In Memento Pattern we breakdown the `class Editor` into `class EditorState` & `class EditStateStack`.

```ts
interface IEditorState {
  name: string;
  mobile: number;
  email: string;
}

class Editor {
  #state: EditorState;
  #stack: EditStateStack;

  constructor(state: EditorState) {
    this.#state = state;
    this.#stack = new EditStateStack();
  }

  set state(state: EditorState) {
    this.#stack.push(this.#state);
    this.#state = state;
  }

  get state(): IEditorState {
    return {
      name: this.#state.name,
      mobile: this.#state.mobile,
      email: this.#state.email,
    };
  }

  undo() {
    if (!this.#stack.isEmpty) 
      this.#state = this.#stack.pop() as EditorState;
  }
}

class EditorState {
  #name: string;
  #mobile: number;
  #email: string;

  constructor(state: IEditorState) {
    this.#name = state.name;
    this.#mobile = state.mobile;
    this.#email = state.email;
  }

  get name() {
    return this.#name;
  }

  set name(name: string) {
    this.#name = name;
  }

  get mobile() {
    return this.#mobile;
  }

  set mobile(mobile: number) {
    this.#mobile = mobile;
  }

  get email() {
    return this.#email;
  }

  set email(email: string) {
    this.#email = email;
  }
}

class EditStateStack {
  #stack: EditorState[] = [];

  push(state: EditorState) {
    this.#stack.push(state);
  }

  pop() {
    return this.#stack.pop();
  }

  get isEmpty(): boolean {
    return this.#stack.length === 0;
  }
}
```

The usage will be simple,

```ts
function mementoPattern() {
  const editor = new Editor(new EditorState({
    name: "",
    mobile: 0,
    email: ""
  }));
  editor.state = new EditorState({
    name: "Abhisek Dutta",
    mobile: 876543210,
    email: ""
  });
  editor.state = new EditorState({
    name: "Abhisek Dutta is a programmer",
    mobile: 8765432190,
    email: "abhisek@email.com"
  });

  editor.undo();
  editor.undo();

  console.log(editor.state);
}

mementoPattern();
```
