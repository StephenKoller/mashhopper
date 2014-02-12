'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var _ = require('lodash');

exports.eventTypeXpValues = {
	signup: 1,
	attend: 5,
	like: 1,
	tweet: 1,
	facebook: 1,
	linkedIn: 1,
	gplus: 1,
	note: 1,
	reminder: 1,
	booth: 10,
	contactMe: 1,
	question: 1,
	answer: 1
};

exports.xpLevelThresholds = [
	{level: 1, xp: 0},
	{level: 2, xp: 20},
	{level: 3, xp: 60}
];

exports.notify = function(eventObj, user) {
	if (!user.xp) {
		user.xp = 0;
	}

	if (!exports.eventExists(eventObj, user)) {
		var addedXp = exports.eventTypeXpValues[eventObj.type];
		if (addedXp) {
			user.xp += addedXp;
			eventObj.xp = addedXp;
			var possibleThresholds = exports.xpLevelThresholds.filter(function(threshold) {
				return threshold.xp <= user.xp;
			});
			var expectedLevel = possibleThresholds[possibleThresholds.length-1].level;
			user.level = expectedLevel;
            user.events.push(eventObj);
			user.save();
		}
	}
};

exports.userVistsBooth = function(req, res){
    User.findOne({'_id':mongoose.Types.ObjectId(req.query.guid)}, function(err,user){
        if(err){
            // fail (poison)
            return res.send('boo!');
        }else{
            if(! user){
                // Guid not found (poison)
                res.send('not found');
            }else{
                // Yay! Tasty fish!
                exports.notify({type:'booth'}, user);
                res.send('Whooosa');
            }
            return true;
        }
    });
};

exports.eventExists = function(newEvent, user) {
    return _.some(user.events,function(ne){ return ne.type === newEvent.type; });
};
