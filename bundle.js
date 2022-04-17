(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(require('chance'))
    : typeof define === 'function' && define.amd
    ? define(['chance'], factory)
    : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self), factory(global.chance));
})(this, function (chance) {
  'use strict';

  const palette = {
    HIGHLIGHT: 'rgb(255,0,0)',
    OVERRIDE: '#00ff00',
    EMPTY: '#0E1318',
    MELON: 'rgb(255,154,77)',
    ORG: '#60D4FF',
  };

  const hyperparams = {
    CELL_SIZE: 32,
    ACTIONS: ['up', 'down', 'left', 'right'],
  };

  const random = new chance.Chance();

  // export const mutationProbs = {
  //   "weights": 0.8,
  //   "weight_perturbed": 0.9, // random that a weight is uniformly perturbed if weight is mutated
  //   "weight_randomized": 0.1, // random that a weight is given a new random value if the weight is mutated
  //   "disabled": 0.75, //disabled if disabled in either parent
  //   "no_crossover": 0.25, // 25% of offspring resulted from mutation without crossover
  //   "interspecies_mating_rate": 0.001,
  //   "new_node_smaller_population": 0.03,
  //   "new_link_smaller_population": 0.05,
  //   "new_link_larger": 0.3,
  //   "defaultActivation": modifiedSigmoidalTransfer
  // }

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

  class Cell {
    constructor(col, row, x, y, owner = null) {
      this.owner = owner;
      this.color = this.owner ? this.owner.color : palette.EMPTY;
      this.col = col;
      this.row = row;
      this.x = x;
      this.y = y;
    }

    setOwner(new_owner) {
      this.owner = new_owner;
      this.color = this.owner ? this.owner.color : palette.EMPTY;
    }

    isEmpty() {
      return this.owner == null;
    }

    clear() {
      this.setOwner(null);
    }
  }

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

  function* range(...args) {
    let [start, stop, step] = [null, null, null];
    if (args.length == 3) [start, stop, step] = args;
    else if (args.length == 2) [start, stop, step] = [args[0], args[1], 1];
    else if (args.length == 1) [start, stop, step] = [0, args[0], 1];
    for (let i = start; i < stop; i += step) yield i;
  }

  class Dorg extends Entity {
    constructor(col, row, env, parents = null) {
      super(col, row, env);
      this.color = palette.ORG;
      this.grid = env.grid;
      this.renderer = env.renderer;
      this.lifetime = 0;
      this.override = null;
      this.beingWatched = false;
    }

    update() {
      let choice;
      this.lifetime++;
      // console.log(this.override);

      if (this.beingWatched) {
        $('#x').html(this.c);
        $('#y').html(this.r);
        $('#lifetime').html(this.lifetime);
        if (this.override != null) {
          console.log(this.override);
          choice = this.override;
        } else {
          choice = this.actRandom();
        }
      } else {
        choice = this.actRandom();
      }
      this.override = null;
      this.do(choice);
      this.updateGrid();
    }

    clearCell() {
      const cell = this.grid.cellAt(this.c, this.r);
      cell.clear();
      this.renderer.addToRender(cell);
    }

    do(direction) {
      if (direction == 'up' && this.grid.cellAt(this.c, this.r - 1)?.isEmpty()) {
        this.clearCell();
        this.r--;
      } else if (direction == 'left' && this.grid.cellAt(this.c - 1, this.r)?.isEmpty()) {
        this.clearCell();
        this.c--;
      } else if (direction == 'down' && this.grid.cellAt(this.c, this.r + 1)?.isEmpty()) {
        this.clearCell();
        this.r++;
      } else if (direction == 'right' && this.grid.cellAt(this.c + 1, this.r)?.isEmpty()) {
        this.clearCell();
        this.c++;
      }
    }

    actRandom() {
      return random.choice(hyperparams.ACTIONS);
    }

    see() {
      this.sightRange;
      for (let [c, r] of this.seeHelper()) {
        if (this.grid.cellAt(c, r));
      }
    }

    /**
     * Manhattan distance
     * @param {*} c
     * @param {*} r
     * @returns
     */
    distanceTo(c, r) {
      return Math.abs(this.c - c) + Math.abs(this.r - r);
    }

    *seeHelper() {
      for (let r of range(this.r - 2, this.r + 3)) {
        for (let c of range(this.c - 2, this.r + 3)) {
          yield [c, r];
        }
      }
    }
  }

  class Profile {
    constructor(dorg = null) {
      this.dorg = dorg;
      this.element = document.getElementById('dorg-prof');
      this.updateKeyListener();
    }

    handleKeyInput = (e) => {
      if (e.key == 'ArrowUp' || e.key == 'w') {
        this.dorg.override = 'up';
      } else if (e.key == 'ArrowLeft' || e.key == 'a') {
        this.dorg.override = 'left';
      } else if (e.key == 'ArrowDown' || e.key == 's') {
        this.dorg.override = 'down';
      } else if (e.key == 'ArrowRight' || e.key == 'd') {
        this.dorg.override = 'right';
      }
      this.updateElement();
    };

    updateKeyListener() {
      if (this.dorg && this.dorg.beingWatched) {
        document.addEventListener('keydown', this.handleKeyInput);
      } else {
        $('#override').css('opacity', 1);
        document.removeEventListener('keydown', this.handleKeyInput);
      }
    }

    changeDorg(dorg) {
      if (this.dorg) this.dorg.beingWatched = false;
      if (dorg) dorg.beingWatched = true;
      this.dorg = dorg;
      this.updateKeyListener();
      this.updateElement();
    }

    on() {
      return !!this.dorg;
    }

    display() {
      if (this.on()) {
        $('#dorg-prof').animate({ height: '75vh', opacity: '1' }, 200).show();
      } else {
        this.element.style.display = 'none';
        this.element.style.height = '0vh';
        this.element.style.opacity = '0';
      }
    }

    updateElement() {
      if (!this.on()) {
        return;
      }
      $('#x').html(this.dorg.c);
      $('#y').html(this.dorg.r);
      $('#lifetime').html(this.dorg.lifetime);
    }
  }

  class Melon extends Entity {
    constructor(col, row, env) {
      super(col, row, env);
      this.color = palette.MELON;
      this.amount = 100;
    }
  }

  class Controller {
    constructor(env, canvas) {
      this.renderer = env.renderer;
      this.grid = env.grid;
      this.canvas = canvas;
      this.mouse_x;
      this.mouse_y;
      this.mouse_c;
      this.mouse_r;
      this.left_click = false;
      this.middle_click = false;
      this.right_click = false;
      this.scale = 1;
      this.highlighted_dorg = null;
      this.defineEvents();
      this.profile = new Profile();
    }

    defineEvents() {
      this.canvas.addEventListener('mousemove', (e) => {
        this.updateMouseLocation(e.offsetX, e.offsetY);
        this.mouseMove();
      });

      this.canvas.addEventListener('mouseup', (e) => {
        e.preventDefault();
        this.updateMouseLocation(e.offsetX, e.offsetY);
        if (e.button == 0) this.left_click = false;
        if (e.button == 1) this.middle_click = false;
        if (e.button == 2) this.right_click = false;
        this.mouseUp();
      });

      this.canvas.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (e.button == 0) this.left_click = true;
        if (e.button == 1) this.middle_click = true;
        if (e.button == 2) this.right_click = true;
        this.updateMouseLocation(e.offsetX, e.offsetY);
        this.mouseDown();
      });

      this.canvas.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });

      this.canvas.addEventListener('mouseleave', (e) => {
        this.left_click = false;
        this.middle_click = false;
        this.right_click = false;
      });

      this.canvas.addEventListener('mouseenter', (e) => {
        this.left_click = !!(e.buttons & 1);
        this.middle_click = !!(e.buttons & 4);
        this.right_click = !!(e.buttons & 2);
        this.updateMouseLocation(e.offsetX, e.offsetY);
        this.start_x = this.mouse_x;
        this.start_y = this.mouse_y;
      });

      this.canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        this.updateMouseLocation(e.offsetX, e.offsetY);
        this.zoom(-Math.sign(e.deltaY));
      });
    }

    zoom(sign) {
      let scale = 1;
      let zoom_speed = 0.3;

      // Restrict scale
      scale = Math.max(0.69, this.scale + sign * zoom_speed);

      let curr_left = parseInt(this.getStyle('left'));
      let curr_top = parseInt(this.getStyle('top'));
      let diff_x = (this.canvas.width / 2 - this.mouse_x) * (scale - this.scale);
      let diff_y = (this.canvas.height / 2 - this.mouse_y) * (scale - this.scale);

      // Apply scale transform
      this.setStyle('left', curr_left + diff_x + 'px');
      this.setStyle('top', curr_top + diff_y + 'px');
      this.setStyle('transform', `scale(${scale})`);
      this.scale = scale;
    }

    getStyle(prop) {
      return $(`#${this.canvas.id}`).css(prop);
    }

    setStyle(prop, ass) {
      $(`#${this.canvas.id}`).css(prop, ass);
    }

    performAction() {
      if (this.left_click) {
        const clicked = this.grid.cellAt(this.mouse_c, this.mouse_r).owner;
        if (clicked instanceof Melon) {
          console.log(clicked.amount);
          return;
        }
        if (!clicked && this.highlighted_dorg) this.renderer.clearHighlight();
        this.highlighted_dorg = clicked;
        this.renderer.highlightDorg(this.highlighted_dorg);
        this.profile.changeDorg(this.highlighted_dorg);
        this.profile.display();
      }
      if (this.middle_click) {
        //drag on middle click
        const curr_left = parseInt(this.getStyle('left'));
        const curr_top = parseInt(this.getStyle('top'));
        const diff_x = (this.mouse_x - this.start_x) * this.scale;
        const diff_y = (this.mouse_y - this.start_y) * this.scale;
        this.setStyle('left', curr_left + diff_x + 'px');
        this.setStyle('top', curr_top + diff_y + 'px');
      }
    }

    updateMouseLocation(offsetX, offsetY) {
      this.mouse_x = offsetX;
      this.mouse_y = offsetY;
      let colRow = this.grid.xyToColRow(this.mouse_x, this.mouse_y);
      this.mouse_c = colRow[0];
      this.mouse_r = colRow[1];
    }

    mouseMove() {
      this.performAction();
    }

    mouseUp() {}

    mouseDown() {
      this.start_x = this.mouse_x;
      this.start_y = this.mouse_y;
      this.performAction();
    }
  }

  class Environment {
    constructor(cell_size) {
      this.renderer = new Renderer('env-canvas', 'env', cell_size);
      this.num_rows = Math.ceil(this.renderer.height / cell_size);
      this.num_cols = Math.ceil(this.renderer.width / cell_size);
      this.grid = new Grid(this.num_cols, this.num_rows, cell_size);
      this.dorgs = [];
      this.total_ticks = 0;
      this.controller = new Controller(this, this.renderer.canvas);
    }

    update() {
      this.total_ticks++;
      for (let dorg of this.dorgs) {
        dorg.update();
      }
    }

    render() {
      this.renderer.renderCells();
      this.renderer.renderHighlight();
    }

    renderFull() {
      this.renderer.renderFullGrid(this.grid.grid);
    }

    OriginOfLife() {
      let center = this.grid.getCenter();
      let dorg = new Dorg(center[0], center[1], this);
      this.addDorg(dorg);
      this.addMelon(new Melon(center[0] + 1, center[1] + 1, this));
    }

    addDorg(dorg) {
      dorg.updateGrid();
      this.dorgs.push(dorg);
    }

    removeDorg(dorg_indeces) {
      this.dorganisms.length;
      for (let i of dorg_indeces.reverses()) {
        this.dorgs.splice(i, 1);
      }
    }

    addMelon(melon) {
      melon.updateGrid();
    }
  }

  const min_render_speed = 1000;

  class Engine {
    constructor() {
      this.fps = 1000;
      this.env = new Environment(hyperparams.CELL_SIZE);
      // this.palettecheme = new palettecheme(this.env);
      // this.palettecheme.loadpalettecheme();
      this.env.OriginOfLife();

      this.sim_last_update = Date.now();
      this.sim_delta_time = 0;

      this.ui_last_update = Date.now();
      this.ui_delta_time = 0;

      this.actual_fps = 0;
      this.running = false;
    }

    start(fps = 1000) {
      if (fps <= 0) {
        fps = 1;
      }
      this.fps = fps;
      this.sim_loop = setInterval(() => {
        this.updateSimDeltaTime();
        this.environmentUpdate();
      }, 1000 / fps);
      this.running = true;
      if (this.fps >= min_render_speed) {
        if (this.ui_loop != null) {
          clearInterval(this.ui_loop);
          this.ui_loop = null;
        }
      } else {
        this.setUiLoop();
      }
    }

    stop() {
      clearInterval(this.sim_loop);
      this.running = false;
      this.setUiLoop();
    }

    restart(fps) {
      clearInterval(this.sim_loop);
      this.start(fps);
    }

    setUiLoop() {
      if (!this.ui_loop) {
        this.ui_loop = setInterval(() => {
          this.updateUIDeltaTime();
          this.necessaryUpdate();
        }, 1000 / min_render_speed);
      }
    }

    updateSimDeltaTime() {
      this.sim_delta_time = Date.now() - this.sim_last_update;
      this.sim_last_update = Date.now();
      if (!this.ui_loop) {
        this.ui_delta_time = this.sim_delta_time;
      }
    }

    updateUIDeltaTime() {
      this.ui_delta_time = Date.now() - this.ui_last_update;
      this.ui_last_update = Date.now();
    }

    environmentUpdate() {
      this.actual_fps = 1000 / this.sim_delta_time;
      this.env.update(this.sim_delta_time);
      if (this.ui_loop == null) {
        this.necessaryUpdate();
      }
    }

    necessaryUpdate() {
      this.env.render();
      // this.controlpanel.update(this.ui_delta_time);
      // this.dorganism_editor.update();
    }
  }

  function newConsole() {
    const { parse: $parse, stringify: $stringify } = JSON;

    const noop = (_, value) => value;

    const set = (known, input, value) => {
      const index = Primitive(input.push(value) - 1);
      known.set(value, index);
      return index;
    };

    const Primitive = String; // it could be Number
    const primitive = 'string'; // it could be 'number'
    const object = 'object';

    const stringify = (value, replacer, space) => {
      const $ =
        replacer && typeof replacer === object
          ? (k, v) => (k === '' || -1 < replacer.indexOf(k) ? v : void 0)
          : replacer || noop;
      const known = new Map();
      const input = [];
      const output = [];
      let i = +set(known, input, $.call({ '': value }, '', value));
      let firstRun = !i;
      while (i < input.length) {
        firstRun = true;
        output[i] = $stringify(input[i++], replace, space);
      }
      return '[' + output.join(',') + ']';
      function replace(key, value) {
        if (firstRun) {
          firstRun = !firstRun;
          return value;
        }
        const after = $.call(this, key, value);
        switch (typeof after) {
          case object:
            if (after === null) return after;
          case primitive:
            return known.get(after) || set(known, input, after);
        }
        return after;
      }
    };

    (function () {
      var old = console.log;
      console.log = function () {
        let logline = document.createElement('span');
        logline.innerHTML += '> ';
        for (var i = 0; i < arguments.length; i++) {
          if (arguments[i] instanceof Array) {
            logline.innerHTML += `[${arguments[i].join(', ')}]`; //(JSON && JSON.stringify ? stringify(arguments[i], undefined, 2) : arguments[i]) + '<br/>';
          } else if (arguments[i] instanceof Object) {
            logline.innerHTML +=
              (JSON && JSON.stringify ? stringify(arguments[i], undefined, 2) : arguments[i]) + '<br/>';
          } else {
            logline.innerHTML += arguments[i] + '<br/>';
          }
        }
        $('#console').prepend(logline);
        old(...arguments);
      };
    })();
  }

  // sets up new console
  newConsole();

  let console_button = document.getElementById('console-button');
  let console_hidden = true;

  // Modifies styles when the console_button is clicked
  if (console_hidden) {
    $('#cons').css('right', '-40vw');
    $('#console-button').css('background-color', 'rgba(100,200,255,0.5)');
  } else {
    $('#cons').css('right', '15px');
    $('#console').css('scroll-top', $('#console').css('scroll-height'));
    $('#console-button').css('background-color', 'rgba(100,200,255,0.1)');
  }

  console_button.onclick = () => {
    console_hidden = !console_hidden;
    if (console_hidden) {
      $('#cons').css('right', '-40vw');
      $('#console-button').css('background-color', 'rgba(100,200,255,0.5)');
    } else {
      $('#cons').css('right', '15px');
      $('#console').css('scroll-top', $('#console').css('scroll-height'));
      $('#console-button').css('background-color', 'rgba(100,200,255,0.1)');
    }
  };

  $('document').ready(function () {
    let engine = new Engine();
    engine.start(1);
  });
});
