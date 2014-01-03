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
    // var found = [];
    // Talks.find().exec(function(err, users){
    //     found = users;
    // });
    // console.log(found);

    /*var found = {
        "cols": [
            {id: "month", label: "Month", type: "string"},
            {id: "laptop-id", label: "Laptop", type: "number"},
            {id: "desktop-id", label: "Desktop", type: "number"},
            {id: "server-id", label: "Server", type: "number"},
            {id: "cost-id", label: "Shipping", type: "number"}
        ],
        "rows": [
        {c: [
            {v: "January"},
            {v: 19, f: "42 items"},
            {v: 12, f: "Ony 12 items"},
            {v: 7, f: "7 servers"},
            {v: 4}
        ]},
        {c: [
            {v: "February"},
            {v: 13},
            {v: 1, f: "1 unit (Out of stock this month)"},
            {v: 12},
            {v: 2}
        ]},
        {c: [
            {v: "March"},
            {v: 24},
            {v: 5},
            {v: 11},
            {v: 6}
        ]}
    ]};*/

    Talks.find().exec(function(err, talks){
        if (err) throw err;


        var grouped = _.groupBy(talks, function(talk){ return talk.Technology; })
        // console.log(JSON.stringify(grouped, null, 2));

        //console.log(grouped.undefined.length, talks.length);
/*
        for (var key in grouped) {
            console.log(key);
        }*/
        /*for (var i = 0; i < grouped.length; i++) {
            var group = grouped[i];
            console.log(group);
        }*/

        var mapped = {};
        for (var i = 0; i < talks.length; i++) {
            var talk = talks[i];
            console.log(talk.Technology);
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
            console.log(sum);
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