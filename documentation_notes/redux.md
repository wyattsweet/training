# Redux

Redux stores the state of your app in a object tree inside a single store. To change the state tree you emit an action, which is an object describing what happened. You write a pure reducer to describe how the action transforms the state tree.

## Intrduction

### Motivation

Requirements for single page JavaScript apps has become increasingly complex and our code must manage more state than ever before.
The complexity of front-end development is difficult to handle because we're mixing two concepts that are hard for the human mind to handle, mutation and asynchronicity. Both of these things can be great in seperation, but together you get a mess.
Redux attempts to make state mutations predictable, by imposing restrictions on how and when updates can happen.

### Core Concepts

The idea is you have a single state object in your app and you create a specific pattern that needs to be followed to mutate the state. This keeps the state object from getting arbitrarily changed throughout your app, which causes hard to reproduce bugs.

To change the state you need to dispatch an action, which looks something like this

```js
{ type: 'ADD_TODO', text: 'some todo text' }
{ type: 'TOGGLE_TODO', index: 1 }
```

To tie actions and state together, we write a function called a reducer. It's just a function which takes state and action as arguments, and returns the next state of the app. We write small functions to managing different parts of the state.

```js
function visibilityFilter(state = 'SHOW_ALL', action) {
  // a reducer which controls the visibility of the list
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {...state, text: action.text}
    case 'TOGGLE_TODO':
      return state.map((todo, index) =>
        action.index === index
          ? { text: todo.text, complete: !todo.complete }
          : todo
      )
    default:
      return state
  }
}
```

Then you can write another reducer that calls those two reducers for each property on the state tree

```js
function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}
```
The above is such a common pattern that it can be replaced by using the `combineReducers` function from redux

```js
inport { combineReducers, store } from 'redux'
const reducer = combineReducers({ visibilityFilter, todos })
const store = createStore(reducer)
```

### Three Principles

1. Single source of truth - The state of your whole app is stored in an object tree within a single store.
- State is read-only - The only way to change the state is to emit an action describing what happened.
- Changes are made with pure functions - To specify how the state tree is transformed by actions, you write pure reducers. Reducers are pure functions which take the previous state and an action, and they return the next state. Pure functions are functions which return a value that's determined by the input values, and it doesn't produce side effects.

### Prior Art

Redux pulls concepts from the following patterns and technologies

#### Flux

Both prescribe that you concentrate your model update logic in a certain layer of your application (stores in flux, reducers in Redux).
Redux does not have the concept of a dispatcher. Unlike Flux, Redux assumes you never mutate your data (see the second principle).

#### Elm

Elm is a functional programming language inspired by Haskell. It enforce a "model view update" architecture. Elm updaters serve the same purpose as reducers in Redux.

#### Immutable

Immutable is a JavaScript library implementing persistent data structures. Selectors are composable getter functions.

#### RxJS

RxJS is a superb way of managing the complexity of asynchronous apps.

### Learning Resourcees

https://redux.js.org/introduction/learning-resources 
