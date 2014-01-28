'use strict';

//var mongoose = require('mongoose');

exports.eventTypeXpValues = {
	tweet: 1,
	attend: 5,
	booth: 10
};

exports.notify = function(eventObj, user) {
	if (!user.xp) {
		user.xp = 0;
	}

	if (!exports.eventExists(eventObj, user)) {
		user.xp += 5;
		user.save();
	}
};

exports.eventExists = function(newEvent, user) {
	return user.events.some(function(userEvent) {
		return Object.keys(userEvent).every(function(key) {
			return userEvent[key] === newEvent[key];
		});
	});
};