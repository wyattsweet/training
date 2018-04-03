# Four Semesters of Computer Science in Four Hours

## Big O

The way we analyze how efficient algorithms are. Ideas is to get a broad stroke view of the performance rather than a detailed grainular view. Meaning, we only care if the difference is very large.

For the following algorithm 

```
function crossAdd(input) {
    var answer = [];
    for (var i = 0; i < input.length; i++) {
        var goingUp = input[i];
        var goingDown = input[input.length-1-i];
        answer.push(goingUp + goingDown);
    }
    return answer;
}

``` 

The big O value is O(n), because you go through each input once.

Always assumes worst case scenerio.


If you have a loop within a loop such as 

```
function makeTuples(input) {
  var answer = [];
  for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < input.length; j++) {
      answer.push([input[i], input[j]]);
    }
  }
}

```

It would be O(n²). Typically O(n²) algorithms are not what you want.
You can basically find big O by looking at loops.

---

If there are no loops and you do something exit/return, it is called **contant time** and it is O(1). 
If your cod employs divide and conquer strategy (recurssion) it will most likely be O(log n). As you add more items it's going to take less time per item you add to the list. Logerithmic time.

## Recursion

When you define something in terms of itself. When you talk about recursion in computer science it's when you call a function from within the function. This technique is especially useful because of the ability to maintain state at different levels of recursion. Usually iteractive (loops) is more favorable than recursion becuase it inherently carries a potentially large footprint as every time you call a function it adds another call to the stack.

You usually want to favor readability and recursion can make your code very readable. 

### Recursion Example

Usually first line you write is **base case** or when do I stop. 

## Sorting

### Insertion Sort

Occasionally useful when you have an array that you think is close to being sorted

Algorithms are not for rote memorization. Algorithms can be deconstructed and part of them could be used elsewhere.

## Data Structure Interfaces

### sets

A set is more like an object than an array. A set has no duplicates.
Good for a large set of numbers you need to de-duplicate.
You could say usernames are a set, each username is unique.
No gaurantee of order in sets.
JavaScript ES6 has native sets.

### Map

Maps are key value sets. Map is a thing with a **set** of keys (no duplication in keys).
Values are not a set, there can be duplication.
Maps in ES6 as well.

### Stacks

Stacks are a interface that adhere to "first in last out"
This is where the term push and pop come from
A pure stack will only let you get stuff off the top.
You use stacks all the time because you're programming on a stack

### Queues

A queue is first in first out, similar to people queueing in line
add queue to add to end, de-queue to add to the end.

There is also a priority queue where things with a higher priority go towards the front
and things of lesser priority go towards the back by assigning each item a priority.


## ArrayList

Your index is descriptive of where to go get the thing your looking for, a memory location.
Really good for get but expensive to delete because you have to shift each element over when an item is deleted.

## Linked List

Create a node with 2 elements, the value and a pointer to the next node. 
Head points at the first element and Tail points at the last element.
Push is simple, delete is easier than an arrayList.  

### AVL Tree

### Hash Table

## Functional Programming 101

Focusing in on a few key concepts. To do hardcore functional programming it's better to use something like Haskell or Erlang.

Key concept #1 - Avoid side effects. Same input 100 times will give the same output 100 times. This makes function very testable.

A function that modifies no state and is independent is called a **pure function**. We generally want small focused pure functions.

concept #2 - we're going to focus on higher order functions. Functions that apply other functions

concept #3 - We're going to focus on transforming lists of data. 
This is called vector or array programming. 
Allows you to safely take output of one function and safely put that into the next function. We can chain calls together which allows our code to become more expressive. We can describe what we want to happen (declarative) rather than imperatively telling how.

Functional programming makes code maintainable, composeable and easy to reason about.

### Map

This is similar to the method `.map`
A higher order function, takes another function and has its own logic on how to apply that function.

map does the following - 
* Takes in an array
* Does something to it
* returns an array

```
const double = number => number * 2
const doubleEach = input => input.map(double)

const square = number => number * number
const squareEach = input => input.map(square)

const doubleAndSquareEach = input => input.map(double).map(square)

const myMap = (input, func) => input.map(func)

```
