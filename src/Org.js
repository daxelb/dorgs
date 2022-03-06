class Org {
  constructor(col, row, env, parents = null) {
    this.c = col;
    this.r = row;
    this.env = env;
  }

  updateGrid() {
    console.log("!")
    this.env.grid_map.setCellState(this.c, this.r, 'org');
    this.env.grid_map.setCellOwner(this.c, this.r, this);
    this.env.renderer.addToRender(this.env.grid_map.cellAt(this.c, this.r));
  }
  
  toString() {
    return "askjd"
  }
}

export default Org;