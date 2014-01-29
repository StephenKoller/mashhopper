var eventService = require('../app/services/events.js');

module.exports = function(io) {
	io.sockets.on('connection', function (socket) {
		socket.emit('message', { message: 'welcome to the chat' });

		socket.on('send', function (data) {
			io.sockets.emit('message', data);
		});

		socket.on('doEvent', function (data) {
			//io.sockets.emit('event', data);
			// console.log(data);
			eventService.logEvent(data.event, {save: function() {console.log('saved');}});
		});
	});
};