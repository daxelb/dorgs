'use strict';
import Engine from './src/Engine.js';
import newConsole from './src/newConsole.js';

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
