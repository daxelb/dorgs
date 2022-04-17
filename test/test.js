import { assert } from 'chai';
import { random } from '../src/constants.js';
import { allEqual } from './utils.js';
import itertools from 'itertools';
import Genome from '../src/neat/Genome.js';
import { tanh } from '../src/neat/activations.js';

describe('NEAT', () => {
  describe('Genome', () => {
    const a = new Genome(3, 2, tanh);
    it('Construction', () => {
      assert.equal(a.inputs, 3);
      assert.equal(a.outputs, 2);
      assert.equal(a.defaultActivation, tanh);
      assert.equal(a.unhidden, 5);
      assert.equal(a.maxNode, 5);
    });

    it('Generation', () => {
      assert(a.generate());
      assert.equal(Object.keys(a.nodes).length, 5);
      assert.equal(Object.keys(a.edges).length, 3 * 2);
    });

    it('isDisabled', () => {
      assert(!a.isDisabled());
      const b = new Genome(3, 2, tanh);
      assert(b.isDisabled());
      b.generate();
      assert(!b.isDisabled());
      b.disable(0, 3);
      assert(!b.isDisabled());
      b.disable(0, 4);
      b.disable(1, 3);
      b.disable(1, 4);
      b.disable(2, 3);
      assert(!b.isDisabled());
      b.disable(2, 4);
      assert(b.isDisabled());
    });

    it('Indices', () => {
      assert.deepEqual([...a.getInputIndices()], [0, 1, 2]);
      assert.deepEqual([...a.getHiddenIndices()], []);
      assert.deepEqual([...a.getOutputIndices()], [3, 4]);
    });
  });
});
