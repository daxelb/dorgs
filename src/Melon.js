import { palette } from './constants.js';
import Entity from './Entity.js';

class Melon extends Entity {
  constructor(col, row, env) {
    super(col, row, env);
    this.color = palette.MELON;
    this.amount = 100;
  }
}

export default Melon;
