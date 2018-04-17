# [Tutorials Point Learn Ruby Programming](https://www.tutorialspoint.com/ruby/ruby_overview.htm)

## Overview

Ruby is a pure object-oriented programming language.

Ruby is a server-side scripting language similar to Python and PERL.
Ruby has a similar syntax to that of many programming languages such as C++ and Perl

## Syntax

Ruby interprets semicolons and newline chars as the end of a statement

Identifiers are names of variable, constants and methods.
Identifiers are case sensitive.

### Begin and End statements

`BEGIN` statement declares code that is called before the application runs

```ruby
puts "la da da"

BEGIN {
  puts "Hello blah"
}
```
would output

```
Hello blah
la da da
```
`END` statement does the opposite, declares code to be called at the end of the program.

```ruby
puts "This is main Ruby Program"

END {
   puts "Terminating Ruby Program"
}
BEGIN {
   puts "Initializing Ruby Program"
}
```

will output

```
Initializing Ruby Program
This is main Ruby Program
Terminating Ruby Program
```

## Classes and Objects

Features of a Object Oriented programming language include
- Data Encapsulation
- Data Abstraction
- Polymorphism
- Inheritance

### Variables in a Ruby class

- Local Variables: These variables are defined in a method and aren't available outside the method.
- Instance Variable: Instance variables are available across methods for a particular instance or object. Instance variables change from object to object. Instance variables always begin with a `@` sign.
- class variables: available across different objects. They begin with a `@@`
- Global variables: a variable that is available across classes. Begins with a `$`

### Creating Objects in Ruby Using New

You can create instances of classes using the `new` keyword

```ruby
cust1 = Customer.new
cust2 = Customer.new
```

### Custom Method to Create Ruby Objects

`initialize` is a special method within a class that gets called when the method gets created.

```ruby
class Customer
  @@num_of_customers = 0
  def initialize(id, name, city)
    @cust_id = id
    @cust_name = name
    @cust_city = city
  end
end
```

In the Customer class we are declaring 3 local variables. We pass these on to create 3 instance methods from these local variables.
Now objects can be created from this class.

```ruby
cust1 = Customer.new(1, "Bill", "Warsaw")
cust2 = Customer.new(2, "Arnold", "Highland")
```

### Member Functions in Ruby Class

Member functions are any methods within a class.
They start with `def` followed by the method name.
They end with the keyword `end`.

## Variables, Constants and Literals

There are 5 types of variables

### Global variables
Globals begin with `$`. Generally not recommended to use global variables.

### Instance Variable
begin with `@`

### Class variables
begin with `@@`

### Local variables
begin with a lowercase letter or `_`

### Constants

Constants begin with a uppercase letter. Constants can be accessed from within a class or module. If defined outside a class or module they become global.

### Ruby Pseudo-Variables

These are special variables which behave like constants. You can't assign a value to these guys.
- self: the receiver object of the current method
- true
- false
- nil
- __FILE__: The name of the current source file.
- __LINE__: The current line number in the source file.

### Ruby Basic Literals

#### Integer Numbers

an integer can be within the range of `-2^30` to `2^30-1` or `-2^62` to `2^62-1`. Integers with this range are objects of class Fixnum intergers outside this range are objects of the class Bignum.

Integers can be written using a optional leading sign, followed by a string of digits in the appropriate base.
- 0 for octal
- 0x for hex
- 0b for binary

When a character is preceded by a `?` you will get int value corresponding to an ASCII char or escape the sequence.

#### Floating Numbers

Ruby supports numbers with decimals. These are objects of class float.

```ruby
123.4 # floating point value
1.0e6 # scientific notation
4E20  # dot not required
4e+20 # sign before exponential
```

#### String Literals

sequences of 8-bit bytes which are objects of class `String`.
Double-quoted strings allow substitution and backslash notation.
single-quoted strings don't allow subs and allow backslash notation only for \\ and \

You can substitute the value of any Ruby expression into a string using the sequence `#{}`. This is called **string interpolation**.

```ruby
foo = 'world'
puts "Hello #{foo}" # => Hello world
```

#### Backslash notation

backslash notation supported by Ruby

```ruby
\n # newline
\r # carriage return
\f # formfeed
\b # backspace
\a # bell
\e # Escape
\s # Space
\nnn # Octal notation
\xnn # Hexadecimal Notation
```

#### Ruby Arrays

comma-seperated series of object references, trailing comma is ignored.

#### Ruby Hashes

created by placing a list of key/value pairs between braces, seperated by a comma `,` or the hash rocket `=>`. A trailing comma is ignored.

#### Ruby Ranges

A range represents a interval which is a set of values with a start and an end.
constructed using the `a..b` or `a...b` literal or with Range.new.

Ranges constructed using `..` run from the start to the end inclusively.
Those constructed using `...` exclude the end value.
A range `1..5` includes `1, 2, 3, 4, 5`
Range `1...5` includes `1, 2, 3, 4`

## [Operators](https://www.tutorialspoint.com/ruby/ruby_operators.htm)
