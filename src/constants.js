import Random from './Random.js';

export const palette = {
  HIGHLIGHT: 'rgb(255,0,0)',
  OVERRIDE: '#00ff00',
  EMPTY: '#0E1318',
  MELON: 'rgb(255,154,77)',
  ORG: '#60D4FF',
};

export const hyperparams = {
  CELL_SIZE: 32,
  ACTIONS: ['up', 'down', 'left', 'right'],
};

export const random = new Random();

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
