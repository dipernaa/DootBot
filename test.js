var request = require('supertest');
var server = require('./server.js');
var should = require('should');
var app = server.app;

var mockDoot = { name: 'doot bot', text: 'doot doot' };

describe('/', function() {
  it('Doot bot is dooting', function(done) {
    request(app)
      .post('/')
      .send(mockDoot)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        res.text.should.be.exactly('Thanks');
        done();
      });
  });
});