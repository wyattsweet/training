const util = require('util');

const inOrderTraversal = [];
const preOrderTraversal = [];
const postOrderTraversal = [];

function BinarySearchTree(value) {
  this.root = value;
  this.children = {
    leftChild: null,
    rightChild: null,
  };
}

BinarySearchTree.prototype.addChild = function(value) {
  const newChild = new BinarySearchTree(value);
  if (value >= this.root) {
    return !this.children.rightChild
      ? (this.children.rightChild = newChild)
      : this.children.rightChild.addChild(value);
  } else {
    return !this.children.leftChild
      ? (this.children.leftChild = newChild)
      : this.children.leftChild.addChild(value);
  }
};
// Time complexity:

BinarySearchTree.prototype.contains = function(value) {
  // Return true if value is in tree, false if not
  if (value === this.root) {
    return true;
  } else if (!this.children.leftChild && !this.children.rightChild) {
    return false;
  } else if (value < this.root) {
    return this.children.leftChild.contains(value);
  } else if (value > this.root) {
    return this.children.rightChild.contains(value);
  }
};

BinarySearchTree.prototype.traverseDepthFirst_inOrder = function() {
  if (!this.children.leftChild && !this.children.rightChild) {
    inOrderTraversal.push(this.root);
    return;
  }
  if (!!this.children.leftChild) {
    this.children.leftChild.traverseDepthFirst_inOrder();
  }
  inOrderTraversal.push(this.root);
  if (!!this.children.rightChild) {
    this.children.rightChild.traverseDepthFirst_inOrder();
  }
};

BinarySearchTree.prototype.traverseDepthFirst_preOrder = function() {
  preOrderTraversal.push(this.root);
  if (!!this.children.leftChild) {
    this.children.leftChild.traverseDepthFirst_preOrder();
  }
  inOrderTraversal.push(this.root);
  if (!!this.children.rightChild) {
    this.children.rightChild.traverseDepthFirst_preOrder();
  }
};

BinarySearchTree.prototype.traverseDepthFirst_postOrder = function() {
  if (!!this.children.leftChild) {
    this.children.leftChild.traverseDepthFirst_postOrder();
  }
  // record value?
  if (!!this.children.rightChild) {
    this.children.rightChild.traverseDepthFirst_postOrder();
  }
  postOrderTraversal.push(this.root);
};

BinarySearchTree.prototype.deleteMin = function() {
  if (!this.children.leftChild) {
    this.children.leftChild = null;
  } else if (!this.children.leftChild.children.leftChild) {
    this.children.leftChild = null;
  } else {
    this.children.leftChild.deleteMin();
  }
};

BinarySearchTree.prototype.deleteMax = function() {
  if (!this.children.rightChild) {
    this.children.rightChild = null;
  } else if (!this.children.rightChild.children.rightChild) {
    this.children.rightChild = null;
  } else {
    this.children.rightChild.deleteMax();
  }
};

const tree = new BinarySearchTree(8);
tree.addChild(10);
tree.addChild(9);
tree.addChild(6);
tree.addChild(7);
tree.addChild(5);
tree.addChild(12);
tree.deleteMax();
console.log(util.inspect(tree, {showHidden: false, depth: null}));
