import Entity from './Entity';
// import MyChemistry from './cells/MyChemistry';
import Environment from './Environment';
import { random } from './constants'
// const massMetabolicRate

enum Direction {
    North,
    NorthEast,
    East,
    SouthEast,
    South,
    SoutWest,
    West,
    NorthWest
}
const reproduceChance = {
    North: 0.5,
    NorthEast: 0.2,
    East: 0.5,
    SouthEast: 0.2,
    South: 0.5,
    SouthWest: 0.2,
    West: 0.5,
    NorthWest: 0.2
}

const sumValues = (d: object): number => Object.values(d).reduce((a, b) => a + b);


function normalize(d: object) {
    const total: number = sumValues(d);
    for (const key in d) {
        d[key] /= total
    }
}


export default class Green extends Entity {
    chemistry: { [chemical: string]: number };
    energy: number;
    age: number;
    mass: number;

    constructor(col: number, row: number, env: Environment, mass: number, startEnergy = 0) {
        super(col, row, env)
        this.energy = startEnergy;
        this.age = 0;
        this.mass = mass;
    }


    getSpawnLocation() {
        const spawnLocations = random.shuffleWeighted(reproduceChance)
        const validLocations = this.env.grid.getAllEmptyNeighbors(this.cell)
        let spawnLocation = null
        while (spawnLocation === null || !(spawnLocation in validLocations)) {
            spawnLocation = spawnLocations.shift()
        }
        return spawnLocation
    }

    updateEnergy(sunlight: number): void {
        // this.energy += sunlight - this.getMetabolicRate()
    }
    
    metabolize(): void {
        this.energy -= this.mass * massMetabolicRate
    }


    /**
    get next spawn cell:
        valid spawn locations = [cell for cell in legaladjacentcells if cell is unoccupied]
        
        ordered reproduce spots = sorted(reproduceSpots by value, random tiebreak)
        
        next reproduce spot = pop from beginning of  ordered reproduce spots
        return

    
    
    
     */


}
