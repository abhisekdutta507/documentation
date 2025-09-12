# State Pattern

Example of `Polymorphism` in Object-oriented programming. With the help of State Pattern we can get rid of nested if else conditions & switch cases.

## Problem

```ts
enum ToolType {
  SELECTION,
  BRUSH,
  PENCIL,
}

class TemporaryCanvas {
  #tool: ToolType;

  constructor() {
    this.#tool = ToolType.PENCIL;
  }

  set tool(tool: ToolType) {
    this.#tool = tool;
  }

  mouseUp() {
    console.log("Mouse click is left!");
  }

  mouseDown() {
    switch (this.#tool) {
      case ToolType.PENCIL: {
        console.log("Marking using pencil");
        break;
      }

      case ToolType.BRUSH: {
        console.log("Painting using brush");
        break;
      }

      case ToolType.SELECTION: {
        console.log("Selecting using selection tool");
        break;
      }

      default: {
        break;
      }
    }
  }
}
```

## Solution

```ts
interface Tool {
  draw(): void;
}

class PencilTool implements Tool {
  draw() {
    console.log("Marking using pencil");
  }
}

class BrushTool implements Tool {
  draw() {
    console.log("Painting using brush");
  }
}

class SelectionTool implements Tool {
  draw() {
    console.log("Selecting using selection tool");
  }
}

class TemporaryCanvas {
  #tool: Tool;

  constructor() {
    this.#tool = new PencilTool();
  }

  set tool(tool: Tool) {
    this.#tool = tool;
  }

  mouseUp() {
    console.log("Mouse click is left!");
  }

  mouseDown() {
    this.#tool.draw();
  }
}
```

To execute the snippet,

```ts
const canvas = new Canvas();
canvas.mouseDown();
canvas.mouseUp();

canvas.tool = new BrushTool();
canvas.mouseDown();
canvas.mouseUp();

canvas.tool = new SelectionTool();
canvas.mouseDown();
canvas.mouseUp();
```
