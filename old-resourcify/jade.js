module.exports = function(bundle){
  // Adding runtime.
  var path = require.resolve('jade/runtime')
  var content = require('fs').readFileSync(path, 'utf8')
  bundle.prepend(content)

  // Compiling templates.
  bundle.register('.jade', function(data, fileName){
    var jade = require('jade')
    var content = jade.compile(data, {compileDebug: false, client: true, filename:fileName})
    return "module.exports = " + content + ";"
  })
}