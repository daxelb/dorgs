import MersenneTwister from "./MersenneTwister.js";

class Random {
  constructor(seed) {
    this.seed = seed;
    this.generator = new MersenneTwister(seed);
  }

  random() {
    return this.generator.random();
  }

  coin() {
    return this.random() < 0.5;
  }

  uniform(min, max) {
    return this.random() * (max - min) + min;
  }

  integer(min, max = null) {
    if (!!max) // if second arg is not specified, generate from 0
      return Math.floor(this.uniform(0,min));
    return Math.floor(this.uniform(min, max));
  }

  choice(arr) {
    return arr[this.integer(0, arr.length)];
  }

  sample(arr, n = 1) {
    let indicies = new Set();
    while (indicies.size < n) {
      indicies.add(this.integer(0, arr.length));
    }
    return [...indicies].map((i) => arr[i] );
  }

  /**
   * SOURCE: Victor Quinn, chance, https://chancejs.com/
   * @param {*} arr
   * @returns
   */
  shuffle(arr) {
    var new_array = [],
      j = 0,
      length = Number(arr.length),
      source_indexes = range(length),
      last_source_index = length - 1,
      selected_source_index;

    for (var i = 0; i < length; i++) {
      // Pick a random index from the array
      selected_source_index = this.integer(0, last_source_index + 1);
      j = source_indexes[selected_source_index];

      // Add it to the new array
      new_array[i] = arr[j];

      // Mark the source index as used
      source_indexes[selected_source_index] = source_indexes[last_source_index];
      last_source_index -= 1;
    }

    return new_array;
  }

  /**
   * SOURCE: Victor Quinn, chance, https://chancejs.com/
   * @param {*} arr
   * @param {*} weights
   * @returns
   */
  weighted(arr, weights) {
    if (arr.length !== weights.length) {
      throw new RangeError('Chance: Length of array and weights must match');
    }

    // scan weights array and sum valid entries
    var sum = 0;
    var val;
    for (var weightIndex = 0; weightIndex < weights.length; ++weightIndex) {
      val = weights[weightIndex];
      if (isNaN(val)) {
        throw new RangeError('Chance: All weights must be numbers');
      }

      if (val > 0) {
        sum += val;
      }
    }

    if (sum === 0) {
      throw new RangeError('Chance: No valid entries in array weights');
    }

    // select a value within range
    var selected = this.random() * sum;

    // find array entry corresponding to selected value
    var total = 0;
    var lastGoodIdx = -1;
    var chosenIdx;
    for (weightIndex = 0; weightIndex < weights.length; ++weightIndex) {
      val = weights[weightIndex];
      total += val;
      if (val > 0) {
        if (selected <= total) {
          chosenIdx = weightIndex;
          break;
        }
        lastGoodIdx = weightIndex;
      }

      // handle any possible rounding error comparison to ensure something is picked
      if (weightIndex === weights.length - 1) {
        chosenIdx = lastGoodIdx;
      }
    }

    return arr[chosenIdx];
  }

  /**
   * SOURCE: Marsaglia Polar Method, https://en.wikipedia.org/wiki/Marsaglia_polar_method
   * @param {*} mean
   * @param {*} dev
   * @returns
   */
  normal(mean = 0, dev = 1) {
    let u, v, s, norm;
    do {
      u = this.uniform(-1, 1);
      v = this.uniform(-1, 1);
      s = u * u + v * v;
    } while (s >= 1 || s == 0);

    // Compute the standard normal variate
    norm = u * Math.sqrt((-2 * Math.log(s)) / 2);

    // Shape and scale
    return mean + dev * norm;
  }
}

export default Random;