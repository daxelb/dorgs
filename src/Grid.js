import Cell from './Cell.js';

class Grid {
  constructor(cols, rows, cell_size) {
    this.resize(cols, rows, cell_size);
  }

  resize(cols, rows, cell_size) {
    this.grid = [];
    this.cols = cols;
    this.rows = rows;
    this.cell_size = cell_size;

    for (let c = 0; c < cols; c++) {
      let row = [];
      for (let r = 0; r < rows; r++) {
        row.push(new Cell(c, r, c * cell_size, r * cell_size));
      }
      this.grid.push(row);
    }
  }

  fillGrid(state) {
    for (let col of this.grid) {
      for (let cell of col) {
        cell.setState(state);
        cell.owner = null;
      }
    }
  }

  cellAt(col, row) {
    if (!this.isValidLoc(col, row)) {
      return null;
    }
    return this.grid[col][row];
  }

  clearCellAt(col, row) {
    if (!this.isValidLoc(col, row)) {
      return;
    }
    this.grid[col][row].setOwner(null);
  }

  setCellState(col, row, state) {
    if (!this.isValidLoc(col, row)) {
      return;
    }
    this.grid[col][row].setState(state);
  }

  setCellOwner(col, row, owner) {
    if (!this.isValidLoc(col, row)) {
      return;
    }
    this.grid[col][row].setOwner(owner);
  }

  isValidLoc(col, row) {
    return col < this.cols && row < this.rows && col >= 0 && row >= 0;
  }

  getCenter() {
    return [Math.floor(this.cols / 2), Math.floor(this.rows / 2)];
  }

  xyToColRow(x, y) {
    let c = Math.floor(x / this.cell_size);
    let r = Math.floor(y / this.cell_size);
    if (c >= this.cols) {
      c = this.cols - 1;
    } else if (c < 0) {
      c = 0;
    }
    if (r >= this.rows) {
      r = this.rows - 1;
    } else if (r < 0) {
      r = 0;
    }
    return [c, r];
  }
}

export default Grid;
