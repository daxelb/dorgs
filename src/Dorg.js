import { palette, random, directions, moves } from './constants.js';
import { range } from './neat/utils.js';
import Entity from './Entity.js';
import Melon from './Melon.js'
import Nearest from './sensors/Nearest.js';
import Manhattan from './sensors/Conditions/Area/Manhattan.js';

class Dorg extends Entity {
  constructor(idx, col, row, env, parents = null) {
    super(col, row, env);
    this.idx = idx;
    this.color = palette.DORG;
    this.grid = env.grid;
    this.lifetime = 0;
    this.override = null;
    this.food = 0;
    this.beingWatched = false;
    this.facing = directions.NORTH;
    this.sensors = []
    if (idx == 1) {
      this.sensors.push(new Nearest(this, Melon, new Manhattan(this, 5)))
    }
  }

  updateFacing(move) {
    switch(move) {
      case (moves.FORWARD):
        // console.log('forward!')
        break;
      case (moves.LEFT):
        this.facing = (this.facing + 1) % Object.keys(directions).length;
        break;
      case (moves.RIGHT):
        this.facing = (this.facing - 1) % Object.keys(directions).length;
        break;
      case (moves.BACKWARD):
        this.facing = (this.facing + 2) % Object.keys(directions).length;
        break;
    }
  }

  update() {
    let choice;
    this.lifetime++;

    if (this.beingWatched) {
      $('#profile-bar').html(`dorg_${this.idx}`);
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
    if (this.idx == 1)
      // console.log(this.sensors[0].sense());
    this.updateGrid();
  }

  getValidDirections() {
    let validDirections = [];
    if (this.r + 1 < this.grid.rows)
      validDirections.push(directions.SOUTH)
    if (this.r - 1 >= 0)
      validDirections.push(directions.NORTH)
    if (this.c + 1 < this.grid.cols)
      validDirections.push(directions.EAST)
    if (this.c - 1 >= 0)
      validDirections.push(directions.WEST)
    return validDirections
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

  get cell() {
    return this.grid.cellAt(this.c, this.r);
  }

  onMelon() {
    return this.cell().hasMelon()
  }
  
  canMove(direction) {
    return this.getValidDirections().includes(direction)
  }

  do(move) {
    this.updateFacing(move);
    if (!this.canMove(this.facing)) {
      return
    }
    this.clearCell();
    switch (this.facing) {
      case directions.NORTH:
        this.r--;
        break;
      case directions.EAST:
        this.c--;
        break;
      case directions.SOUTH:
        this.r++;
        break;
      case directions.WEST:
        this.c++;
        break;
    }
    this.tryEat()
  }

  actRandom() {
    return random.choice(Object.values(moves));
  }
}

export default Dorg;
