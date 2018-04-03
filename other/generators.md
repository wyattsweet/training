JavaScript Generators

JavaScript Generators are a new as of ES6 JavaScript feature which lets you define a special type of function whos execution can be paused.

**Infinite Iterator Example**

```js
// generators are defined with the * symbol
// Can also be written as a function expression
// const idMaker = function*() ...
function* idMaker() {
  let index = 1
  while(true) {
    // yield pauses the execution and returns
    // the value to the right of it, in this case index++
    yield index++
  }
}

const gen = idMaker()

console.log(gen.next().value) // { done: false, value: 1 }
console.log(gen.next().value) // { done: false, value: 2 }
```

You can also pass in values back to the generator and set them to variable

```js
const foo = function*() {
  let bar = yield 2 // bar gets set to 3 on the returning call
  console.log(bar) // 3
}

const gen = foo()
console.log(gen.next().value) // 2
gen.next(3)
```


