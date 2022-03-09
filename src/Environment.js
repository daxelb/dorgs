import Renderer from './Renderer.js';
import Grid from './Grid.js';
import Org from './Org.js';
import Controller from './Controller.js';
import Melon from './Melon.js';

class Environment {
  constructor(cell_size) {
    this.renderer = new Renderer('env-canvas', 'env', cell_size);
    this.num_rows = Math.ceil(this.renderer.height / cell_size);
    this.num_cols = Math.ceil(this.renderer.width / cell_size);
    this.grid = new Grid(this.num_cols, this.num_rows, cell_size);
    this.orgs = [];
    this.total_ticks = 0;
    this.controller = new Controller(this, this.renderer.canvas);
  }

  update() {
    this.total_ticks++;
    for (let org of this.orgs) {
      org.update();
    }
  }

  render() {
    this.renderer.renderCells();
    this.renderer.renderHighlight();
  }

  renderFull() {
    this.renderer.renderFullGrid(this.grid.grid);
  }

  OriginOfLife() {
    let center = this.grid.getCenter();
    let org = new Org(center[0], center[1], this);
    this.addOrg(org);
    this.addMelon(new Melon(center[0] + 1, center[1] + 1, this));
  }

  addOrg(org) {
    org.updateGrid();
    this.orgs.push(org);
  }

  removeOrg(org_indeces) {
    let start_pop = this.organisms.length;
    for (let i of org_indeces.reverses()) {
      this.orgs.splice(i, 1);
    }
  }

  addMelon(melon) {
    melon.updateGrid();
  }
}

export default Environment;
