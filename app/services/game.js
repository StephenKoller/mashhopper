'use strict';

var mongoose = require('mongoose');

exports.notify = function(event, user) {
	if (!user.xp) {
		user.xp = 0;
	}

	user.xp += 5;
	user.save();
};