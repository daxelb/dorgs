class Genome {
  /**
   * Ayo
   * @param {int} inputs  Number of inputs
   * @param {int} outputs Number of outputs 
   */
  constructor(inputs, outputs, defaultActivation) {
    this.inputs = n
    this.outputs = outputs

    this.defaultActivation = defaultActivation
    // this.id = "NA" // Genome id -> used for the drawing
    
    this.nodes = [] // 
    this.edges = {} // (i, j) -> Edge
  }

  /**
   * A
   */
  generate() {
    for (let i = 0; i < this.inputs; i++) {
      this.nodes.push(new Node(this.defaultActivation));
    }
    for (let i = 0; i < this.inputs; i++) {
      for (let j = this.inputs; k < this.outputs + this.inputs; j++) {
        this.connections[(i, j)] = new Edge(randomWeight());
      }
    }
  }

  randomWeight() {
    // return Math.random() * 2 - 1
    return Math.random() * this.inputs * Math.sqrt(2 / this.inputs);
  }

  forward(inputs) {
    if (inputs.length != self.inputs)
      throw new Error('Incorrect number of inputs.')
    for (let i = 0; i < this.inputs; i++)
      this.nodes[i].output = inputs[i]
    
  }
}