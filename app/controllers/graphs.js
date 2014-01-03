'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Users = mongoose.model('User'),
    Talks = mongoose.model('Talk'),
    _ = require('lodash');



/**
 * Graph Data.
 */
exports.all = function(req, res) {
    Article.find().sort('-created').populate('user', 'name username').exec(function(err, articles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(articles);
        }
    });
};