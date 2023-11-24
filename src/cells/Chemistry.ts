export default class Chemistry {
    carbon_dioxide: number
    oxygen: number
    water: number
    carbohydrate: number
    hydrogen_sulfide: number
    sulfur: number
    
    photons: number
    temperature: number



    constructor(carbon_dioxide: number = 0, oxygen: number = 0, water: number = 0, photons: number = 0, carbohydrate: number = 0, hydrogen_sulfide: number = 0, sulfur: number = 0) {
        this.carbon_dioxide = carbon_dioxide;
        this.oxygen = oxygen;
        this.water = water;
        this.photons = photons
        this.carbohydrate = carbohydrate
        this.hydrogen_sulfide = hydrogen_sulfide
        this.sulfur = sulfur
    }

    photosynthesis(num_mitochondria: number, energyCost: number) {
        this.carbon_dioxide -= num_mitochondria
        this.water -= num_mitochondria
        this.carbohydrate += num_mitochondria
        this.oxygen += num_mitochondria
        this.photons -= energyCost
    }

    chemosynthesis() {
        this.hydrogen_sulfide -= 18
        this.carbon_dioxide -= 6
        this.oxygen -= 3
        this.carbohydrate += 1
        this.water += 12
        this.sulfur += 18
    }




}