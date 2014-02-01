'use strict';

exports.notify = function(eventObj, user) {
	console.log(user);
	global.io.sockets.emit('event', eventObj);
};