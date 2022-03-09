class Org {
  constructor(col, row, env, parents = null) {
    this.color = '#60D4FF';
    this.c = col;
    this.r = row;
    this.env = env;
    this.lifetime = 0;
    this.override = false;
  }

  getCell() {
    return this.env.grid_map.cellAt(this.c, this.r);
  }

  update() {
    this.lifetime++;
    this.updateGrid();
  }

  updateGrid() {
    this.env.grid_map.setCellOwner(this.c, this.r, this);
    this.env.renderer.addToRender(this.getCell());
  }

  move(direction) {
    console.log(direction);
    this.env.grid_map.setCellOwner(this.c, this.r, null);
    this.env.renderer.addToRender(this.getCell());
    switch (direction) {
      case 'up':
        this.r--;
        break;
      case 'left':
        this.c--;
        break;
      case 'right':
        this.c++;
        break;
      case 'down':
        this.r++;
        break;
    }
    this.update();
  }
}

export default Org;
