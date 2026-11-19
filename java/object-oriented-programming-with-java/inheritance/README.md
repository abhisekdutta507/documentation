
UIControl.java

```java
package com.javalms;

public class UIControl {
    private boolean isEnabled = true;

    public void enable() {
        isEnabled = true;
    }

    public void disable() {
        isEnabled = false;
    }

    public boolean isEnabled() {
        return isEnabled;
    }
}
```

TextBox.java

```java
package com.javalms;

public class TextBox extends UIControl {
    private String text;

    TextBox() {
        text = "";
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void clear() {
        text = "";
    }

    @Override
    public String toString() {
        return text;
    }
}
```

Main.java

```java
package com.javalms;

public class Main {
    public static void main(String[] args) {
        var textBox = new TextBox();
        textBox.setText("Abhisek");
        show(textBox);

        var uiControl = new UIControl();
        show(uiControl);
    }

    public static void show(UIControl control) {
        System.out.println(control.toString());
    }
}
```

Output

```sh
Abhisek
com.javalms.UIControl@27d6c5e0
```

Important Notes
- Both the classes have the method `toString` in common. The code works fine.

But when we call the `setText` inside `show` method like below,

```java
package com.javalms;

public class Main {
    public static void main(String[] args) {
        var textBox = new TextBox();
        show(textBox);

        var uiControl = new UIControl();
        show(uiControl);
    }

    public static void show(UIControl control) {
        control.setText("Abhisek");
        System.out.println(control.toString());
    }
}
```

We will get compilation error. To, avoid the compilation error we can typecast the object but that will cause runtime error.

```java
package com.javalms;

public class Main {
    public static void main(String[] args) {
        var textBox = new TextBox();
        show(textBox);

        var uiControl = new UIControl();
        show(uiControl);
    }

    public static void show(UIControl control) {
        var uiControl = (TextBox) control;
        uiControl.setText("Abhisek");
        System.out.println(control.toString());
    }
}
```

Output

```sh
Abhisek
Exception in thread "main" java.lang.ClassCastException: class com.javalms.UIControl cannot be cast to class com.javalms.TextBox (com.javalms.UIControl and com.javalms.TextBox are in unnamed module of loader 'app')
	at com.javalms.Main.show(Main.java:13)
	at com.javalms.Main.main(Main.java:9)
```

We see the value of the `textBox` is printed on console. But, the `uiControl` instance does not have the method `setText`. That causes the failure.

To avoid this error we can add a conditional check point,

```java
package com.javalms;

public class Main {
    public static void main(String[] args) {
        var textBox = new TextBox();
        show(textBox);

        var uiControl = new UIControl();
        show(uiControl);
    }

    public static void show(UIControl control) {
        if (control instanceof TextBox) {
            var uiControl = (TextBox) control;
            uiControl.setText("Abhisek");
        }
        System.out.println(control.toString());
    }
}
```
