// import {PLANT_MUTATION_RATE} from "Utils/constants.js";

class PlantGene extends Gene {
    constructor(momGene, dadGene) {
        super(PLANT_MUTATION_RATE, momGene, dadGene);
    }
}