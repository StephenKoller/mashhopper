// var io = require('socket.io');

exports.notify = function(eventObj, user) {
	global.io.sockets.emit('event', eventObj);
};