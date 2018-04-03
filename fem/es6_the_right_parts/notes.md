# ES6: The Right Parts
Kyle Simpson
Frontend Masters

## The Arrow Function

**Arrow Function Variations**

```js
() => 3

x => 3
```
Gather Operator requires parenthesis
`(...x) => 3`

multiple parameters have to be surronded by parens.
`(x,y) => 3`

expressions don't use curly braces but statements, such as a conditional do have to have curly braces.
statements (with curly braces) you must explicitly write return.

`x => { try { 3; } catch(e) {} }`
`x => { return 3; }`

to return an object you put perns around the body to return an object

`x => ({y: x})`

---

Arrow functions are anonymous. Can't give it a name which causes errors when

Your function needs to make a self reference to itself. Such as recursion or an event handler that needs to unbind itself.

Anonymous functions won't have a name in stack traces when debugging.

Anonymous function expression assigned to the variable foo.
`var foo = x => 3;`
This is called name inferencing but most of the time you wont use functions this way.

** Promises **

`p.then( v => v.id )` is nice but your arrow function is still anonymous. 
`p.then( function extractId(v) { return v.id } )` is nice because it gives the function a name.

This goes for `.map` calls and `.then`

One spot where the arrow function shines:

```js
var obj = {

  id: 42,
  foo: function foo() {
    setTimeout(function() {
      console.log( this.id );
    },100);
  }
}

obj.foo(); // undefined
```

Above returns undefined because this is inside of the function. Often solved in the following way.

```js
var obj = {

  id: 42,
  foo: function foo() {
    setTimeout(function() {
      console.log( this.id );
    }.bind(this) 
    ,100);
  }
}

obj.foo(); // 42
```

The arrow function doesn't have a this keyword and will lexically go up in scope.

```js
var obj = {

  id: 42,
  foo: function foo() {
    setTimeout(() => {
      console.log( this.id );
    },100);
  }
}

obj.foo(); // 42
```

or without curly braces

```js
var obj = {

  id: 42,
  foo: function foo() {
    setTimeout(() =>
      console.log( this.id )
    ,100);
  }
}

obj.foo(); // 42
```

## Block Scope

** Let vs. Var **

```js
function foo(x, y) {
  if (x > y) {
    var tmp = x;
    x = y;
    y = temp;
  }
}
```

var tmp gets hoisted and attached to the foo function scope, but stylistically declaring var inside the if says this variable belongs to the if block.

```js
function foo(x,y) {
  for (var i=0; i<10; i++) {
    // some loop stuff
  }
}
```

var i above is attached to the foo function scope but by including it in the for loop you're saying this variable belongs to this for loop block. Don't use it elsewhere even though you can.

Now `let` will enforce what we already stylistically signaled.

`var` keyword (despite other opinions) is still valuable. It says I intend to use this variable across the entire function, the let keyword doesn't signal that.

** const **
const also block scoping declarator. 
A constant is a variable that can't be reassigned. It's about assignment not the value.
Does open up the possibility for confusion.

## Default Values and the gather/spread operator

** Default Values **
Old way of doing default values
http://jsbin.com/retukog/13/edit?js,console

Imperative approach
http://jsbin.com/retukog/16/edit?js,console

Now in ES6
http://jsbin.com/cohiqiv/3/edit?js,console
declarative default values

In this case `foo()` hasn't been called at all

```js
function bar() {
  
}

function foo(x = bar()) {
  console.log(x);
}
```
Doesn't call it until you explicitly call it with `foo()`

Can assign parameters to parameters as long as they come later in the list

```js
function required(paramName) {
   throw "parameter '" + paramName + "' required!";
}

function foo(x = required('id'), id = required("id")) {
  console.log(id);
}

foo();
```

Other odd scenarios
http://jsbin.com/cohiqiv/14/edit?js,console

## Gather and Spread Operators
Prior if you wanted to gather all arguments into an array you would have to do something like this 

```js
function foo() {
  var args = [].slice.call(aruments).unshift(42);
  args.unshift(42);
  
  // call function bar
  bar.apply(null, args)
}
```
Gather operator lets you gather up all arguments passed to the function into a real array. Also refered to as the rest operator.

```js
function foo(...args) {
  args.unshift(42);

  // spread array out as argument values
  bar(...args);
}
```
when a `...` operator is used in a assignment context it gathers. When not used in a assignment context but a value list context it spreads.

