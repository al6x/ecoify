module.exports = function(bundle){
  bundle.register('.eco', function(data){
    var eco = require('eco')
    var content = eco.compile(data)
    return "module.exports = " + content + ";"
  })
}