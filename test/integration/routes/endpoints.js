var 
  utils = require('../../utils'),
  app = require('../../../server.js'),
  request = require('supertest') ;


describe('how to GET TO THE HOPPER!!!!!', function() {
  it('the default route (/) should redirect unauthorized users from the homepage to signin.', function(done) {
    request(app)
      .get('/')
      .expect(302)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe('talks controller', function() {
  it('should have a "like" action', function(done) {
    request(app)
      .post('/talks/like')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('should have a "tweet" action', function(done) {
    request(app)
      .post('/talks/tweet')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('should have a "facebook" action', function(done) {
    request(app)
      .post('/talks/facebook')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('should have a "linkedin" action', function(done) {
    request(app)
      .post('/talks/linkedin')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('should have a "google" action', function(done) {
    request(app)
      .post('/talks/google')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('should have a "notes" action', function(done) {
    request(app)
      .post('/talks/notes')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('should have a "reminder" action', function(done) {
    request(app)
      .post('/talks/reminder')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  describe('users controller', function() {
    it('should have a "contact" me action', function(done) {
      request(app)
        .get('/users/contact')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });
  });
});