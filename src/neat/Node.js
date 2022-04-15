import { random } from "./activations.js";
import Edge from "./Edge.js";

export default class Node {
  constructor(activation) {
    this.output = 0;
    this.bias = 0;
    this.activation = activation;
  }
}