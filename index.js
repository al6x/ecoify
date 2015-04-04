var compile = function(file, data) {
  var eco = require('eco')
  var content = eco.compile(data)
  var result = []
  result.push("var template = " + content + ";")

  // Allow to add hook to render, if `window.app.__render` defined it will be called
  // as `app.__render(template, variables)`.
  // It's usefull if you want to alter how template works, for example inject additional
  // variables.
  result.push("module.exports = function(variables){")
  result.push("  if(window.app && window.app.__render) return window.app.__render(template, variables);")
  result.push("  else return template(variables);")
  result.push("};")

  return result.join("\n")
}

var isEco = function (file) {
  return /\.eco$/.test(file);
}

module.exports = function (file) {
  var through = require('through');

  if (!isEco(file)) return through();
  var data  = '';
  var write = function (buf) { data += buf }
  var end   = function () {
    this.queue(compile(file, data));
    this.queue(null);
  }
  return through(write, end);
};
