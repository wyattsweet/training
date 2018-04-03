class AdjacencyMatrix {
  constructor() {
    this.matrix = []
  }

  addNode(value) {
    // value = 2
    if (this.matrix.length - 1 < value) {
      let count = this.matrix.length - 1
      count = count < 0 ? 0 : count
      while (count < value) {
        let currentVal = this.matrix[count]
        this.matrix[count] = currentVal !== null ? currentVal : null
        count++
      }
    }
    this.matrix[value] = []
    const currentVal = this.matrix[value]
    for (let i = 0; i < this.matrix.length; i++) {
      if (this.matrix[i]) {
        currentVal[i] = 0
        this.matrix[i][value] = 0
      } else {
        currentVal[i] = null
      }
    }
  }

  addEdge(vert1, vert2) {
    this.matrix[vert1][vert2] = 1
    this.matrix[vert2][vert1] = 1
  }
}

const graph = new AdjacencyMatrix()
graph.addNode(4)
graph.addNode(2)
graph.addNode(3)
graph.addNode(1)
graph.addNode(10)

graph.addEdge(1, 2)
graph.addEdge(1, 3)
graph.addEdge(2, 4)
graph.addEdge(4, 4)
graph.addEdge(10, 1)
console.log(graph.matrix)

// [
//  null,
//  [null, 0, 0, 0, 0],
//  [null, 0, 0, 0, 0],
//  [null, 0, 0, 0, 0],
//  [null, 0, 0, 0, 0]
// ]

// [
//  null,
//  [null, 0, 1, 1, 0],
//  [null, 1, 0, 0, 1],
//  [null, 1, 0, 0, 0],
//  [null, 0, 1, 0, 0]
// ]
