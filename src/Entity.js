// this name is mad boring
class Entity {
  constructor(col, row, env) {
    this.c = col;
    this.r = row;
    this.env = env;
  }

  update() {
    this.updateGrid();
  }

  getCell() {
    return this.env.grid.cellAt(this.c, this.r);
  }

  updateGrid() {
    this.env.grid.setCellOwner(this.c, this.r, this);
    this.env.renderer.addToRender(this.getCell());
  }

  clearCell() {
    const cell = this.env.grid.cellAt(this.c, this.r);
    cell.clear();
    this.env.renderer.addToRender(cell);
  }

  isMelon() {
    return this instanceof Melon
  }
}

export default Entity;
