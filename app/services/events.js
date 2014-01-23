'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	gameService = require('./game.js');

exports.logEvent = function(event, user) {
	if (!user.events) {
		user.events = [];
	}

	user.events.push(event);
	user.save();
	gameService.hello();
	return event;
};