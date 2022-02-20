'use strict';

import Engine from './src/Engine.js';

$('document').ready(function () {
  let engine = new Engine();
  engine.start(60);
});
