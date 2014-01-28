'use strict';
/* jshint -W024 */
/* jshint expr:true */

/**
 * Module dependencies.
 */

var fakeGameService = {
    notify: function() {
        //console.log('I am a game service. I update your XP');
    }
};
var fakeSocketsService = {
    notify: function() {
        //console.log('I am a socket service. I update your livefeed');
    }
};

var expect = require('expect.js'),
    //mongoose = require('mongoose'),
    sinon = require('sinon'),
    proxyquire = require('proxyquire').noCallThru(),
    events = proxyquire('../../../../app/services/events.js', {
        './game.js': fakeGameService,
        './sockets.js': fakeSocketsService
    });

var fakeUser, stubUserSave, eventObject;

//The tests
describe('<Unit Test>', function() {
    describe('Service Events:', function() {
        beforeEach(function(done) {
            fakeUser = {
                save: function() {}
            };
            stubUserSave = sinon.stub(fakeUser, 'save');
            eventObject = {
                type: 'facebook',
                details: 'session name'
            };
            done();
        });

        after(function(done) {
            //stubUserSave.restore();
            done();
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
            //stubUserSave.expects('save').once();

            events.logEvent(eventObject, fakeUser);

            // stubUserSave.verify();
            expect(stubUserSave.calledOnce).to.be(true);
            done();
        });

        it('should call the game service and sockets service before adding event to user', function(done) {
            var stubNotify = sinon.stub(fakeGameService, 'notify');
            var notifyWithUser = stubNotify.withArgs(eventObject, sinon.match({events: []}));
            events.logEvent(eventObject, fakeUser);
            // sinon.assert.calledOnce(notifyWithUser);
            expect(notifyWithUser.calledOnce).to.be(true);
            done();
        });
        
        it('should call the sockets service', function(done) {
            var stubNotify = sinon.stub(fakeSocketsService, 'notify');
            var notifyWithUser = stubNotify.withArgs(eventObject, sinon.match({events: []}));
            events.logEvent(eventObject, fakeUser);
            // sinon.assert.calledOnce(notifyWithUser);
            expect(notifyWithUser.calledOnce).to.be(true);
            done();
        });
    });
});