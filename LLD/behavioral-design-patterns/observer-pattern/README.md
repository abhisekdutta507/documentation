# Observer Pattern

A classical example on `inheritance` & `polymorphism`.

## Problem

We have a `class DataSource`. Whenever we set a value to a `DataSource` instance we have to update the `class SpreadSheet` & `class Chart`.

```ts
class SpreadSheet {

}

class Chart {
  
}

class DataSource {
  #value: number;

  constructor() {
    this.#value = 0;
  }

  set value(value: number) {
    this.#value = value;
    // update spread sheet
    // update chart
  }

  get value() {
    return this.#value;
  }
}
```

## Solution

We can have a member function `update(value: number): void;` in both `class SpreadSheet` & `class Chart`. And we can call the function from outside.

### Push Style Solution

In push style when we call `update(value: number): void;` we pass the value to the update function.

```ts
interface Observer {
  update(value: number): void;
}

class SpreadSheet implements Observer {
  update(value: number): void {
    console.log("spreadsheet is notified with", { value });
  }
}

class Chart implements Observer {
  update(value: number): void {
    console.log("chart is notified with", { value });
  }
}

class Subject {
  #observers = new Set<Observer>();

  addObserver(observer: Observer) {
    this.#observers.add(observer);
  }

  removeObserver(observer: Observer) {
    this.#observers.delete(observer);
  }

  protected notifyObservers(value: number) {
    this.#observers.forEach((observer: Observer) => {
      observer.update(value);
    });
  }
}

class DataSource extends Subject {
  #value: number = 0;

  set value(value: number) {
    this.#value = value;
    this.notifyObservers(value);
  }

  get value() {
    return this.#value;
  }
}
```

The usage will be like this,

```ts
function observer() {
  const dS = new DataSource();
  const sheet1 = new SpreadSheet();
  const sheet2 = new SpreadSheet();
  const chart1 = new Chart();
  const chart2 = new Chart();

  dS.addObserver(sheet1);
  dS.addObserver(sheet2);
  dS.addObserver(chart1);
  dS.addObserver(chart2);

  dS.value = 1;
  dS.value = 2;
}

observer();
```

Output will be,

```shell
spreadsheet is notified with { value: 1 }
spreadsheet is notified with { value: 1 }
chart is notified with { value: 1 }
chart is notified with { value: 1 }
spreadsheet is notified with { value: 2 }
spreadsheet is notified with { value: 2 }
chart is notified with { value: 2 }
chart is notified with { value: 2 }
```

### Pull Style

In pull style `update(): void;` function does not need any argument. Instead we would pass the `DataSource` instance to `Concrete Observer`.

```ts
function observer() {
  const dS = new DataSource();
  const sheet1 = new SpreadSheet(dS);
  const sheet2 = new SpreadSheet(dS);
  const chart1 = new Chart(dS);
  const chart2 = new Chart(dS);

  dS.addObserver(sheet1);
  dS.addObserver(sheet2);
  dS.addObserver(chart1);
  dS.addObserver(chart2);

  dS.value = 1;
  dS.value = 2;
}

observer();
```

The changes we have to make in the `Observer` level to support the same,

```ts
interface Observer {
  update(): void;
}

class SpreadSheet implements Observer {
  #dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.#dataSource = dataSource;
  }

  update(): void {
    console.log('spreadsheet is notified with', { value: this.#dataSource.value });
  }
}

class Chart implements Observer {
  #dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.#dataSource = dataSource;
  }

  update(): void {
    console.log('chart is notified with', { value: this.#dataSource.value });
  }
}
```

Changes is `Subject` level,

```ts
class Subject {
  #observers = new Set<Observer>();

  addObserver(observer: Observer) {
    this.#observers.add(observer);
  }

  removeObserver(observer: Observer) {
    this.#observers.delete(observer);
  }

  protected notifyObserver() {
    this.#observers.forEach((observer: Observer) => {
      observer.update();
    });
  }
}

class DataSource extends Subject {
  #value: number = 0;

  set value(value: number) {
    this.#value = value;
    this.notifyObserver();
  }

  get value() {
    return this.#value;
  }
}
```
