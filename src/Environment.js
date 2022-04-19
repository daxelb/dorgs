import Renderer from './Renderer.js';
import Grid from './Grid.js';
import Dorg from './Dorg.js';
import Controller from './Controller.js';
import Melon from './Melon.js';
import { random, growChance } from './constants.js';
import { range } from './neat/utils.js';

class Environment {
  constructor(cell_size) {
    this.renderer = new Renderer('env-canvas', 'env', cell_size);
    this.num_rows = Math.ceil(this.renderer.height / cell_size);
    this.num_cols = Math.ceil(this.renderer.width / cell_size);
    this.grid = new Grid(this.num_cols, this.num_rows, cell_size);
    this.dorgs = [];
    this.total_ticks = 0;
    this.controller = new Controller(this, this.renderer.canvas);
  }

  growMelon() {
    let x, y;
    do {
      x = random.sample([...range(this.num_cols)])
      y = random.sample([...range(this.num_rows)])
    } while (!this.grid.cellAt(x, y).isEmpty())
    const melon = new Melon(x, y, this)
    this.addMelon(melon)
  }

  update() {
    this.total_ticks++;
    if (random.random() < growChance) {
      this.growMelon()
    }
    for (let dorg of this.dorgs) {
      dorg.update();
    }
  }

  render() {
    this.renderer.renderCells();
    this.renderer.renderHighlight();
  }

  renderFull() {
    this.renderer.renderFullGrid(this.grid.grid);
  }

  addDorgs(n) {
    let x, y;
    const ycors = random.sample([...range(this.num_rows)], n)
    const xcors = random.sample([...range(this.num_cols)], n)
    for (let i = 0; i < n; i++) {
      x = xcors[i], y = ycors[i]
      this.addDorg(new Dorg(x, y, this))
    }
  }

  simpleOrigin() {
    let center = this.grid.getCenter();
    let dorg = new Dorg(center[0], center[1], this);
    this.addDorg(dorg);
    this.addMelon(new Melon(center[0] + 1, center[1] + 1, this));
  }

  origin() {
    // let center = this.grid.getCenter();
    // let dorg = new Dorg(center[0], center[1], this);
    // this.addDorg(dorg);
    this.addDorgs(10)
    // this.addMelon(new Melon(center[0] + 1, center[1] + 1, this));
  }

  addDorg(dorg) {
    dorg.updateGrid();
    this.dorgs.push(dorg);
  }

  removeDorg(dorg_indeces) {
    let start_pop = this.dorganisms.length;
    for (let i of dorg_indeces.reverses()) {
      this.dorgs.splice(i, 1);
    }
  }

  addMelon(melon) {
    melon.updateGrid();
  }
}

export default Environment;
