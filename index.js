var compile = function(file, data) {
  var eco = require('eco')
  var content = eco.compile(data)
  return "module.exports = " + content + ";"
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