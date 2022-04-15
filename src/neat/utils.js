export let innovNum = 0;
export let genInnovs = {};

export function intersection(setA, setB) {
  const intersection = new Set();
  for (const elem of setA) {
    if (setB.has(elem)) {
      intersection.add(elem);
    }
  }
  return intersection;
}

/**
 * Assigns on natural number to each pair of
 * natural numbers. A pair of integers will
 * result in an integer result.
 * Source: https://en.wikipedia.org/wiki/Pairing_function#Cantor_pairing_function
 * @param {*} a A natural number
 * @param {*} b A natural number
 */
export function cantorPairing(a, b) {
  return (1 / 2) * (a + b) * (a + b + 1) + b;
}

export function coinFlip() {
  return Math.random() > 0.5;
}