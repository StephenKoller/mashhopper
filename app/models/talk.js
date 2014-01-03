'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var TalkSchema = new Schema({
    title: String,
    Id: String,
    Users: [String]
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