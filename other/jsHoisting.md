# Hoisting

```js
var text = 'outside'
function logIt() {
  console.log(text)
  var text = 'inside'
}
logIt() // => undefined
```
`logIt` return undefined because variable declarations are hoisted but **variable assignments are not**

*How does this change with `let` and `const`?*

Hoisting can cause unexpected behavior, a good way to keep things clear is to always declare your variables at the top of the scope.
