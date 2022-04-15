import { tanh } from './activations.js';
import Edge from './Edge.js';
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

    this.unhidden = inputs + outputs
    this.maxNode = inputs + outputs
    
    this.nodes = {} // NodeId : Node
    this.edges = {} // (i, j) : Edge

    this.fitness = 0
    this.adjustedFitness = 0
  }


  generate() {
    for (let n = 0; n < this.maxNode; n++) {
      this.nodes[i] = new Node(this.defaultActivation)
    }

    for (let i = 0; i < this.inputs; i++) {
      for (let j = this.inputs; j < this.unhidden; j++) {
        this.addEdge(i, j, this.randomWeight());
      }
    }
  }

  nodeIdsToEdgeKey(i, j) {
    return `${i},${j}`
  }

  edgeKeyToNodeIds(key) {
    return [parseInt(key.split(",")[0]), parseInt(key.split(",")[1])]
  }

  addEdge(i, j, weight) {
    key = nodeIdsToEdgeKey(i, j)
    if (key in this.edges)
      self.edges[key].enabled = True
    else
      self.edges[key] = new Edge(weight)
  }



  randomWeight() {
    // return Math.random() * 2 - 1
    return Math.random() * this.inputs * Math.sqrt(2 / this.inputs);
  }

  forward(inputs) {
    if (inputs.length != self.inputs)
      throw new Error('Incorrect number of inputs.')
    
    // Set input values
    for (let i = 0; i < this.inputs; i++)
      this.nodes[i].output = inputs[i]
    
    // Generate backward-adjacency list
    let from = {}
    for (let n = 0; n < this.maxNode; n++) {
      from[n] = []
    }

    let [i, j] = [null, null];
    this.edges.forEach((edgeKey) => {
      [i, j] = edgeKeyToNodeIds(edgeKey)
      if (!this.edges[edgeKey].enabled) {
        from[j].push(i)
      }
    })

    
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

