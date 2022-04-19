import { palette, hyperparams, random } from './constants.js';
import { range } from './neat/utils.js';
import Entity from './Entity.js';
import Melon from './Melon.js'

class Dorg extends Entity {
  constructor(col, row, env, parents = null) {
    super(col, row, env);
    this.color = palette.ORG;
    this.grid = env.grid;
    this.lifetime = 0;
    this.override = null;
    this.food = 0;
    this.beingWatched = false;
  }

  update() {
    let choice;
    this.lifetime++;

    if (this.beingWatched) {
      $('#x').html(this.c);
      $('#y').html(this.r);
      $('#lifetime').html(this.lifetime);
      $('#food').html(this.food);
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

  getLegalActions() {
    let legalActions = [];
    if (this.r + 1 < this.grid.rows)
      legalActions.push('down')
    if (this.r - 1 >= 0)
      legalActions.push('up')
    if (this.c + 1 < this.grid.cols)
      legalActions.push('right')
    if (this.c - 1 >= 0)
      legalActions.push('left')
    return legalActions
  }

  tryEat() {
    const cell = this.grid.cellAt(this.c, this.r)
    if (cell.owner instanceof Melon) {
      const melon = cell.owner;
      this.food += melon.amount
      melon.amount = 0
      cell.owner = this
    }
  }

  onMelon() {
    return this.grid.cellAt(this.c, this.r).hasMelon()
  }

  eatMelon() {
    this.food += this.grid.cellAt
  }
  
  canMove(direction) {
    return this.getLegalActions().includes(direction)
  }

  do(direction) {
    if (!this.canMove(direction)) {
      return
    }
    if (direction == 'up') {
      this.clearCell();
      this.r--;
    } else if (direction == 'left') {
      this.clearCell();
      this.c--;
    } else if (direction == 'down') {
      this.clearCell();
      this.r++;
    } else if (direction == 'right' ) {
      this.clearCell();
      this.c++;
    }
    this.tryEat()
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
