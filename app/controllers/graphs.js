'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Talks = mongoose.model('Talk');
    
/**
 * Graph Data.
 */
exports.all = function(req, res) {
    Talks.find().exec(function(err, talks) {
        if (err) throw err;

        var mapped = {};
        for (var t = 0; t < talks.length; t++) {
            var talk = talks[t];
            if (mapped[talk.Technology]) {
                mapped[talk.Technology].push(talk);
            } else {
                mapped[talk.Technology] = [talk];
            }
        }

        var rows = [];
        for (var key in mapped) {
            var group = mapped[key];
            var sum = 0;
            for (var i = 0; i < group.length; i++) {
                sum += group[i].Users.length;
            }
            var row = {
                c: [{
                    v: key
                }, {
                    v: sum
                }]
            };
            rows.push(row);
        }


        var found = {
            'cols': [{
                id: 'group',
                label: 'Groups',
                type: 'string'
            }, {
                id: 'people',
                label: 'people',
                type: 'number'
            }],
            'rows': rows
        };

        res.jsonp(found);
    });
};