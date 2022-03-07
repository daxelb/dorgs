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

export default newConsole;
