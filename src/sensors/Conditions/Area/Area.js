class Area {
    constructor(dorg, radius) {
        this.dorg = dorg;
        this.radius = radius;
    }

    get root() {
        return this.dorg.cell;
    }

    includes(cell) {
        return !!cell;
    }
}

export default Area;