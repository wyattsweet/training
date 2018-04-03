# TypeScript

## Basics

Type annotations can be added to function arguments.

```js
// greeter.ts

function greeter(person: string) {
  return `Hello ${person}`
}

let user = "Jane"

geeter(user)
```

This file can be compiled to `greeter.js` by running `tsc greeter.ts` after installing typescript globally or installed locally and run via an npm script.

```js
function greeter(person) {
    return "Hello, " + person;
}
var user = 'Janet';
document.body.innerHTML = greeter(user);
```
One thing to note is it also converted my es6 to es5.

It will throw an error when compiling if you try to pass anything other than a string to person

```js
// greeter.ts

function greeter(person: string) {
  return `Hello ${person}`
}

let user = ["Jane"]

geeter(user)
```

Also, if you call it with 0 arguments TypeScript will tell you that you called this function with a unexpected number of arguments. The code will still compile, but it will throw warnings.

### Interfaces

You can use a interface to describe objects

```js
interface Person {
  firstName: string
  lastName: string
}

function greeter(person: Person) {
  return `Hello, ${person.firstName} ${person.lastName}`
}

let user = {firstName: 'Janet', lastName: 'Jackson'}

document.body.innerHTML = greeter(user)
```

### Classes

classes, TypeScript and interfaces all play nicely together. You can use **public** before an argument to automatically create a property on the class.

```js
class Student {
  fullName: string
  constructor(
    public firstName: string,
    public middleInit: string,
    public lastName: string
  ) {
    this.fullName = `${firstName} ${middleInit} ${lastName}`
  }
}

interface Person {
  firstName: string
  lastName: string
}

const greeter = (person: Person) =>
  `Hello, ${person.firstName} ${person.lastName}`

let user = new Student('Jane', 'M.', 'Jackson')

document.body.innerHTML = greeter(user)
```

The student class will automatically have access to `this.firstName`, `this.middleInit` and `this.lastName`.

## TypeScript with React and Webpack

A common directory structure will look like this

```
├── README.md
├── dist
└── src
    └── components
```

TypeScript files will start out in the `src` directory run through the TypeScript compiler, then Webpack and endup in a `bundle.js` file inside the `dist` directory.

We'll want to add the following packages `react react-dom @types/react @types/react-dom`


The `@types/` prefix includes the declaration files for React and React-DOM. If TypeScript doesn't find declarations in the `react` package itself, then it will look in `@types/react`.


We'll need to add a few dev dependencies `typescript awesome-typescript-loader source-map-loader`. These 2 Webpack loaders allow Webpack and TypeScript to work together. `awesome-typescript-loader` allows webpack to process your TypeScript files using a standard configuration file `tsconfig.json`. `source-map-loader` uses TypeScript's source maps to influence Webpack's source maps for debugging purposes.

An example `tsconfig` would look something like this

```
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonJS",
    "target": "es5",
    "jsx": "react"
  },
  "include": ["./src/**/*"]
}
```

