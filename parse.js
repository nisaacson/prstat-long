/**
 * Split the raw output of the prstat command into an array of key-value pairs for each line
 */
var inspect = require('eyespect').inspector();
module.exports = function (input) {
  var lines = input.match(/[^\r\n]+/g)
  lines = lines.map(function (line) {
    return line.trim()
  })
  var headerLine = lines.shift()
  var totalLine = lines.pop()
  var headers = headerLine.split(/\s+/)
  // split each line into distinct pieces
  var processes = lines.map(function (line) {
    return processLine(line, headers)
  })

  var output = {
    headers: headers,
    totalLine: totalLine,
    processes: processes
  }
  return output
}


function processLine(line, headers) {
  var elements = line.split(/\s+/)
  // match each element to its header value
  var pairs = elements.map(function (element, index) {
    var header = headers[index]
    var pair = [header, element]
    return pair
  })
  var keyValuePairs = pairs.reduce(function (a, b) {
    var key = b[0]
    var value = b[1]
    a[key] = value
    return a
  }, {})
  return keyValuePairs

}
