var exec = require('child_process').exec
module.exports = function (pid, cb) {
  var cmd = 'ps -p ' + pid + ' -o rss'
  var args = ['-p', pid, '-o', 'rss']
  exec(cmd, function (err, stdout, stderr) {
    if (err) {
      return cb({
        message: 'error getting rss for pid',
        error: err,
        pid: pid,
        command: cmd,
        stack: new Error().stack
      })
    }
    if (stderr) {
      return cb({
        message: 'error getting rss for pid',
        error: stderr,
        pid: pid,
        command: cmd,
        stack: new Error().stack
      })
    }
    // rss is in the last line
    var lines = stdout.split(/\s+/).filter(function (line) {
      // remove empty lines
      return line
    })
    var rssLine = lines.pop().trim()
    // value is in kilobytes
    var value = parseInt(rssLine)
    var bytes = value*1000
    var readable = readablizeBytes(bytes)
    return cb(null, readable)
  })
}
function readablizeBytes(bytes) {
  var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
  var e = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
}
