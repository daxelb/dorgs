import { tanh } from './activations.js';
import { intersection } from './utils.js';

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
    
    this.nodes = [] // 
    this.edges = {} // (i, j) -> Edge
  }


  generate() {
    for (let i = 0; i < this.inputs; i++) {
      this.nodes.push(new Node(this.nodes.length, 0, this.defaultActivation, false));
    }
    for (let i = 0; i < this.outputs; i++) {
      this.nodes.push(new Node(this.nodes.length, 1, this.defaultActivation, true));
    }

    for (let i = 0; i < this.inputs; i++) {
      for (let j = this.inputs; j < this.outputs + this.inputs; j++) {
        edge = new Edge(this.nodes[i], this.nodes[j], this.randomWeight())
        key = edge.toKey()
        this.edges[key] = edge;
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
  offspring = Genome(a.inputs, a.outputs, a.defaultActivation);

  aEdges = new Set(Object.keys(a.edges))
  bEdges = new Set(Object.keys(b.edges))

  intersection(aEdges, bEdges).forEach((edgeKey) => {
    parentEdge = coinFlip() ? aEdges[edge] : bEdges[edge]
    offspring.edges[edgeKey] = parentEdge.deepcopy()
  })

}

