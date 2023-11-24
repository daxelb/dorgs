class Atmosphere {
    oxygen: number
    dayLength: number
    sunMult: number
    moonMult: number
    sunlight: number
    moonlight: number
    moisture: number

    constructor(dayLength: number = 10, sunlightMultiplier: number, moonlightMultiplier: number) {
        this.oxygen = 0;
        this.dayLength = dayLength;
        this.sunMult = sunlightMultiplier;
        this.moonMult = moonlightMultiplier;
        this.moisture = moisture
    }

    getSunlight(ticks: number) {
        return Math.max(
            0,
            this.sunMult * (Math.sin((Math.PI * ticks) / this.dayLength))
        );
    }

    getMoonlight(ticks: number) {
        return Math.max(
            0,
            this.moonMult * -(Math.sin((Math.PI * ticks) / this.dayLength))
        );
    }

    update(ticks) {
        this.sunlight = this.getSunlight(ticks)
        this.moonlight = this.getMoonlight(ticks)

    }
}