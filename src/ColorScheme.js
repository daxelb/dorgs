const color_scheme = {
  empty: '#0E1318',
  food: '#F82380',
  org: '#60D4FF',
};

class ColorScheme {
  constructor(env) {
    this.env = env;
  }

  loadColorScheme() {
    for (let state of [new EmptyState(), new FoodState(), new OrgState()]) {
      state.color = color_scheme[state.name];
    }
    for (let cell_state in color_scheme) {
      $('#' + cell_state + '.cell-type ').css(
        'background-color',
        color_scheme[cell_state]
      );
      $('#' + cell_state + '.cell-legend-type').css(
        'background-color',
        color_scheme[cell_state]
      );
    }
    this.env.renderer.renderFullGrid(this.env.grid_map.grid);
  }
}

export default ColorScheme;
