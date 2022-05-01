import { directions } from "../constants.js";
import Sensor from './Sensor.js'

class Vector2d extends Sensor {
    constructor(dorg) {
        super(dorg);
    }

    gravity(target, r) {
        if (!target) return [0, 0];
        const source = this.source;
        let xGravity = r - Math.abs(target.col - source.col);
        let yGravity = r - Math.abs(target.row - source.col);
        return [xGravity, yGravity]
    }

    orient_(vector, target) {
        const source = this.source;
        switch(this.dorg.facing) {
            case directions.NORTH:
                vector[0] = (target.col > source.col) ? vector[0] : -vector[0];
                vector[1] = (target.row < source.row) ? vector[1] : -vector[1];
                break;
            case directions.EAST:
                vector[0] = (target.col > source.col) ? vector[0] : -vector[0];
                vector[1] = (target.row > source.row) ? vector[1] : -vector[1];
                break;
            case directions.SOUTH:
                vector[0] = (target.col < source.col) ? vector[0] : -vector[0];
                vector[1] = (target.row > source.row) ? vector[1] : -vector[1];
                break;
            case directions.WEST:
                vector[0] = (target.col < source.col) ? vector[0] : -vector[0];
                vector[1] = (target.row < source.row) ? vector[1] : -vector[1];
                break;
        }
    }

    normalize_(vector, norm) {
        vector[0] /= norm;
        vector[1] /= norm;
    }

    get source() {
        return this.dorg.cell;
    }
}

export default Vector2d;