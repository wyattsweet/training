# Getting Started With Redux - egghead.io

[Repo with a commit for each section](https://github.com/wyattsweet/redux_todo)

## Notes

### Redux: The Single Immutable State Tree

You are going to represent the entire state of your app in a JS object.

**First Principle**
Everything that changes within your app is contained within a single object called the state or the state tree.

### Describing State Changes with Actions

**Second Principle**
The state tree is read only. The only way to change the state is to dispatch an action. An action is a JS object describing what changed in the application.

If you want to change the state you need to dispatch an action. An action is a plain JS object describing the change.
Minimal representation of the action.

Required to have a type property. Usually a string describing the action.
When adding a todo in a todo app example. All the component needs to know is the action, "ADD_TODO" or remove todo component passes action "REMOVE_TODO" and the id of the todo.

### Pure and Impure Functions

**Pure functions** Functions whos return value depend solely on the value of their arguments. No observaable side effects (ajax calls, etc). Pure functions do not modify the values passed to them.

Pure function examples
```
function square(x) {
  return x * x;
}

function squareAll(items) {
  return items.map(square);
}
```

impure functions may call the database or the network, modify data, and override values you pass to them. Some functions in redux have to be pure and you need to be mindful of it.

### The Reducer Function

View layer best described as pure function of the view state.
In redux state mutations in app need to be described as pure functions taking the previous state and the actions being dispatched, then returns the next state of your application.

** Third Principle **
To describe state mutations you have to write a function that takes the previous state of the app, the action being dispatched and returns the next state of the app. This function is called the reducer and has to be pure.

add these after the reducer function section

### Writing a counter reducer with tests

If redux receives undefined it will return the initial state of the application

### Redux store method: getState(), dispatch(), and subscribe() - http://jsbin.com/mokifey/5/edit?js,output

The store binds the 3 principles of Redux -
It holds the application state object
It lets you dispatch actions
when you create it you need to create the reducer which says how state is updated with actions

Store has 3 important methods

store.getState() returns the current state

store.dispatch() let's you dispatch actions to change the state of your application

store.subscribe() let's you register a callback that the redux store will call any time an action has been dispatched

### Implement Store from scratch
http://jsbin.com/mokifey/23/edit?js,output

### Redux: React Counter Examplle
http://jsbin.com/hiyaqay/48/edit?js,output

### Redux: Avoiding Array Mutations with concat(), slice(), and ...spread
http://jsbin.com/mituvo/29/edit?js,console,output

### Avoiding Object Mutations with Object.assign() and ...spread
http://jsbin.com/tavuvi/7/edit?js,console

Object.assign to create immutable objects. Lets you assign properties of several objects onto the target object
http://jsbin.com/tavuvi/10/edit?js,console

### Writing a Todo List Reducer
http://jsbin.com/bojohod/11/edit?js,console

### Writing a Todo List Reducer (Toggling a Todo)
http://jsbin.com/bojohod/22/edit?js,console

### Reducer Composition with Arrays
Reducer composition is abstracting away reducer logic into other reducers and allowing reducers to call each other.
http://jsbin.com/bojohod/38/edit?js,console

## Reducer Composition with Objects

 to store the information above you don't need to change
 the existing reducers. Instead, create a new reducer which calls the exising reducers using the reducer composition pattern.

 ```
const todoApp = (state = {}, action) => {
  return {
    todos: todos(
      state.todos,
      action
    ),
    visibilityFilter: visibilityFilter(
      state.visibilityFilter,
      action
    )
  }
}
 ```

http://jsbin.com/bojohod/69/edit?js,console

## Composition with combineReducers()
http://jsbin.com/bojohod/78/edit?js,console

The above pattern is so common that it's present in most Redux applications. So redux
provides a combineReducers method.

```
const { combineReducers } = Redux;
const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
})

```
The above object fields are related to the state objects that will be called
`state.todos` line 103 above and `state.visibilityFilter` line 107 above

The values correspond to the reducer that get called. Results will get combined into one function.
ES6 object literal shorthand notation lets you write the above like so

```
const todoApp = combineReducers({
  todos,
  visibilityFilter
})

```
 
## Writing combineReducers from scratch
http://jsbin.com/datehozeva/3/edit?js,console

## React Todo List Example
http://jsbin.com/bojohod/100/edit?js,output asdfasdf

## React Todo List Example (Toggling a Todo)
http://jsbin.com/bojohod/106/edit?js,output

## Todo List Example (Filtering Todos)
http://jsbin.com/bojohod/131/edit?js,output

## Extracting Presentational Components(Todo, Todolist)
http://jsbin.com/bojohod/143/edit?js,output

## Extracting Presentational Components (AddTodo, Footer, FilterLink)
http://jsbin.com/bojohod/175/edit?js,output

# Extracting Container Components (FilterLink)
http://jsbin.com/bojohod/185/edit?js,output

# Extracting Container Components (VisibleTodoList, AddTodo)
http://jsbin.com/bojohod/204/edit?js,output

# Passing the store down explicitly via Props
Removed top level store variable from project which does not scale to real world applications. Insead passed store down as a prop.
 
http://jsbin.com/bojohod/208/edit?js,output

# Passing the store down implicitly via context
Used React's global context to pass the store directly to components rather than needing to explicitly pass it down as props
http://jsbin.com/bojohod/229/edit?js,output

# Passing the Store Down with `<Provider>` from React Redux
the react-redux library provides you with `Provider` so you don't have to write it from scratch. Added it to app and removed provider class.
http://jsbin.com/bojohod/234/edit?js,output

# Generating containers with connect() from react-redux (visibleTodoList)
Automatically generated the container component using connect from react-redux
http://jsbin.com/bojohod/243/edit?js,output

# Generating containers with connect() from react-redux (AddTodo)
http://jsbin.com/bojohod/248/edit?js,output

# Generating containers with connect() from react-redux (FilterLink)
http://jsbin.com/bojohod/259/edit?js,output

# Extracting Action Creators
http://jsbin.com/bojohod/268/edit?js,output

