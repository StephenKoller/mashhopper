'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    events = require('../../../app/services/events.js');

var eventObject;
//The tests
describe('<Unit Test>', function() {
    describe('Service Events:', function() {
        before(function(done) {
            eventObject = {
                user: {},
                type: 'facebook',
                details: 'session name'
            };
            done();
        });

        it('should not be null', function(done) {
            events.should.not.be.null;
            done();
        });


        it('should have a method to log an event', function(done) {
            events.logEvent.should.be.ok;
            done();
        });

        it('should take in an eventObject', function(done) {
            events.logEvent(eventObject);
            (1).should.be.ok;
            done();
        });


        // before(function(done) {
        //     user = new User({
        //         name: 'Full name',
        //         email: 'test@test.com',
        //         username: 'user',
        //         password: 'password'
        //     });
        //     user2 = new User({
        //         name: 'Full name',
        //         email: 'test@test.com',
        //         username: 'user',
        //         password: 'password'
        //     });

        //     done();
        // });

        // describe('Method Save', function() {
        //     it('should begin with no users', function(done) {
        //         User.find({}, function(err, users) {
        //             users.should.have.length(0);
        //             done();
        //         });
        //     });

        //     it('should be able to save whithout problems', function(done) {
        //         user.save(done);
        //     });

        //     it('should fail to save an existing user again', function(done) {
        //         user.save();
        //         return user2.save(function(err) {
        //             should.exist(err);
        //             done();
        //         });
        //     });

        //     it('should be able to show an error when try to save without name', function(done) {
        //         user.name = '';
        //         return user.save(function(err) {
        //             should.exist(err);
        //             done();
        //         });
        //     });
        // });

        // after(function(done) {
        //     User.remove().exec();
        //     done();
        // });
    });
});