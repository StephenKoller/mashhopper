'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('lodash');


exports.authenticate = function(authenticationStrategy){
    return function(req,res,next){
        req.passUser = req.user;
        return authenticationStrategy(req,res,next);
    };
};

exports.authenticationCallBack = function(authenticationType){
    return function(req, accessToken, refreshToken, profile, done){
        if(req.passUser){
            req.passUser[authenticationType]=profile._json;
            req.user = req.passUser;
            User.findOne(module.getSearchObject(authenticationType, profile), function(err, oldUser) {
                if(oldUser){
                    req.user.talks = _.union(req.user.talks,oldUser.talks);
                    req.user.events = _.union(req.user.events,oldUser.events);
                    oldUser.remove(function(err){
                        if (err) console.log(err);
                    });
                }
                req.user.save(function(err){
                    if (err) console.log(err);
                });
                return done(null, req.user);
            });
        }else{
            User.findOne(module.getSearchObject(authenticationType, profile), function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    user = new User(module.getNewUserFields(authenticationType, profile));
                    user.save(function(err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    return done(err, user);
                }
            });
        }
    };
};

module.getSearchObject = function(type, profile){
    if(type === 'twitter'){
        return {'twitter.id_str':profile.id};
    }else{
        var obj = {};
        obj[type+'.id'] = profile.id;
        return obj;
    }
};
module.getNewUserFields = function(type, profile){
    var userFields = {
        name: profile.displayName,
        username: profile.username,
        provider: type
    };
    userFields[type] = profile._json;
    if(type === 'github' || type === 'linkedin'){
        userFields.email = profile.emails[0].value;
    }
    if(type === 'google' || type === 'linkedin'){
        userFields.username = profile.emails[0].value;
    }
    return userFields;
};
