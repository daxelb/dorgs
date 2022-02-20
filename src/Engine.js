import Environment from './Environment.js';
// import ColorScheme from './ColorScheme.js';

const min_render_speed = 60;

class Engine {
  constructor() {
    this.fps = 60;
    this.env = new Environment(10);
    // this.colorscheme = new ColorScheme(this.env);
    // this.colorscheme.loadColorScheme();
    this.env.OriginOfLife();

    this.sim_last_update = Date.now();
    this.sim_delta_time = 0;

    this.ui_last_update = Date.now();
    this.ui_delta_time = 0;

    this.actual_fps = 0;
    this.running = false;
  }

  start(fps = 60) {
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
    // this.organism_editor.update();
  }
}

export default Engine;
