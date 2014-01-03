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
    var found = [];
    Talks.find().exec(function(err, users){
        found = users;
    });
    console.log(found);
     res.jsonp(found);
             // chart1.data = {"cols": [
            //     {id: "month", label: "Month", type: "string"},
            //     {id: "laptop-id", label: "Laptop", type: "number"},
            //     {id: "desktop-id", label: "Desktop", type: "number"},
            //     {id: "server-id", label: "Server", type: "number"},
            //     {id: "cost-id", label: "Shipping", type: "number"}
            // ], "rows": [
            //     {c: [
            //         {v: "January"},
            //         {v: 19, f: "42 items"},
            //         {v: 12, f: "Ony 12 items"},
            //         {v: 7, f: "7 servers"},
            //         {v: 4}
            //     ]},
            //     {c: [
            //         {v: "February"},
            //         {v: 13},
            //         {v: 1, f: "1 unit (Out of stock this month)"},
            //         {v: 12},
            //         {v: 2}
            //     ]},
            //     {c: [
            //         {v: "March"},
            //         {v: 24},
            //         {v: 5},
            //         {v: 11},
            //         {v: 6}

            //     ]}
            // ]};

   
};