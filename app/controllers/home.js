'use strict';

exports.render = function(req, res) {
	res.render('home/index', {
		user: req.user ? JSON.stringify(req.user) : 'null'
	});
};