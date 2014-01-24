'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	gameService = require('./game.js');

exports.logEvent = function(event, user) {
	if (!user.events) {
		user.events = [];
	}

	if(User){
		throw('what do we do with the user object here');
	}

	user.events.push(event);
	user.save();
	gameService.hello();
	
	//return event;
};