'use strict';
import Engine from './src/Engine.js';

var console_button = document.getElementById('console-button')

console_button.onclick = () => {
  let logger = document.getElementById('console');
  if (logger.style.display !== 'none') { 
    logger.style.display = 'none';
  } else {
    logger.style.display = 'block';
    logger.scrollTop = logger.scrollHeight;
  }
}

(function () {
  var old = console.log;
  var alpha = Math.min(0.5 + 0.4 * $(this).scrollTop() / 210, 0.9);
  console.log(alpha)
  var logger = document.querySelector('#console')
  console.log = function () {
    let logline = document.createElement("span")
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] == 'object') {
        logline.innerHTML += (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br/>';
      } else {
        logline.innerHTML += arguments[i] + '<br/>';
      }
    }
    logger.prepend(logline)
    old(...arguments)
  }
})();

$('document').ready(function () {
  let engine = new Engine();
  engine.start(60);
  // var alpha = Math.min(0.5 + 0.4 * $(this).scrollTop() / 210, 0.9);
  // console.log(alpha)
  // var channel = Math.round(alpha * 255);
  // $("#console span").css('color', 'rgba(255,255,255,'+ alpha+ ')');
});
