var inspect = require('eyespect').inspector({maxLength: 9999999});
var should = require('should');
var getRSSByPID = require('../getRSSByPID')
describe('Get RSS By PID', function () {
  it('should get rss', function (done) {
    // use the current process for testing
    var pid = process.pid
    getRSSByPID(pid, function (err, reply) {
      should.not.exist(err, 'error getting rss: ' + JSON.stringify(err, null, ' '))
      should.exist(reply, 'no reply')
      done()
    })
  })
})
