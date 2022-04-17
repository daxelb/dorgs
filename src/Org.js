import { palette, hyperparams, random } from './constants.js';

class Org {
  constructor(col, row, env, parents = null) {
    this.color = palette.ORG;
    this.c = col;
    this.r = row;
    this.grid = env.grid;
    this.renderer = env.renderer;
    this.lifetime = 0;
    this.override = null;
    this.beingWatched = false;
  }

  update() {
    let choice;
    this.lifetime++;
    // console.log(this.override);

    if (this.beingWatched) {
      $('#x').html(this.c);
      $('#y').html(this.r);
      $('#lifetime').html(this.lifetime);
      if (this.override != null) {
        console.log(this.override);
        choice = this.override;
      } else {
        choice = this.actRandom();
      }
    } else {
      choice = this.actRandom();
    }
    this.override = null;
    this.do(choice);
    this.updateGrid();
  }

  getCell() {
    return this.grid.cellAt(this.c, this.r);
  }

  updateGrid() {
    this.grid.setCellOwner(this.c, this.r, this);
    this.renderer.addToRender(this.getCell());
  }

  clearCell() {
    const cell = this.grid.cellAt(this.c, this.r);
    cell.clear();
    this.renderer.addToRender(cell);
  }

  do(direction) {
    if (direction == 'up' && this.grid.cellAt(this.c, this.r - 1)?.isEmpty()) {
      this.clearCell();
      this.r--;
    } else if (direction == 'left' && this.grid.cellAt(this.c - 1, this.r)?.isEmpty()) {
      this.clearCell();
      this.c--;
    } else if (direction == 'down' && this.grid.cellAt(this.c, this.r + 1)?.isEmpty()) {
      this.clearCell();
      this.r++;
    } else if (direction == 'right' && this.grid.cellAt(this.c + 1, this.r)?.isEmpty()) {
      this.clearCell();
      this.c++;
    }
  }

  actRandom() {
    return random.pickone(hyperparams.ACTIONS);
  }
}

export default Org;
