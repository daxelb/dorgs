'use strict';
import Engine from './src/Engine.js';
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

var console_button = document.getElementById('console-button');
let blue = true;
console_button.onclick = () => {
  let logger = document.getElementById('console');
  if (logger.style.display !== 'none') {
    logger.style.display = 'none';
  } else {
    logger.style.display = 'block';
    logger.scrollTop = logger.scrollHeight;
  }
  if (blue) {
    console_button.style.backgroundColor = `rgba(${100},${200},${255},${0.1})`;
  } else {
    console_button.style.backgroundColor = `rgba(${100},${200},${255},${0.5})`;
  }
  blue = !blue;
};

(function () {
  var old = console.log;
  var alpha = Math.min(0.5 + (0.4 * $(this).scrollTop()) / 210, 0.9);
  console.log(alpha);
  var logger = document.querySelector('#console');
  console.log = function () {
    let logline = document.createElement('span');
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] == 'object') {
        logline.innerHTML += (JSON && JSON.stringify ? stringify(arguments[i], undefined, 2) : arguments[i]) + '<br/>';
      } else {
        logline.innerHTML += arguments[i] + '<br/>';
      }
    }
    logger.prepend(logline);
    old(...arguments);
  };
})();

$('document').ready(function () {
  let engine = new Engine();
  engine.start(60);
  // var alpha = Math.min(0.5 + 0.4 * $(this).scrollTop() / 210, 0.9);
  // console.log(alpha)
  // var channel = Math.round(alpha * 255);
  // $("#console span").css('color', 'rgba(255,255,255,'+ alpha+ ')');
});
