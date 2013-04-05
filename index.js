var inspect = require('eyespect').inspector();
var spawn = require('child_process').spawn
module.exports = function () {
  var cmd = 'prstat'
  var child = spawn(cmd)

  child.stdout.setEncoding('utf8')
  child.stderr.setEncoding('utf8')

  child.stdout.on('data', function (data) {
    inspect('stdout data')
    console.log(data)
  })
  child.stderr.on('data', function (data) {
    inspect('stderr data')
    console.log(data)
  })
}
