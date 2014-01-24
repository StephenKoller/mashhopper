'use strict';
/* jshint -W024 */
/* jshint expr:true */

/**
 * Module dependencies.
 */

var fakeGameService = {
    hello: function() {
        console.log('I am a game service. I update your XP');
    }
};

var chai = require('chai'),
    expect = chai.expect,
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    sinon = require('sinon'),
    proxyquire = require('proxyquire').noCallThru(),
    events = proxyquire('../../../../app/services/events.js', {
        './game.js': fakeGameService
    });



//The tests are cool.
describe('<Unit Test>', function() {
    describe('Service Events:', function() {
        before(function(done) {
            done();
        });

        it('should not be null', function(done) {
            if(User){
                throw('why do we have the User here?');
            }
            expect(events).to.exist;
            done();
        });


        it('should have a method to log an event', function(done) {
            expect(events.logEvent).to.be.ok;
            done();
        });

        it('should save a logged event to the database', function(done) {
            var fakeUser = {
                save: function() {}
            };
            var mockUser = sinon.mock(fakeUser).expects('save').once();
            var eventObject = {
                type: 'facebook',
                details: 'session name'
            };
            events.logEvent(eventObject, fakeUser);

            mockUser.verify();
            done();

        });


        it('should call the game service', function(done) {
            var fakeUser = {
                save: function() {}
            };
           // var mockUser = sinon.mock(fakeUser).expects('save').once();
            var eventObject = {
                type: 'facebook',
                details: 'session name'
            };
            var mockGameService = sinon.mock(fakeGameService).expects('hello').once();
            events.logEvent(eventObject, fakeUser);
            mockGameService.verify();
            done();
        });

        /*it('should return a list of events for a user', function(done) {
            events.logEvent(eventObject);
            done();
        });*/


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