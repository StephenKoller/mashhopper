

var app = require('../../../server.js'),
    request = require('supertest');

describe('how to GET TO THE HOPPER!!!!!', function() {
  it('the default route (/) should redirect unauthorized users from the homepage to signin.', function(done) {
    request(app)
      .get('/')
      .expect(302)
      .end(function(err, res){
        if(err) {
          done(err);
        } else {
          done();
        }
      });
  });
});