### What is event.stopPropagation()?

In JavaScript, `event.stopPropagation()` is a method used to break the chain/propagation of an event beyond the current target. This means it stops the event from bubbling up to parent elements or from capturing down to child elements.

#### Example

Consider the following HTML structure:

```html
<div id="parent">
  <button id="child">Click me</button>
</div>
```

And the following JavaScript:

```js
document.getElementById('parent').addEventListener('click', function(event) {
  alert('Parent clicked!');
});

document.getElementById('child').addEventListener('click', function(event) {
  alert('Child clicked!');
  event.stopPropagation(); // Prevents the event from reaching the parent
});
```

In this example:

1.	Clicking the button with the ID `child` will trigger the click event handler for the child element first.
1.	Because event.stopPropagation() is called inside the child’s event handler, the event will not bubble up to the parent element.
1.	As a result, the click event handler for the parent element will not be executed when the child element is clicked.

Without event.stopPropagation(), clicking the child element would also trigger the parent’s event handler due to event bubbling.
