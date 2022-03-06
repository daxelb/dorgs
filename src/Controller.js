class Controller {
  constructor(env, canvas) {
    this.renderer = env.renderer;
    this.grid_map = env.grid_map;
    this.canvas = canvas;
    this.mouse_x;
    this.mouse_y;
    this.mouse_c;
    this.mouse_r;
    this.left_click = false;
    this.middle_click = false;
    this.right_click = false;
    this.scale = 1;
    this.highlighted_org = null;
    this.defineEvents();
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
    if (this.right_click) {
      const curr_cell = this.grid_map.cellAt(this.mouse_c, this.mouse_r);
      this.highlighted_org = curr_cell.owner;
      this.renderer.highlightOrg(this.highlighted_org);
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
    let colRow = this.grid_map.xyToColRow(this.mouse_x, this.mouse_y);
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

export default Controller;
