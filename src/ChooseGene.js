import Gene from './Gene.js'
import {random as rand} from './constants.js'

class ChooseGene extends Gene {
    constructor(mutationRate, momGene = null, dadGene = null) {
        super(mutationRate, momGene, dadGene);
    }

    inheritVal(momGene, dadGene) {
        if (rand.coin()) return momGene.val;
        else return dadGene.val;
    }
}

export default ChooseGene;