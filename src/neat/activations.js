import { random } from '../constants.js';

export const identity = (x) => {
  return x;
};

/**
 * http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf
 * @param {*} x
 * @returns
 */
export const modifiedSigmoidalTransfer = (x) => {
  return 1 / (1 + Math.pow(Math.E, -4.9 * x));
};

export const sigmoid = (x) => {
  return 1 / (1 + Math.pow(Math.E, -x));
};

export const tanh = (x) => {
  return Math.tanh(x);
};

export const relu = (x) => {
  return x > 0 ? x : 0;
};

export const randomActivation = () => {
  const activations = [identity, sigmoid, tanh, relu];
  return random.choice(activations);
};
