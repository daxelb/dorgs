import { palette } from './constants.js';

class Melon {
  constructor(col, row, env) {
    this.color = palette.MELON;
    this.c = col;
    this.r = row;
    this.env = env;
    this.amount = 100;
  }

  getCell() {
    return this.env.grid.cellAt(this.c, this.r);
  }

  update() {
    this.updateGrid();
  }

  updateGrid() {
    this.env.grid.setCellOwner(this.c, this.r, this);
    this.env.renderer.addToRender(this.getCell());
  }
}

export default Melon;