imperative includes all of the implementation details of how, but not they're not the things the programmer needs to think about.

Another good place to use this is array concatination

```js
var x = [1,2,3];
var y = [4,5];
var z = [0, ...x, ...y, 6];
```

`...` operative spreads out anything that has an iterator (iterable)

strings are also iterable

## Destructuring

basic example of destructuring

```js
function foo() {
  return [1,2,3]
}

var arr = foo();

var a = arr[0];
var b = arr[1];
var c = arr[2];
```
Destructuring is an assignment opperation. Above is the **imperative** version.

Array destrucuring in ES6;

```js
function foo() {
  return [1,2,3]
}

var [a,b,c] = foo();
```

which is a declaration of a pattern for assignment, telling JS this is the end result we are looking for.

Also accepts default values

```js
const foo = () => {
  return [1,2,]
}

let [a,
     b = 43,
     c = 123] = foo();

console.log(c); // 123
```

Can gather up any remaining values into an array

```js
const foo = () => {
  return [1,2,3,4,5,6,7,8,9]
}

let [a,
     b = 43,
     c = 123,
     ...args
    ] = foo();

console.log(args);
```

## Template Strings

**Concise properties and methods**

```js
var a = 1;

var obj = {
  a
}
```

To assign a to a in the object can just do the above now.

Concise methods, rather than saying

```
var b = {
a: function() {  }
}

```

You can do 

```js
var b = {
  a() {  }
  // expands out to
  //a: () => {  }
}
```

computed property names, before you had to do the following

```js
var c = "hello";

var obj = {
  a,
  b() {  },
}

// to make c as a property outside the object you have to do
obj[c] = "world";

```

Now there is computed property names so you can do

```js

var c = 'hello';

var obj = {
  a,
  b() {  },
  [c]: 'world'
}
```

They can also be used for methods

```js
var obj = {
  [c + 'fn']() { ... }
}
```

## Symbols, Iterators & Generators

### Symbols
No pre ES6 equivalent. New (7th) primitive data type in JS.

```js

var x = Symbol();

```

Most cloely associated with a string but not a string.

**Symbol is a unique global un-guessable value within the context of your program.**

Use it as a symbolic placeholder for above description.

```js

var x = Symbol("Some description");

```

```js

var x = Symbol("This is cool");
var y = Symbol("This is cool");

console.log(x) // => Symbol("This is cool")
console.log(y) // => Symbol("This is cool")

x === y; // => false

```

These are supposed to be used as the property name for an object

```js
var x = Symbol();

var obj = {
	id: 42
}

obj[x] = "shhhh this is secret!";

```

Created a gobally unique property name on `obj`

```js
// in console

obj // => Object {id: 42, Symbol(): "shhhh this is secret!"}
Object.keys(obj) // => ["id"]
Object.getOwnPropertyNames(obj) // => ["id"]
Object.getOwnPropertySymbol(obj) // => Symbol(): "shhhh this is secret!"}

```

It doesn't create a "hidden" property it just "puts it in a different bucket". Now there's regular properties and symbol properties.

Similar to the convention of a `__something` property, `__` symbolizing secret and don't touch it.

### Well Known Symbols

**These are properties on the Symbol function object**

```js
Symbol.iterator
Symbol.toStringTag
Symbol.toPrimitive
Symbol.isConcatSpreadable
```

### Generators

```js
function *main() {

}

var it = main();
```
Doesn't call function but creates an iterator.


You can use `yield` keyword inside of generators to pause

```js
function *main() {
	console.log('hello);
	yield;
	console.log('world');
	return 10;
}

var it = main();

it.next() // { value: undefined, done: false }
it.next() // { value: 10, done: true }

```

pass in value at `yield`

```js
function *main() {
	console.log('hello);
	yield 9;
	console.log('world');
	return 10;
}

var it = main();

it.next() // { value: 9, done: false }
it.next() // { value: 10, done: true }

```

Essentially generators are a state machine. 


###Ranges

I trick for creating ranges in JS

```js
Number.prototype[Symbol.iterator] = function*(){
	for (var i=0; i<=this; i++) {
		yield i;
	}
};

[...8] // [0, 1, 2, 3, 4, 5, 6, 7, 8]
```

