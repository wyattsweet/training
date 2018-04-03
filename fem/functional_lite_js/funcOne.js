function foo(bar) {
  return function(x) {
    return bar(x);
  }
}

const x = foo(function(v) {
  return v * 2;
})(3); // 6

console.log(x);
