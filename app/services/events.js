'use strict';

var //mongoose = require('mongoose'),
	gameService = require('./game.js'),
	socketService = require('./sockets.js');

exports.logEvent = function(eventObj, user) {
	if (!user.events) {
		user.events = [];
	}
	
	gameService.notify(eventObj, user);
	socketService.notify(eventObj, user);

	user.events.push(eventObj);
	user.save();
	
	return eventObj;
};