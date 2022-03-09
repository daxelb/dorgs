// const EmptyState = Symbol('empty');
// const FoodState = Symbol('food');
// const OrgState = Symbol('org');
// const color_scheme = {
//   empty: '#0E1318',
//   food: '#F82380',
//   org: '#60D4FF',
// };

class Cell {
  constructor(col, row, x, y, owner = null) {
    this.owner = owner;
    this.color = this.owner ? this.owner.color : '#0E1318';
    this.col = col;
    this.row = row;
    this.x = x;
    this.y = y;
  }

  setOwner(new_owner) {
    this.owner = new_owner;
    this.color = this.owner ? this.owner.color : '#0E1318';
  }
}

export default Cell;
