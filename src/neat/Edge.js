export default class Edge {
  constructor(from, to, weight) {
    this.fromNode = from;
    this.toNode = to;
    this.weight = weight;
    this.enabled = true;
  }

  getInnovationNumber() { // https://en.wikipedia.org/wiki/Pairing_function#Cantor_pairing_function
    return (1 / 2) * (this.fromNode.number + this.toNode.number) * (this.fromNode.number + this.toNode.number + 1) + this.toNode.number;
  }

  clone() {
    let clone = new Edge(this.fromNode, this.toNode, this.weight);
    clone.enabled = this.enabled;
    return clone;
  }

  toString() {
    enable = this.enabled ? '->' : '-x>'
    return `[Edge=(${this.fromNode.number} ${enable} ${this.toNode.number}), weight=${this.weight}]`;
  }
}