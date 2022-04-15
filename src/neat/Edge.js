import { innovNum, genInnovs, cantorPairing } from "./utils";

export default class Edge {
  constructor(from, to, weight) {
    this.fromNode = from;
    this.toNode = to;
    this.weight = weight;
    this.enabled = true;
    this.innov = this.getInnovationNumber();

  }

  toKey() {
    return `${this.fromNode.number},${this.toNode.number}`
  }

  getInnovationNumber() {
    key = this.toKey()
    if (key in genInnovs) {
      this.innov = genInnovs[key]
    }
    else {
      this.innov = innovNum;
      innovNum++;
    }
  }

  // getInnovationNumber() {
  //   return cantorPairing(this.fromNode.number, this.toNode.number)
  // }

  clone() {
    let clone = new Edge(this.fromNode, this.toNode, this.weight);
    clone.enabled = this.enabled;
    return clone;
  }

  deepclone() {
    newFrom = this.fromNode.deepclone()
    newTo = this.fromNode.deepclone()
    deepclone = new Edge(newFrom, newTo, this.weight);
    return deepclone
  }

  toString() {
    enable = this.enabled ? '->' : '-x>'
    return `<Edge (${this.fromNode.number} ${enable} ${this.toNode.number}) weight=${this.weight} innov=${this.innov}>`;
  }

  valueOf() {
    return this.toKey()
  }

  hashCode() {
    return this.toKey();
  }
}