'use strict';

var gameService = require('../../../../app/services/game.js'),
	expect = require('expect.js');

var eventObj, user;

describe('Game service', function() {
	beforeEach(function() {
		eventObj = {type: 'tweet', sessionId: 'abc123'};
		user = {
			xp: 1,
			save: function(){},
			events: [],
			level: 1
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

	it('should add xp to a user without any xp', function(){
		gameService.notify(eventObj, user);
		expect(user.xp).to.be(2);
	});

	it('should level up a user when they reach the designated xp threshold', function() {
		// level 2 at 20 xp?
		eventObj.type = 'booth';
		gameService.notify(eventObj, user);
		gameService.notify(eventObj, user);
		expect(user.xp).to.be(21);
		expect(user.level).to.be(2);
		gameService.notify(eventObj, user);
		gameService.notify(eventObj, user);
		gameService.notify(eventObj, user);
		gameService.notify(eventObj, user);
		expect(user.xp).to.be(61);
		expect(user.level).to.be(3);
	});

});