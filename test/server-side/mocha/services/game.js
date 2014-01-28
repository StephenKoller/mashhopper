'use strict';

var gameService = require('../../../../app/services/game.js'),
	expect = require('expect.js');

var eventObj, user;

describe('Game service', function() {
	before(function() {
		eventObj = {type: 'tweet', sessionId: 'abc123'};
		user = {
			xp: 1,
			save: function(){},
			events: []
		};
	});

	it('should increment a users XP when getting any event', function() {
		gameService.notify(eventObj, user);
		expect(user.xp).to.be.greaterThan(1);
	});

	it('should determine if an event already exists when it doesnt', function() {
		expect(gameService.eventExists(eventObj, user)).to.be(false);
	});

	it('should determine if an event already exists when it doesnt', function() {
		user.events.push(eventObj);
		expect(gameService.eventExists(eventObj, user)).to.be(true);
	});

	it('should only give points for an event that doesnt already exist', function() {
		user.events.push(eventObj);
		var xp = user.xp;
		gameService.notify(eventObj, user);
		expect(user.xp).to.be(xp);
	});
});