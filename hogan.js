module.exports = function(bundle){
  // Adding runtime.
  var path = require.resolve('hogan.js/lib/template')
  var content = require('fs').readFileSync(path, 'utf8')
  bundle.prepend(content)

  // Compiling templates.
  var handler = function(data){
    var hogan = require('hogan.js')
    var content = hogan.compile(data, {asString: true})
    return [
      "var template = new Hogan.Template(" + content + ");",
      "module.exports = template.render.bind(template);"
    ].join(' ')
  }
  bundle.register('.hg', handler)
  bundle.register('.hogan', handler)
}