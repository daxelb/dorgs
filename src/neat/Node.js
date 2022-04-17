export default class Node {
  constructor(activation) {
    this.output = 0;
    this.bias = 0;
    this.activation = activation;
  }

  clone() {
    return new Node(this.output, this.bias, this.activation);
  }
}
