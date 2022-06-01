import ChooseGene from '../ChooseGene.js';
import Gene from '../Gene.js';

export function geno(geneNames, momGeno = null, dadGeno = null) {
    let genes = {}, geneString, name, type;
    for (geneString of geneNames) {
        geneString = geneString.split(' ');
        name = geneString[0];
        type = geneString[1];
        if (type == "Choose" || momGeno?.name instanceof ChooseGene)
            genes[name] = new ChooseGene(0, momGeno?.[name], dadGeno?.[name])
        else
            genes[name] = new Gene(0, momGeno?.[name], dadGeno?.[name])
    }
    return genes;
}