var Stack = function() {
  this.storage = "";
  this.length = 0;
};

Stack.prototype.push = function(val) {
  const { length, storage } = this;
  const newStorage = this.storage.length < 1 ? `***${val}` : storage.concat(`***${val}`);
  this.storage = newStorage;
  this.length++;
  return this.length;
};

Stack.prototype.pop = function() {
  const { storage } = this;
  const lastMarker = storage.lastIndexOf('***');
  const removedItem = this.storage.slice(lastMarker + 3);
  console.log
  this.storage = storage.substr(0, lastMarker);
  this.length--;
  return removedItem;
}

Stack.prototype.size = function() {
  return this.storage.length;
};

var myWeeklyMenu = new Stack();
console.log(myWeeklyMenu.push('pizza'))
