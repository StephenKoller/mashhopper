'use strict';

var //mongoose = require('mongoose'),
	gameService = require('./game.js'),
	socketService = require('./sockets.js');

exports.logEvent = function(event, user) {
	if (!user.events) {
		user.events = [];
	}
	
	gameService.notify(event, user);
	socketService.notify(event, user);

	user.events.push(event);
	user.save();
	
	return event;
};