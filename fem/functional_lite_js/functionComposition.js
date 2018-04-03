function composeRight(fn2,fn1) {
  return function comp(...args) {
    return fn2(fn1(...args));
  }
}

function increment(x) {
  return x + 1;
}

function double(x) {
  return x * 2;
}

// using the higher order function to call double first
var f = composeRight(increment, double);

// now using it to call increment first
var p = composeRight(double, increment);

f(3); // 7
f(4); // 8
