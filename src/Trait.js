class ColorTrait {
    constructor(mutationRate, momTrait = null, dadTrait = null) {
        this.mutationRate = mutationRate
        if (this.willMutate()) {
            this.value = this.randomVal();
        } else if (!momGene && !dadGene) {
            this.value = this.inheritVal(momGene, dadGene)
        } else if (!momGene && !!dadGene) {
            this.value = momGene.value;
        }
    }
}