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
    Talks.find().exec(function(err, talks){
        if (err) throw err;

        var grouped = _.groupBy(talks, function(talk){ return talk.Technology; })

        var mapped = {};
        for (var i = 0; i < talks.length; i++) {
            var talk = talks[i];
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
            var row = {c: [{v: key}, {v: sum}]};
            rows.push(row);
        }

        
        var found = {
            "cols": [
                {id: "group", label: "Groups", type: "string"},
                {id: "people", label: "people", type: "number"}
            ],
            "rows": rows};

        res.jsonp(found);
    });

};