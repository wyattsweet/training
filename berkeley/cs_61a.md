# Computer Science 61A – The Structure and Interpretation of Computer Programs
**Instructor: Brian Harvey**
**Spring 2011**

[Link to collection of videos](https://archive.org/details/ucberkeley-webcast-PL3E89002AA9B9879E)
[Book Link: Structure and Interpretation of Computer Programs](http://web.mit.edu/alexmv/6.037/sicp.pdf)
[Course Outline](https://inst.eecs.berkeley.edu/~cs61a/sp11/)
[Lecture Notes](https://inst.eecs.berkeley.edu/~cs61a/reader/notes.pdf)

## [Lecture 1: Functional Programming](https://archive.org/details/ucberkeley_webcast_l28HAzKy0N8)

Scheme
You ask it a question and it tells you the answer

```
> 6
6

> (+ 6 8)
14

```

3 + 4 in fixed notation
sin ... pre fixed notation
7! post fixed notation

sqrt(k) all around notation

operator first makes it easy to have mutliple operands

```scheme
(+ 1 2 3 4 5 6)
21

(+ 4)
4

(+)
0

(*)
1

+
returns value of + function

'+
+

'hello
hello

(+ (* 3 7) (* 10 10))
121
```

values are calculated from the inside out

Not all functions are functions of numbers

```scheme
(first 'hello)
h

(last 'hello)
o

(butfirst 'hello)

(butlast 'hello)

(bf 'scheme)
cheme

(sentence 'how 'here)
(now here) ;call the function now with the argument here

'(magical mystery tour)
; (magical mystery tour) the sentence

(first (bf '(a hard hars night)))
; hard

(define pi 3.1415)
; pi

pi
;3.1415

(define (square x)
    (* x x))
; square

(square (+ 2 3))
; first (+ 2 3) is evaluated, then that's passed to the square function as x, then (* x x) is evaluated and returned, 25

```

define is called the keywork, the whole expression

```
(define (square x)
    (* x x))
; square

(square (+ 2 3))

```

is considered a special expression because `define` isn't evaluated first.

## [Lecture 2: Functional Programming 2](https://archive.org/details/ucberkeley_webcast_TTK2lZoWbPQ)

Computer science isn't as much about science as it is about engineering. Scientist ask questions about how the world works. Engineers accept how the world works and then build stuff on top of it.

It's also not about computers. Electrical engineers are concerned with how computers are built but CS is really about software. Software Engineering would be a more suitable term.

Computer programming is easy if programs are small and the whole thing can fit in your head.

**computer science is about the control of complexity**

Another term for the field could be complexity control.

In order to control complexity we use programming paradigms, which is what this course is about.

- Functional
- OOP
- Client/Server
- Declarative

**Layers of Abstraction**

Application

---

High Level Languages (eg. Scheme) – Think more about the problem you're trying to solve

---

Low Level Languages (eg. C) – Keep the details of how the computer works in the forefront

---

Machine Language / Architecture

---

Logic Gates – Circuits that compute boolean functions

---

Transistors – a remote controlled switch

---

Quantum Physics – The behavior of sub atomic particles, make transistors do what they do

Abstract means built on top of other pieces.
With abstraction we are making bigger pieces out of smaller pieces.

**What is a function?**

A relationship that has 0 or more inputs and 1 output.
Given the same input, you will always get the same output

If your program is doing a bunch of things at once, and one piece depends on another, you can get in trouble.

but a function doesn't care what is happening in the rest of the computer.

**Using functional programing you're able to utilize parallelism**

**Applicative Order** – When a computer program first evaluates the operator and operands, then applies the resulting value to the arguments.
