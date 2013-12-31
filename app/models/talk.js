'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var TalkSchema = new Schema({
    title: String
});

mongoose.model('Talk', TalkSchema);