All compiler options for `tsconfig` may be found [here](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

## Handbook

### Basic Types

TypeScript supports the simplest units of data: strings, numbers, structures, booleans, etc. There is support for all the types in JavaScript plus a enumeration type.

**Boolean** `let isDone boolean = false`
**Number** `let decimal: number = 6`
**String**
```
let color: string = 'blue'
color = 'red'
```

#### Array

In TypeScript arrays can be written one of two ways

```ts
let list: number[] = [1, 2, 3]
let list: Array<number> = [1, 2, 3]
```

#### Tuple
Tuple types allow you to express an array with a fixed length, but the values may not be the same.

```ts
// declare a tuple
let x = [number, string]
x = [10, 'test'] // correct
x = ['string', 10] // incorrect
```

#### Enum

The enum is an added datatype which is provided by TypeScript. This is a way of giving more friendly names to sets of numeric values. Enums begin numbering their members at 0.

```ts
enum Color {Red, Green, Blue}
Color.Red // => 0
Color.Green // => 1
Color.Blue // => 2
```

The above compiles to

```js
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
```
This allows you to do the following

```ts
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];
console.log(colorName) // 'Green'
```

You can start enums on a different number

```ts
enum Color {Red = 1, Green, Blue}
Color.Red // => 1 
Color.Green // => 2 
Color.Blue // => 3 
```

####Any

When you don't know what the type of a variable will be, you can opt-out of type checking with the any type. This allows you to opt-in and out of typechecking.

Also handy if you know some part of the type, but not all of it

```ts
let list: any[] = [1, true, "three"]
list[1] = 2 // alll goood
```

####void

Void is a little like the opposite of any, it means the absence of any type at all. Variables of type void can only be assigned `null` or `undefined`
They can be useful for a function which doesn't return a value

```ts
function warnUser(): void {
  alert('this is a warning')
}
```

####Null and Undefined

Null and undefined have their own types, which only allow you to assign null or undefined to a variable.
null and undefined are subsets of all other types and can be assigned to a variable that is typed to something else, like number or string.

If the `--strictNullChecks` flag is being used, null and undefined are only assignable to void or their respective types. If you want to pass in a string, null or undefined you can use the union type `string | null | undefined`.

####never

Represents the type of values that never occur, such as a function that throws an error, it never reaches the end of the function

```ts
function error(message): never {
  throw new Error(message)
}
```

####Type Assertions

Type assertions are a way to tell the compiler "trust me I know what I'm doing", when you know more about a type than the compiler does.
Type assertions have 2 forms, the angle-bracket syntax

```ts
let someValue: any = 'this string'
let strLength: number = (<string>someValue).length
```

The other is the "as" syntax. I've seen this called "casting" in conversations online.

```js
let someValue: any = "this is a string"
let strLength: number = (someValue as string).length
```

**Only the `as` syntax will work when using TypeScript with JSX**

####A note about let
`let` is preferred over var

### Variable Declarations

#### var declarations

*A review of scoping rules between `var`, `let` and `const`*

### Interfaces

One of TypeScript's core principles is that type-checking focuses on the shape that values have. Interfaces fill the role of naming these types.

Basic example

```ts
function printLabel(labelObj: { label: string }) {
  console.log(labelObj.label);
}

let myObj = { size: 10, label: "some label" };
printLabel(myObj);
```

The type-checker checks that the call to printLabel is an object with the property label. In this case it doesn't care about the other properties on the object.

The sample can be written again using a interface

```ts
interface printLabelInterface {
  label: string;
}

function printLabel(labelObj: printLabelInterface) {
  console.log(labelObj.label);
}

let myObj = { size: 10, label: "some label" };
printLabel(myObj);
```

You don't have to explicitly say the object passed to `printLabel` implements the exact interface, it is only the shape that matters. If the object meets the requirements listed, then it's allowed. Also order doesn't matter.

#### Optional properties

optional properties can be defined within a interface by using the `?`.

```js
interface SquareConfig {
  color?: string;
  width?: number;
}
```

#### Readonly properties

properties that should only be modified when an object is first created can be denoted with `readonly`.

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}
```

You can construct a `Point` by assigning an object literal.

```ts
let p1: Point = { x: 10, y: 20 };
p1.x = 4; // error!
```

TypeScript comes with a `ReadOnlyArray<type>` which creates an immutable array.

```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(3); // error!
a = ro; // error!
```

In the last line of the above example, you can see that you aren't even allowed to re-assign the immutable array back to a regular array.

#### Excess Property Checks

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  // ... returns somethis like { color: 'red', area: 100 }
}

// error 'colour' not expected in type 'SquareConfig'
let mySquare = createSquare({ colour: 'red', width: 100 })

```

In the above example, the property `color` is misspelled as `colour`. One would think that this would be ok since `color` is a optional property. However, TypeScript will take the stance that there is a bug in this code. Object literals undergo excess property checking when assigning them to variables or passing them as arguments. If an object has any properties that the target type doesn't have, you will get an error.

You can get around these checks with **type assertions**.

```ts
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig)
```

Another way to get around this is to add a **string index signature**, if you're sure the object can have extra properties. If `SquareConfig` can have `color` and `width` but could also have any number of other properties, you could define like the following:

```ts
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
```

we're saying `SquareConfig` can have any number of properties, as long as they aren't `color` or `width`, their type doesn't matter.

Another workaround for this error is to assign the object to another variable:

```ts
let squareOptions = { colour: 'red', width: 100 };
let mySquare = createSquare(squareOptions);
```

#### Function Types
