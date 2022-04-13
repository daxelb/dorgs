export const identity = (x) => {
  return x;
}

export const sigmoid = (x) => {
  return 1 / (1 + Math.pow(Math.E, -4.9 * x));
}

export const tanh = (x) => {
  return Math.tanh(x);
}

export const relu = (x) => {
  return x > 0 ? x : 0;
}

export const random = () => {
  activations = [identity, sigmoid, tanh, relu]
  return activations[Math.floor(Math.random() * activations.length)]
}