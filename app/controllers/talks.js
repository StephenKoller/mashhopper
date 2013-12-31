'use strict';

var mongoose = require('mongoose'),
    Talk = mongoose.model('Talk');

exports.all = function(req, res) {
	Talk.find().exec(function(err, data){
		res.jsonp(data);
	});
};