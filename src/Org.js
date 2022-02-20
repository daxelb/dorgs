export default class Org {
  constructor(col, row, env, parents = null) {
    this.c = col;
    this.r = row;
    this.env = env;
  }

  updateGrid() {
    this.env.grid_map.setCellState(this.c, this.r, 'org');
    this.env.renderer.addToRender(this.env.grid_map.cellAt(this.c, this.r));
  }
}
