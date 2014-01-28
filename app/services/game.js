'use strict';

//var mongoose = require('mongoose');

exports.eventTypeXpValues = {
	tweet: 1,
	attend: 5,
	booth: 10
};

exports.xpLevelThresholds = [
	{level: 1, xp: 0},
	{level: 2, xp: 20},
	{level: 3, xp: 60}
];

exports.notify = function(eventObj, user) {
	if (!user.xp) {
		user.xp = 0;
	}

	if (!exports.eventExists(eventObj, user)) {
		var xp = exports.eventTypeXpValues[eventObj.type];
		if (xp) {
			user.xp += xp;
			var possibleThresholds = exports.xpLevelThresholds.filter(function(threshold) {
				return threshold.xp <= user.xp;
			});
			var expectedLevel = possibleThresholds[possibleThresholds.length-1].level;
			user.level = expectedLevel;
			user.save();
		}
	}
};

exports.eventExists = function(newEvent, user) {
	return user.events.some(function(userEvent) {
		return Object.keys(userEvent).every(function(key) {
			return userEvent[key] === newEvent[key];
		});
	});
};