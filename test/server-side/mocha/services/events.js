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

var expect = require('expect.js'),
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

        it('should not require user', function(done){
            expect(User).to.be(null);
        });

        it('should not be null', function(done) {
            expect(events).to.not.be(null);
            done();
        });


        it('should have a method to log an event', function(done) {
            expect(events.logEvent).to.be.ok();
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
    });
});