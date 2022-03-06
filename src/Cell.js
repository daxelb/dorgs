// const EmptyState = Symbol('empty');
// const FoodState = Symbol('food');
// const OrgState = Symbol('org');

const color_scheme = {
  empty: '#0E1318',
  food: '#F82380',
  org: '#60D4FF',
};

class Cell {
  constructor(state, col, row, x, y) {
    this.owner = null;
    this.setState(state);
    this.col = col;
    this.row = row;
    this.x = x;
    this.y = y;
  }

  setOwner(new_owner) {
    this.owner = new_owner;
  }

  setState(state) {
    this.state = state;
    this.color = color_scheme[state];
  }
}

export default Cell;
