import assert from 'assert';
import Node from '../src/neat/Node.js';
import { identity, tanh } from '../src/neat/activations.js';

describe('NEAT', () => {
    describe('Basic', () => {
        const inputNode = new Node(0, 0, identity, false);
        const outputNode = new Node(1, 1, tanh, true);

        it("Node(layer=0) isInput", () => {
            assert.equal(inputNode.isInput(), true);
        });

        it("Node(isOutput=true) isOutput", () => {
            assert.equal(outputNode.isOutput(), true);
        });
    });
});