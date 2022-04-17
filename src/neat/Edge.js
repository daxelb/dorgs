export default class Edge {
  constructor(weight) {
    this.weight = weight;
    this.enabled = true;
  }

  clone() {
    return new Edge(this.weight, this.enabled);
  }
}
