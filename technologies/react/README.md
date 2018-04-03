# REACT

Notes from [the docs](https://reactjs.org/docs)

## Quick Start

### [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)

JSX produces React "elements".
Instead of artificially separating technologies using different files. React pushes you to separate concerns into **components**.

It is safe to embed user input in JSX

```jsx
const title = response.potentiallyMaliciousInput;
const el = <h1>{title}</h1>; // this is safe!
```

Babel compiles JSX down to `React.createElement()` calls.

This - 

```jsx
const el = (
  <h1 className="greeting">
    Hello world
  </h1>
)
```
becomes this -

```js
const el = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello world'
)
```

`React.createElement` returns something similar to this -

```jsx
const el = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello world'
  }
}
```
These objects are called **React elements**.

### [Rendering Elements](https://reactjs.org/docs/rendering-elements.html)

Elements are the smallest building blocks of React apps.
`<h1>Hello world</h1>` <~ this is an element
Elements are what components are made up of.
Elements are immutable, once you create one it can not be changed. It represents the UI at a certain point in time.

#### React Only Updates What's Necessary

React DOM compares the elements and its children to the previous version of the DOM. React DOM only applies the DOM updates necessary make the DOM current.

Thinging about how the UI should look at any given moment rather than how to change it over time will remove a lot of bugs in your codebase.

### [Components and Props](https://reactjs.org/docs/components-and-props.html)

### [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

A guide for thinking about apps as you build them with React.

**Step 1: Break The UI Into A Component Hierarchy**

draw boxes around every component and subcomponent in your mock and give them all names. One technique that could be employed is the **single responsibility principle** which means every component should have one responsibility or do one thing. If it ends up growing, it should be decomposed into smaller components.

Create a component hierarchy. Components that appear within another component, should have a child parent relationship. Example from the docs:

* FilterableProductTable
    * SearchBar
    * ProductTable
        * ProductCategoryRow
        * ProductRow

**Step 2: Build a static version in React**

Once you have your component hierarchy, build a static version that takes your data model and renders the UI, but doesn't have any interactivity.
It's best to decouple these processes because building a static version takes a lot of typing and not a lot of thinking and adding interactivity takes requires a lot of thinking and not a lot of typing.

**Don't use state at all to build this static version.** State is reserved only for interactivity.
You can build top-down or bottom-up. In simple examples, it tends to be easier to go top-down whereas in larger projects it's easier to go bottom up and write tests as you go.

The components will only have `render` methods since this is a static version of the app.

**Step 3: Identify the minimal (but complete) Representation of UI State.**
To make your UI interactive, you need to trigger changes to your underlying data model.

Go through each piece of data and decide if it's state or just a boring old prop. Ask these three questions:

1. Is it passed in from a parent via props? If so, it probably isn't state.
2. Does it remain unchanged over time? Probably not state.
3. Can it be computed based on other state or props, such as a list length? Probably not state.

If a piece of data change over time and can't be computed from anything, then congratulations, you have found a piece of state.

**Step 4: Identify where your state should live**

Now that we have the minimal set of app state, Identify which component mutates, or owns, this state.

Some steps to help decide where the state should live.

- Identify every component which renders something based on that state.
- Find the common parent, a component above all the others that the state in the component hierarchy. 
- The common owner or another higher up in the state hierarchy should own the state.
- Finally, if you can't find a resonable component to hold the state, then create a new one.

**Step 5: Add Inverse Data Flow**

Pass callback functions from the parent component managing the state to the child components where state is changed. Then use `onChange`, `onSubmit`, etc to call the callback when a change happens.


That's it! It's good to remember that code is read far more than it's written and this modular, explicit style makes that extremely easy.

## Advanced Guides

### Refs and the DOM

Typically parent components interact with their children through props.
Refs are a way to imperatively modify a child outside of the normal dataflow.

A few good use cases are –
- managing focus, text selection, or media playback.
- triggering imperative animations.
- integrating with 3rd party DOM libraries.

Avoid using refs for anything that can be done declaratively. Don't overuse refs or use it to "make things happen" in your app. Often times state should be managed at a higher level in the component hierarchy.

React supports a special attribute that can be added to **any** component.
`ref` takes a callback function which will be executed immediately after the component is mounted or unmounted.
The `ref` callback receives the underlying DOM element as its argument.

This code stores a reference to a DOM node:

```js
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.textInput.focus();
  }

  render() {
    return (
      <div>
        <input
          type="text"
          ref={input => this.textInput = input}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>  
    )
  }
}
```

`ref` callbacks are invoked before `componentDidMount` and `componentDidUpdate`.

Using the `ref` callback just to set a property on the class is a common pattern for accessing DOM elements.

#### Adding a ref to a class component

When the `ref` attribute is used on a custom component declared as a class, the `ref` callback receives the mounted instance of the component as its arguments.

If we wanted to wrap `CustomTextInput` from above and simulate a click on load in the parent. It would look like the following –

```js
class AutoFocusTextInput extends React.Component {
  componentDidMount() {
    this.textInput.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput
        ref={input => this.textInput = input} />
    )
  }
}
```

The above only works for class components. You can't use the ref attribute on functional components because they don't have instances. You can use the ref attribute inside a functional component as long as you reference a DOM element of a class component.

You can expose the DOM node within a child component to the parent component by passing down a ref callback function.

```js
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>   
  )
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}  
      />
    )
  }
}
```

`this.inputElement` in the parent gets set to the input element within the child.

If for some reason, you don't have control over the child component implementation, your last resort is to use `findDOMNode()`, but it is discouraged.
