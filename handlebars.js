// Handlebars doesn't have ready to use `runtime.js`, it requires to manually
// generate it, so instead of bothering with this stuff we just use another 
// project that already did it - handlebars-brunch.
module.exports = function(bundle){
  // Brunch handlebars compiler.
  var Compiler = require('handlebars-brunch')
  var compiler = new Compiler({})

  // Adding Handlebars runtime.
  for(var i = 0; i < compiler.include.length; i++){
    var path = compiler.include[i]
    var content = require('fs').readFileSync(path, 'utf8')
    bundle.prepend(content)
  }

  // Templates compilation.
  var handler = function(data){
    // Hack to convert async call into sync.
    var content
    compiler.compile(data, null, function(err, compiled){
      if(err) throw err
      content = compiled
    })
    return "module.exports = " + content + ";"
  }

  bundle.register('.hbs', handler)
  bundle.register('.handlebars', handler)
}