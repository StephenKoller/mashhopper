'use strict';

/*
 * Modified from https://github.com/elliotf/mocha-mongoose
 */

var config = require('../config/config');
var mongoose = require('mongoose');

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
//console.log(config.db);
//process.env.NODE_ENV = 'development';

beforeEach(function(done) {

  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove({}, function(err, result) {
          if(err)
            console.log(err);
      });
    }
    return done();
  }

  function reconnect() {
    mongoose.connect(config.db, function(err) {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  }



  if (mongoose.connection.db) {
    clearDB();
    return done()
  };
  reconnect();
  //mongoose.connect(config.db, done);

  //checkState();
  //return done();
});

afterEach(function(done) {
  //console.log("after");
  mongoose.disconnect();
  return done();
});