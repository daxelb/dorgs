import { palette, hyperparams, random } from './constants.js';
import { range } from './neat/utils.js';
import Entity from './Entity.js';

class Dorg extends Entity {
  constructor(col, row, env, parents = null) {
    super(col, row, env);
    this.color = palette.ORG;
    this.grid = env.grid;
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
    return random.choice(hyperparams.ACTIONS);
  }

  see() {
    let foodLoc = this.sightRange;
    for (let [c, r] of this.seeHelper()) {
      if (this.grid.cellAt(c, r)) {
      }
    }
  }

  /**
   * Manhattan distance
   * @param {*} c
   * @param {*} r
   * @returns
   */
  distanceTo(c, r) {
    return Math.abs(this.c - c) + Math.abs(this.r - r);
  }

  *seeHelper() {
    for (let r of range(this.r - 2, this.r + 3)) {
      for (let c of range(this.c - 2, this.r + 3)) {
        yield [c, r];
      }
    }
  }
}

export default Dorg;
