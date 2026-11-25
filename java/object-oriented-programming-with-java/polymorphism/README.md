
# 🎭 Polymorphism in Java

Polymorphism lets different classes be used through the same parent type. When an overridden method is called, Java runs the version for the object's actual class.

## Example: One Parent Type, Different Results

Main.java

```java
package com.javalms;

public class Main {
    public static void main(String[] args) {
        UIControl[] controls = { new TextBox(), new CheckBox() };
        for (var control : controls) {
            control.render();
        }
    }
}
```

Output

```sh
Render TextBox!
Render CheckBox!
```

UIControl.java

```java
package com.javalms;

public abstract class UIControl {
    public abstract void render();
}
```

TextBox.java

```java
package com.javalms;

public class TextBox extends UIControl {
    @Override
    public void render() {
        System.out.println("Render TextBox!");
    }
}
```

CheckBox.java

```java
package com.javalms;

public class CheckBox extends UIControl {
    @Override
    public void render() {
        System.out.println("Render CheckBox!");
    }
}
```
