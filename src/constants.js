import Random from './Random.js';

export const fps = 0.5;
export const cellSize = 32;
export const melonSpawnRate = 0.5;
export const startDorgs = 2;

export let numDorgs = 0;
export function incNumDorgs() {
  numDorgs++
}

export const palette = {
  HIGHLIGHT: 'rgb(255,0,0)',
  OVERRIDE: '#00ff00',
  EMPTY: '#0E1318',
  MELON: 'rgb(255,154,77, 0.75)',
  DORG: '#60D4FF',
  GREEN: '#00FF00'
};

export const directions = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3
}

export const moves = {
  FORWARD: 'F',
  BACKWARD: 'B',
  LEFT: 'L',
  RIGHT: 'R'
}

export const actions = ['up','down','left', 'right']

export const random = new Random();

export const flowerGeneNames = [
  'segments Choose',
  'repetitions',
  'repOffset',
  'startR',
  'startG',
  'startB',
  'targetR',
  'targetG',
  'targetB',
  'p1Offset Choose',
  'p2Offset Choose',
  'p1RadiusCoeff Choose',
  'p2RadiusCoeff Choose',
]

// export const mutationProbs = {
//   "weights": 0.8,
//   "weight_perturbed": 0.9, // random that a weight is uniformly perturbed if weight is mutated
//   "weight_randomized": 0.1, // random that a weight is given a new random value if the weight is mutated
//   "disabled": 0.75, //disabled if disabled in either parent
//   "no_crossover": 0.25, // 25% of offspring resulted from mutation without crossover
//   "interspecies_mating_rate": 0.001,
//   "new_node_smaller_population": 0.03,
//   "new_link_smaller_population": 0.05,
//   "new_link_larger": 0.3,
//   "defaultActivation": modifiedSigmoidalTransfer
// }
