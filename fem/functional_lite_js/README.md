# FEM: Functional-lite JavaScript

## Functional Programming Introduction

### Functional Programming

**Imperative vs. Declarative**

Imperative code is code that focuses on **how** to accomplish a task

Declarative code is when you declare **what** should happen and not how.

The benefit is that it's **easier to write and understand** declarative code. There's no completely imperative or declarative code.

Perception of readability problem:

![fp_readability_problem](/Users/wyattsweet/Desktop/Screen Shot 2017-09-23 at 7.29.09 PM.png)

### Provable and Readable

**Provable**
Functional Programming seeks to use patterns that have already been tested. The ideas of functional programming have been around a long time. Ideas have been vetted by mathmaticians and computer scientists.

Functional programmer strives to say, "Let me try to use mechanisms that are proven". **Code that you do not understand, is code that you can not trust.** Use domain of functional programming to find patterns that have been proven you can use in your code.

**Less To Read**

Not just to help the author, but it is also to help the reader of your code. Helps our brain focus on stuff that really matters, high level business logic stuff. 

Like the mountain climber have to think about how the rope and caribiner works at every step of the way. They can focus on climbing the mountain because they trust their tools.

**The most important thing we can do as programmers is to communicate with other humans.** Focus more on structuring the code so other readers can understand and trust the code better.

Hiding details is called **encapsulation**
**abstraction** is about taking 2 or more things that are tightly wrapped together and seperating them with a semantic boundary so you could understand on thing on it's own without having it wrapped up with the other.

### Pure Functions and Side-Effects

`...args` either `rest/gather` operator or `spread` operator

```js
function foo (x,y,z,w) {
	console.log(x, y, z, w);
}

function bar(x = 2, ...args) {
	return foo(x,42,...args);
}
```

Technically, foo is not a function. Since, `bar` calls `foo` and `foo` is not a function that also means `bar` is not a function. `bar` is called a `procedure` which is just a collection of operations. All functions are procedures but not all procedures are functions.

```js
function foo(x,y) {
	return [x + 1, y - 1];
}

var [a,b] = foo(...[5.10])
```
In this case `foo` is a function. **A function must have a `return` statement.**. It should return a value.

The definition of a function comes from math and the idea of **putting in an input and computing an output**

**side-effect** – When you use a variable in a function that you have access to within the function.

**A function should have a direct input and a direct output.**

Fundamental tenance are not using side-effects and side causes as part of the implementation.

Seems like writing with side effects feels natural, but it's bad according to functional programmers. The reason we don't like side effects (he guesses) are that you can't predict what will happen with the function out of context from all of the lines before it. Forces reader to understand what's happening outside the function to know how the function works. 

Writing side effect code is optimal for writeability, but not optimized for readability.

#### RULE: Avoid side effects if at all possible

Thought experiment: If you truely wrote a program with zero side effects, it would be impossible to prove that program existed. Anything that can be observed, is a side effect. It's not possible to write a program with no side effects.

Code with side effects is much more likely to have bugs. Grouping code into that with side effects and that without drastically increases ability to reason about code. **Make it obvious where the side effects are.** 

Redux is an example where the part with side effects, rendering to the dom happens at the end. Imagine a circle where all side effect free functions are in the middle and those with side effects are on the outside and very easy to spot. Make it obvious where the side effects are.

### Purify Functions

**Pure Functions** - a function without side effects.

The importance is observational, that somebody can observe it behaves as pure. 

### Challenge 1 Solution

New evolved definition of a pure function – **A pure function when given the same input will always give you the same output, no matter where you call it and no matter how many times you call it.
**
### Evolving Understanding of Impurity



```js

const y = 1;

function foo(x) {
	return x + y;
}

foo(1); // 2

```

Actually `foo` is a pure function because it closes around the lexical scope that `y` is in so `y` would always be 1 

**Function purity in a mutable system like JS is not a binary characteristic.** You can't say it is 100% pure because functions can get reassigned.  

### Arguments

unary – a function that takes one parameter

vs 

binary - a function that takes 2 params

nary - a function that take more than 2 functions

Best to stick with unary and binary functions.

vereatic function - Can take any number of arguments

### No Points

point-free style. A point is an argument to a function. You can take code like this 

```js
foo(function(v) {
  return bar(v);	
})

// can become

foo(bar);

```

Any function that take an argument and returns a boolean value is referred to as a predicit function. 

The intent is not to not have points.

## Composing Functions

### intro

create a clear path of data transformation. Composition says take a function output some data and make that the input to another function.

```js
function sum(x,y) {
	return x + y;
}

function multi(x,y) {
	return x * y;
}

function multAndSum(x,y,z) {
	return sum(mult(x,y) z);
}

multAndSum(3,4,5) // 17
```

The above example uses abstraction to seperate the what (declarative) and the how (imperative). Creates a semantic boundary between the two.Create a declarative interface to work with the computation.

There is a concept in functional programming called **pipe**. A function which takes two functions and pipes the output of one into the next one. Same thing we were doing manually on the previous snippet, but now there is a repeatable utility. In essence this a function which makes functions. The official term for this is **higher order function**, a function which takes one or more functions as inputs, and/or makes a function as an output.

```js
function sum(x,y) {
	return x + y;
}

function multi(x,y) {
	return x * y;
}

function pipe(fn1, fn2) {
	return function piped(arg1,arg2,arg3) {
		return fn2(fn1(arg1, rg2), arg3)
	}
}

var multAndSum = pipe(mult, sum);

multAndSum(3,4,5) // 17
```

The pattern could keep on going, higher order functions that make higher order functions.

