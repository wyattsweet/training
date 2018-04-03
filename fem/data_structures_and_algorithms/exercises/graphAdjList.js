function Graph() {
  this.graph = []
}

Graph.prototype.addNode = function(val) {
  this.graph[val] = this.graph[val] || []
}

Graph.prototype.addEdge = function(val1, val2) {
  const isConnected = !!this.graph[val1][val2]
  if (isConnected) return
  this.graph[val1].push(val2)
  this.graph[val2].push(val1)
}

Graph.prototype.contains = function(val) {
  return val <= this.graph.length
}

Graph.prototype.removeNode = function(val) {
  const edges = this.graph[val]
  this.graph[val] = undefined
  edges.forEach(edge => {
    const edges = this.graph[edge]
    const remInd = edges.indexOf(val)
    edges.splice(remInd, 1)
  })
}

Graph.prototype.removeEdge = function(val1, val2) {
  const val1Edges = this.graph[val1]
  const val2Edges = this.graph[val2]
  if (!val1Edges || !val2Edges) {
    return
  }
  val1Edges.splice(val1Edges.indexOf(val2), 1)
  val2Edges.splice(val2Edges.indexOf(val1), 1)
}

Graph.prototype.hasEdge = function(val1, val2) {
  return !!(this.graph[val1] && this.graph[val2])
}

nums = new Graph()
nums.addNode(1)
nums.addNode(2)
nums.addNode(3)
nums.addNode(4)
nums.addEdge(1, 2)
nums.addEdge(3, 2)
nums.addEdge(3, 4)
nums.removeNode(1)
console.log(nums)
