import { palette } from './constants.js';

class Cell {
  constructor(col, row, x, y, owner = null) {
    this.owner = owner;
    this.color = this.owner ? this.owner.color : palette.EMPTY;
    this.col = col;
    this.row = row;
    this.x = x;
    this.y = y;
  }
  
  setOwner(new_owner) {
    this.owner = new_owner;
    this.color = this.owner ? this.owner.color : palette.EMPTY;
  }

  isEmpty() {
    return this.owner == null;
  }

  hasFood() {
    return typeof this.owner === "Melon" 
  }

  clear() {
    this.setOwner(null);
  }
}

export default Cell;
