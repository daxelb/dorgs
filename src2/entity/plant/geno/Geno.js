import {rand, PLANT_GENE_NAMES as GENE_NAMES } from "Utils/Utils.js"
import Gene from "./Geno.js"

// Genotype
class Geno {
    constructor(geneNames, momGeno = null, dadGeno = null) {
        self.geneNames = geneNames;
        self.traits = {}
        for (gName of self.geneNames) {
            self.traits[gName] = new Gene(momGeno?.[gName], dadGeno?.[gName]);
        }
    }

    initGenesAsexually() {
        let traits  = {}
        for (geneName of self.geneNames) {
            traits[geneName] = new Gene()
        }
    }

    initGenesSexually(momGeno, dadGeno) {
        let traits = {}
        for (geneName of self.geneNames) {
            // not done
            traits[geneName] = true ? (momGeno[geneName] + dadGeno[geneName]) / 2 : rand.integer(1000)
        }

        return 
    }

    initGenes(mom, dad) {
        if (!!mom && !!dad) {
        }

    }



    // generate() {
    //     self.booger = // nutrient/hormone 1
    //         self.loogey =  // nutrient/hormone 2
    //         self.fruitColor
    //     self.fruitColora
    //     self.fruitGrowthRate
    //     self.fruitContribution = // how much the plant gives to its fruit
    // }
        
}

export default Geno;