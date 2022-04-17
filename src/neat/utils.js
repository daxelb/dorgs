import { random } from '../constants.js';

export function nodeIdsToEdgeKey(i, j) {
  return `${i},${j}`;
}

export function edgeKeyToNodeIds(key) {
  return [parseInt(key.split(',')[0]), parseInt(key.split(',')[1])];
}

/**
 * Assigns on natural number to each pair of
 * natural numbers. A pair of integers will
 * result in an integer result.
 * Source: https://en.wikipedia.dorg/wiki/Pairing_function#Cantor_pairing_function
 * @param {*} a A natural number
 * @param {*} b A natural number
 */
export function cantorPairing(a, b) {
  return (1 / 2) * (a + b) * (a + b + 1) + b;
}

export function* range(...args) {
  let [start, stop, step] = [null, null, null];
  if (args.length == 3) [start, stop, step] = args;
  else if (args.length == 2) [start, stop, step] = [args[0], args[1], 1];
  else if (args.length == 1) [start, stop, step] = [0, args[0], 1];
  for (let i = start; i < stop; i += step) yield i;
}
