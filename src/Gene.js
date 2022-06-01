import {random as rand} from './constants.js'

class Gene {
    constructor(mutationRate, momGene = null, dadGene = null) {
        this.mutationRate = mutationRate;
        if (this.willMutate() || (!momGene && !dadGene)) {
            this.val = this.randomVal();
        } else if (!!momGene && !!dadGene) {
            this.val = this.inheritVal(momGene, dadGene)
        } else if (!!momGene && !dadGene) {
            this.val = momGene.val;
        }
    }

    randomVal() {
        return rand.random();
    }

    willMutate() {
        return rand.random() < this.mutationRate;
    }

    inheritVal(momGene, dadGene) {
        return (momGene.val + dadGene.val) / 2
    }

    toString() {
        return this.val;
    }
}

export default Gene;