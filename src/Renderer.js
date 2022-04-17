import { palette } from './constants.js';
class Renderer {
  constructor(canvas_id, container_id, cell_size) {
    this.cell_size = cell_size;
    this.canvas = document.getElementById(canvas_id);
    this.ctx = this.canvas.getContext('2d');
    this.fillWindow(container_id);
    this.height = this.canvas.height;
    this.width = this.canvas.width;
    this.cells_to_render = new Set();
    this.highlighted_dorg = null;
  }

  fillWindow(container_id) {
    this.fillShape($('#' + container_id).height(), $('#' + container_id).width());
  }

  fillShape(height, width) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.height = this.canvas.height;
    this.width = this.canvas.width;
  }

  clear() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.height, this.width);
  }

  renderFullGrid(grid) {
    for (let col of grid) {
      for (let cell of col) {
        this.renderCell(cell);
      }
    }
  }

  renderCells() {
    for (let cell of this.cells_to_render) {
      this.renderCell(cell);
    }
    this.cells_to_render.clear();
  }

  renderCell(cell) {
    this.ctx.fillStyle = cell.color;
    this.ctx.fillRect(cell.x, cell.y, this.cell_size, this.cell_size);
  }

  addToRender(cell) {
    this.cells_to_render.add(cell);
  }

  highlightDorg(dorg) {
    this.highlighted_dorg = dorg;
  }

  renderHighlight() {
    if (this.highlighted_dorg) {
      const color = this.highlighted_dorg.override ? palette.OVERRIDE : palette.HIGHLIGHT;
      const cell = this.highlighted_dorg.getCell();
      this.ctx.fillStyle = color;
      this.ctx.fillRect(cell.x, cell.y, this.cell_size, this.cell_size);
    }
  }
  clearHighlight() {
    const color = this.highlighted_dorg.color;
    const cell = this.highlighted_dorg.getCell();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(cell.x, cell.y, this.cell_size, this.cell_size);
  }
}

export default Renderer;
