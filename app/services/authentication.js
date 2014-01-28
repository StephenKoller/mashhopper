'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');


exports.authenticate = function(authenticationStrategy){
    return function(req,res,next){
        req.passUser = req.user;
        return authenticationStrategy(req,res,next);
    };
};

exports.authenticationCallBack = function(authenticationType){
    var strategyHandler;
    if(authenticationType === 'twitter'){
        strategyHandler = exports.handleTwitterAuthentication;
    }else if(authenticationType === 'facebook'){
        strategyHandler = exports.handleFacebookAuthentication;
    }else if(authenticationType === 'linkedin'){
        strategyHandler = exports.handleLinkedinAuthentication;
    }else if(authenticationType === 'github'){
        strategyHandler = exports.handleGithubAuthentication;
    }else{
        strategyHandler = exports.handleGoogleAuthentication;
    }
    return function(req, accessToken, refreshToken, profile, done){
        if(req.passUser){
            req.passUser[authenticationType]=profile._json;
            req.user = req.passUser;
            req.user.save(function(err){
                if (err) console.log(err);
            });
            return done(null, req.user);
        }else{
            strategyHandler(accessToken, refreshToken, profile, done);
        }
    };
};

exports.handleTwitterAuthentication = function(token, tokenSecret, profile, done) {
    User.findOne({
        'twitter.id_str': profile.id
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            user = new User({
                name: profile.displayName,
                username: profile.username,
                provider: 'twitter',
                twitter: profile._json
            });
            user.save(function(err) {
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            return done(err, user);
        }
    });
};


exports.handleFacebookAuthentication = function(accessToken, refreshToken, profile, done) {
    User.findOne({
        'facebook.id': profile.id
    }, function(err, user) {
        console.log(profile);
        if (err) {
            return done(err);
        }
        if (!user) {
            user = new User({
                name: profile.displayName,
                username: profile.username,
                provider: 'facebook',
                facebook: profile._json
            });
            user.save(function(err) {
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            return done(err, user);
        }
    });
};

exports.handleGithubAuthentication = function(accessToken, refreshToken, profile, done) {
    User.findOne({
        'github.id': profile.id
    }, function(err, user) {
        if (!user) {
            user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                provider: 'github',
                github: profile._json
            });
            user.save(function(err) {
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            return done(err, user);
        }
    });
};

exports.handleGoogleAuthentication = function(accessToken, refreshToken, profile, done) {
    User.findOne({
        'google.id': profile.id
    }, function(err, user) {
        console.log(profile);
        if (!user) {
            user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                username: profile.emails[0].value,
                provider: 'google',
                google: profile._json
            });
            user.save(function(err) {
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            return done(err, user);
        }
    });
};

exports.handleLinkedinAuthentication = function(accessToken, refreshToken, profile, done) {
    User.findOne({
        'linkedin.id': profile.id
    }, function(err, user) {
        console.log(profile);
        if (!user) {
            user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                username: profile.emails[0].value,
                provider: 'linkedin',
                linkedin: profile._json
            });
            user.save(function(err) {
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            return done(err, user);
        }
    });
};

