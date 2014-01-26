'use strict';

/*
 * Modified from https://github.com/elliotf/mocha-mongoose
 */

var config = require('../../../config/config');
var mongoose = require('mongoose');

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
//console.log(config.db);
//process.env.NODE_ENV = 'development';

beforeEach(function(done) {

  function clearDB() {
    console.log("clear");
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove();
    }
    return done();
  }

  function reconnect() {
    console.log("reconnect");
    mongoose.connect(config.db, function(err) {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  }

  function checkState() {
    //console.log(mongoose.connection);
    //console.log(mongoose.connection.readyState);
    switch (mongoose.connection.readyState) {
      case 0:
        reconnect();
        break;
      case 1:
        clearDB();
        break;
      default:
        //reconnect();
        process.nextTick(checkState);
        //return;
    }
  }
 
  //checkState();
});

afterEach(function(done) {
  console.log("after");
  mongoose.disconnect();
  return done();
});