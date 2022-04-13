import { random } from "./activations.js";

export default class Node {
  constructor(number, layer, activation, isOutput) {
    this.number = number
    this.layer = layer
    this.activation = activation;

    this.output = isOutput || false;

    this.bias = 0;
    this.inputSum = 0;
    this.value = 0;
    this.outputEdges = [];
  }

  engage() {
    if (!this.isInput)
      this.value = this.activation(this.inputSum + this.bias)
  
    this.outputEdges.forEach((edge) => {
      if (edge.enabled)
        edge.toNode.inputSum += edge.weight * this.value;
    });
  }

  mutateBias() {
    this.bias = Math.random() * 2 - 1
  }

  mutateActivation() {
    this.activation = random
  }

  isInput() {
    return this.layer == 0;
  }

  isHidden() {
    return !this.isInput() && !this.isOutput()
  }

  isOutput() {
    return this.output;
  }

  getType() {
    return this.isInput ? "Input" : this.output ? "Output" : "Hidden"
  }

  clone() {
    let clone = new Node(this.number, this.layer, this.activation, this.isOutput)
    clone.bias = this.bias
    clone.inputSum = this.inputSum
    clone.value = this.value
    clone.outputEdges = this.outputEdges
    return clone
  }

  toString() {
    return `[${this.getType()}Node_${this.number}=${this.value}]`
  }
}