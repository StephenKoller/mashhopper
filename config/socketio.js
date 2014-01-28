module.exports = function(io) {
	io.sockets.on('connection', function (socket) {
		console.log('got a connection');
		socket.emit('message', { message: 'welcome to the chat' });

		socket.on('send', function (data) {
			console.log('got a message:', data);
			io.sockets.emit('message', data);
		});
	});
};