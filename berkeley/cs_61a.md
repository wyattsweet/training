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


