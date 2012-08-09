// Helper.
var escapeJsString = function(str){
   return str.replace(/([\\"'])/gm, "\\$1").replace(/\0/gm, "\\0").replace(/\n/gm, "\\n")
}

// ejs plugin.
module.exports = function(bundle){
  // Adding runtime.
  var path = require.resolve('ejs/ejs')
  var content = require('fs').readFileSync(path, 'utf8')
  bundle.prepend(content)

  // Compiling templates.  
  bundle.register('.ejs', function(data){
    // There's currently no way to precompile ejs, the only possible way is to save template
    // as a string and compile it on the client.
    content = escapeJsString(data)
    return "module.exports = ejs.compile(\"" + content + "\");"
  })
}