```js
foo(bar(baz(2)));

compose(foo, bar, baz)(2) // with compose functions will be called from right to left, same as upper function

pipe(baz, bar, foo)(2) // pipe functions are called from left to right
```
These are common terms in many functional programming libraries. Unary functions are easy to compose together. When possible you want your function to be unary. 

*example in `functionComposition.js`*



**My Example 3 solution – `http://jsbin.com/jufoyur/9/edit?js,console`**

**Better solution `http://jsbin.com/jufoyur/5/edit?js,console`**

## Immutability

`const` means the variable itself can't be reassigned. Immutability in functional programming is not concerned with assignment immutability. In functional programming immutability is from the perspective of the value.

```js
const z = [4,5,6]
z[0] = 10; // this is allowed
```

To increase cofidence on value mutation, const keyword isn't really helpful.

You can enforce value immutability by using 

```js
var z = Object.freeze([4,5,6,[7,8,9]])

// makes value read only
z[0] = 10; // not allowed

// doesn't deep freeze
z[3][0] = 10; // allowed
```

When you author a function that can receive a value, you have to make sure you're not mutating other people's values

```js
function doubleThemMutable(list) {
	for (var i=0; i<list.length: i++) {
		list[i] = list[i] * 2;    			
	}
}

var arr = [3,4,5];
doubleTHemMutable(arr);

arr; // [6,8,10]

// double them mutable created a side-effect which mutated the array.
```
You should assume you're not allowed to change a value that's passed in. Creates easier to read, varifiable code.

```js
function doubleThemImmutable(list) {
	var newList = [];
	for (var i=0; i<list.length: i++) {
		neList[i] = list[i] * 2; 
	}
	return newList;
}

var arr = [3,4,5];
doubleThemImmutable(arr);

arr; // [3,4,5]
arr2; // [6,8,10]


```

### Challenge 4

## Closure

### Closure and Side Effects

When Brendan Eich developed js he gave it Closure inspired by the scheme programming language, which is a functional programming language along with a class based system similar to Java or C++. The genius thing about this is that it makes javascript a **multi paradigm language** in which you can have multiple programming paradigms in one application. It allows you to pick which one is correct for any given situation.

Even mainstream language has closure now because it's so powerful. For a functional programmer closure is at the heart of what we do.

**Closure is when a function "remembers" the values around it even when that function is executed elsewhere**. this is based purely on what we can observe. A language which has lexical scope and where functions can be values, it needs to have closures in order for it to make any sense.

**Final definition of function purity**. 

Referential transparency is you can take the function call, replace it with its result and it would have no other impact on the system. 

**A pure function is a function with referential transparency.**

This is not saying you should replace the function with the result but just that you could.

This is mainly to suggest that the reader of your code can compute your function once and doesn't need to compute it again.

The word for adaptive memorization, where function computes result the first time then all following calls just return the value without computing it is memoization.

We use closure to maintain state which can't be observed from the outside world.

## Recursion

### Introduction

Isomorphic - the same behavior represented 2 different ways

benefit of recurssion it moves us in the direction of declarative expression.

The intent is to not think about how it works. Let the engine take care of how it works and let the syntax stay simple.

```js
// recursive sum all the numbers function
function sumRecur(sum, ...nums) {
	// next line is base case
	if (!nums.length) return sum;
	return sum + sumRecur(...nums);
}

sumRecur(3,4,5,6,7,8,9);
```

### Proper Tail Calls

Recurrsion has some limitations. Any time one function calls another function you have to ask what is the current state of things because it needs to be restored. When a function calls another function it creates a **stack frame** in memory which is a piece of memory where data is stored. This is considered a call stack. There is a limited amount of memory that it can handle. Back in the day, languages like lisp had much less memory to deal with, so this was a much bigger problem.

You're never going to run out of call stack space unless you call it thousands of time. Sum function works fine for 10 or 15 times but if somebody gives us one million numbers, we might have a problem.

Solution is to eliminate the amont of memory used or run things with a fixed amount of memory. Arrange it so the stack frame gets reused, so we have to arrange our algorithim so it doesn't have any work to do at the end.

`http://jsbin.com/lubivab/1/edit?js,console` line 5 where `sum` is added to the function call is the "work" that needs to be eliminated.

Engines now have an adaptive limit which is an arbirtary number based on whatever version you're on. The range is somewhere around 20,000.

ES6 implemented something called `PTC - Proper Tail Calls`

**PTC only uses if you have strict mode on**

PTC you need to have the function call as the last thing returned from a function – 

non recurssive version – `http://jsbin.com/lubivab/3/edit?js,console`
sum function above written as PTC – `http://jsbin.com/lubivab/edit?js,console`

You have to pass the `sum +` portion along to the next function call. ptc happens on line 4 and 10.

It creates a lot of boilerplate and every time you call `sumRecur` it recreates the inner function. Another way to create inner scope is to use an `iffy` – `http://jsbin.com/lubivab/5/edit?js,console`

This creates a lot of overhead. Clever but not graceful. It can be simplified way down to – `http://jsbin.com/lubivab/6/edit?js,console`

Only one broser has implemented `ptc`. Safari. Other brosers have said that implementing `ptc` will affect other performance initiatives.

### Continuation Passing Style

Unfortunately reality that PTC is not implemented in all browsers.

### Trampolines

An adapter you can put on a function to "trampoline" a function. If you are done calling the function you would return the result but if you are not done you would return a continuation function.

It calls the function and if it gets a function back it calls it again. This isn't a call stack but rather it's calling one function at a time. This is a technique for getting around limitations where PTC isn't available.

## Data Structures


