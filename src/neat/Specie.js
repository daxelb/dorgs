import { hyperparams } from './constants';
import { random } from '../constants';
import { genomicDistance } from './crossover';
import { max, sorted, sum } from 'itertools';

export default class Specie {
  constructor(maxFitnessHistory, ...members) {
    this.members = new Array(members);
    this.fitnessHistory = [];
    this.fitnessSum = 0;
    this.maxFitnessHistory = maxFitnessHistory;
  }

  reproduce() {
    let child;
    if (hyperparams.reproduceSexually()) {
      child = random.pickone(this.members).clone();
      child.mutate();
      return child;
    }
    const [mom, dad] = random.sample(this.members, 2);
    child = crossover(mom, dad);
    return child;
  }

  updateFitness() {
    // update adjusted fitness for every genome in the specie
    for (g of this.members) g.adjustedFitness = g.fitness / this.members.length;
    // recalculate current fitness sum
    this.fitnessSum = sum(this.members.map((g) => g.adjustedFitness));
    // update fitness history
    this.fitnessHistory.push(this.fitnessSum);
    if (this.fitnessHistory.length > this.maxFitnessHistory) this.fitnessHistory.shift();
  }

  cullGenomes(fittestOnly) {
    this.members = sorted(this.members, (g) => g.fitness, True);
    // Only keep the winning genome
    if (fittestOnly) this.members = this.members.slice(0, 1);
    // Keep top 25%
    else this.members = this.members.slice(0, Math.ceil(0.25 * this.members.length));
  }

  getBest() {
    return max(this.members, (g) => g.fitness);
  }

  canProgress() {
    const n = this.fitnessHistory.length;
    const avg = sum(this.fitnessHistory) / n;
    return avg > this.fitnessHistory[0] || n < this.maxFitnessHistory;
  }
}
