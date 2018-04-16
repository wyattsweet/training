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
