import Environment from './Environment.js';
import { cellSize, fps, flowerGeneNames } from './constants.js';
import Flower from './Flower.js'
const min_render_speed = 1000;
import {geno} from './utils/geno.js'

class Engine {
  constructor() {
    this.fps = fps <= 0 ? 1 : fps;
    this.env = new Environment(cellSize);
    // this.palettecheme = new palettecheme(this.env);
    // this.palettecheme.loadpalettecheme();
    this.env.origin();

    this.sim_last_update = Date.now();
    this.sim_delta_time = 0;

    this.ui_last_update = Date.now();
    this.ui_delta_time = 0;

    this.actual_fps = 0;
    this.running = false;
    this.flower1 = new Flower(null, 1);
    this.flower3 = new Flower(null, 3);
    const flower2Geno = geno(flowerGeneNames, this.flower1.geno, this.flower3.geno);
    this.flower2 = new Flower(flower2Geno, 2);
  }

  start(fps) {
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

  restart(fps = null) {
    if (fps) this.fps = fps
    clearInterval(this.sim_loop);
    this.start();
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

export default Engine;
