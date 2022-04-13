import { tanh } from './activations.js';

export default class Genome {
  /**
   * Ayo
   * @param {int} inputs  Number of inputs
   * @param {int} outputs Number of outputs 
   */
  constructor(inputs, outputs, defaultActivation) {
    this.inputs = inputs
    this.outputs = outputs

    this.defaultActivation = defaultActivation
    // this.id = "NA" // Genome id -> used for the drawing
    
    this.nextNode = 0
    this.nodes = [] // 
    this.edges = [] // (i, j) -> Edge
  }


  generate() {
    for (let i = 0; i < this.inputs; i++) {
      this.nodes.push(new Node(this.nextNode, 0, this.defaultActivation, false));
    }
    for (let i = 0; i < this.outputs; i++) {
      this.nodes.push(new Node(this.nextNode, 1, this.defaultActivation, true));
    }

    for (let i = 0; i < this.inputs; i++) {
      for (let j = this.inputs; j < this.outputs + this.inputs; j++) {
        this.connections.push(this.nodes[i], this.nodes[j], new Edge(this.randomWeight()));
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

  crossover(partner) {
    return genomicCrossover(this, partner);
  }
}

function genomicCrossover(a, b) {
  child = Genome(a.inputs, a.outputs, a.defaultActivation);

  aEdges = new Set(Object.keys(a.edges))
  bEdges = new Set(Object.keys(b.edges))

  intersection(aEdges, bEdges).forEach((e) => {
    
  })

}

function intersection(setA, setB) {
  const intersection = new Set();
  for (const elem of setA) {
    if (setB.has(elem)) {
      intersection.add(elem);
    }
  }
  return intersection;
}