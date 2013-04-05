var inspect = require('eyespect').inspector({maxLength: 9999999});
var fs = require('fs')
var path = require('path')
var should = require('should');
var parse = require('../parse')
describe('Parse prstat output', function () {
  var filePath = path.join(__dirname,'data/sample.txt')
  var input = fs.readFileSync(filePath, 'utf8')
  it('should parse input correctly', function () {
    var desiredNumLines = 15
    var result = parse(input)
    result.processes.length.should.eql(desiredNumLines)
    should.exist(result.headers)
    should.exist(result.totalLine)
  })
})
