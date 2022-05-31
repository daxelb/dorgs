class Gene {
    constructor(mutationChance, momGene = null, dadGene = null) {
        // mutation rate
        this.mutationRate = mutationChance
        if (this.willMutate()) {
            this.value = this.randomVal();
        } else if (!momGene && !dadGene) {
            this.value = this.inheritVal(momGene, dadGene)
        } else if (!momGene && !!dadGene) {
            this.value = momGene.value;
        }
    }


    willMuate() {
        return rand.uniform() < this.mutationRate;
    }

    randomVal() {
        return rand.uniform(1000);
    }

    inheritVal(momGene, dadGene) {
        return (momGene.value + dadGene.value) / 2
    }
}