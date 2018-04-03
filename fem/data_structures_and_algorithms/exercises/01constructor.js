function House(style) {
  this.what = 'house';
  this.style = style;
  this.rooms = [];
}

House.prototype.createBedroom = function(w, l) {
  this.rooms.push({
    name: 'bedroom',
    width: w,
    length: l
  })
}

House.prototype.createKitchen = function(w, l) {
  this.rooms.push({
    name: 'kitchen',
    width: w,
    length: l
  })
}

var craftsman = new House('craftsman');
var ranch = new House('ranch style');

craftsman.createBedroom(23, 453);
craftsman.createBedroom(21, 53);
craftsman.createBedroom(23, 453);
craftsman.createBedroom(23, 453);
craftsman.createKitchen(234,2344);
console.log(craftsman.rooms);
