import Renderer from './Renderer.js';
import GridMap from './GridMap.js';
import Org from './Org.js';
import Controller from './Controller.js';

class Environment {
  constructor(cell_size) {
    this.renderer = new Renderer('env-canvas', 'env', cell_size);
    this.controller = new Controller(this, this.renderer.canvas);
    this.num_rows = Math.ceil(this.renderer.height / cell_size);
    this.num_cols = Math.ceil(this.renderer.width / cell_size);
    this.grid_map = new GridMap(this.num_cols, this.num_rows, cell_size);
    this.orgs = [];
    this.total_ticks = 0;
  }

  update() {
    this.total_ticks++;
    for (let org of this.orgs) {
      org.update();
    }
  }

  render() {
    this.renderer.renderCells();
    this.renderer.renderHighlights();
  }

  renderFull() {
    this.renderer.renderFullGrid(this.grid_map.grid);
  }

  OriginOfLife() {
    let center = this.grid_map.getCenter();
    let org = new Org(center[0], center[1], this);
    this.addOrg(org);
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
}

export default Environment;
