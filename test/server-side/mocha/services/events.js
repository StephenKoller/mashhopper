'use strict';
/* jshint -W024 */
/* jshint expr:true */

/**
 * Module dependencies.
 */

var fakeGameService = {
    notify : function() { 
        //console.log('I am a game service. I update your XP');
    }
};
var fakeSocketsService = {
    notify : function() { 
        //console.log('I am a socket service. I update your livefeed');
    }
};

var expect = require('expect.js'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    sinon = require('sinon'),
    proxyquire = require('proxyquire').noCallThru(),
    events = proxyquire('../../../../app/services/events.js', {
        './game.js': fakeGameService,
        './sockets.js': fakeSocketsService
    });

var fakeUser, mockUser, eventObject;

//The tests
describe('<Unit Test>', function() {
    describe('Service Events:', function() {
        before(function(done) {
            fakeUser = {
                save: function() {}
            };
            mockUser = sinon.mock(fakeUser);
            eventObject = {
                type: 'facebook',
                details: 'session name'
            };
            done();
        });

        after(function(done) {
            mockUser.restore();
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
            mockUser.expects("save").once();

            events.logEvent(eventObject, fakeUser);

            mockUser.verify();
            done();
        });

        
        it('should call the game service', function(done) {
            var mockGameService = sinon.mock(fakeGameService);
            mockGameService.expects('notify').once();
            events.logEvent(eventObject, fakeUser);
            mockGameService.verify();
            mockGameService.restore();
            done();
        });

        
        it('should call the sockets service', function(done) {
            var mockSocketsService = sinon.mock(fakeSocketsService);
            mockSocketsService.expects('notify').once();
            events.logEvent(eventObject, fakeUser);
            mockSocketsService.verify();
            mockSocketsService.restore();
            done();
        });
    });
});