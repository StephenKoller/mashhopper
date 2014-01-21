'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TalkSchema = new Schema({
	title: String,
	Id: String,
	Users: [String],
	Technology: String
});


/**
 * Statics
 */
TalkSchema.statics.load = function(id, cb) {
	this.findOne({
		_id: id
	}).exec(cb);
};


mongoose.model('Talk', TalkSchema);