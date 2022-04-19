// Contributors: Axel Browne, Victor Quinn

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

  integer(min, max) {
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

// Mersenne Twister from https://gist.github.com/banksean/300494
/*
       A C-program for MT19937, with initialization improved 2002/1/26.
       Coded by Takuji Nishimura and Makoto Matsumoto.

       Before using, initialize the state by using init_genrand(seed)
       or init_by_array(init_key, key_length).

       Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
       All rights reserved.

       Redistribution and use in source and binary forms, with or without
       modification, are permitted provided that the following conditions
       are met:

       1. Redistributions of source code must retain the above copyright
       notice, this list of conditions and the following disclaimer.

       2. Redistributions in binary form must reproduce the above copyright
       notice, this list of conditions and the following disclaimer in the
       documentation and/or other materials provided with the distribution.

       3. The names of its contributors may not be used to endorse or promote
       products derived from this software without specific prior written
       permission.

       THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
       "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
       LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
       A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
       CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
       EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
       PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
       PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
       LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
       NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
       SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


       Any feedback is very welcome.
       http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
       email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
     */
var MersenneTwister = function (seed) {
  if (seed === undefined) {
    // kept random number same size as time used previously to ensure no unexpected results downstream
    seed = Math.floor(Math.random() * Math.pow(10, 13));
  }
  /* Period parameters */
  this.N = 624;
  this.M = 397;
  this.MATRIX_A = 0x9908b0df; /* constant vector a */
  this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
  this.LOWER_MASK = 0x7fffffff; /* least significant r bits */

  this.mt = new Array(this.N); /* the array for the state vector */
  this.mti = this.N + 1; /* mti==N + 1 means mt[N] is not initialized */

  this.init_genrand(seed);
};

/* initializes mt[N] with a seed */
MersenneTwister.prototype.init_genrand = function (s) {
  this.mt[0] = s >>> 0;
  for (this.mti = 1; this.mti < this.N; this.mti++) {
    s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
    this.mt[this.mti] = ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253 + this.mti;
    /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
    /* In the previous versions, MSBs of the seed affect   */
    /* only MSBs of the array mt[].                        */
    /* 2002/01/09 modified by Makoto Matsumoto             */
    this.mt[this.mti] >>>= 0;
    /* for >32 bit machines */
  }
};

/* generates a random number on [0,0xffffffff]-interval */
MersenneTwister.prototype.genrand_int32 = function () {
  var y;
  var mag01 = new Array(0x0, this.MATRIX_A);
  /* mag01[x] = x * MATRIX_A  for x=0,1 */

  if (this.mti >= this.N) {
    /* generate N words at one time */
    var kk;

    if (this.mti === this.N + 1) {
      /* if init_genrand() has not been called, */
      this.init_genrand(5489); /* a default initial seed is used */
    }
    for (kk = 0; kk < this.N - this.M; kk++) {
      y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
      this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    for (; kk < this.N - 1; kk++) {
      y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
      this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    y = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
    this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

    this.mti = 0;
  }

  y = this.mt[this.mti++];

  /* Tempering */
  y ^= y >>> 11;
  y ^= (y << 7) & 0x9d2c5680;
  y ^= (y << 15) & 0xefc60000;
  y ^= y >>> 18;

  return y >>> 0;
};

/* generates a random number on [0,1)-real-interval */
MersenneTwister.prototype.random = function () {
  return this.genrand_int32() * (1.0 / 4294967296.0);
  /* divided by 2^32 */
};

export default Random;