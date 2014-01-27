'use strict';

var mongoose = require('mongoose'),
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GitHubStrategy = require('passport-github').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    LinkedinStrategy = require('passport-linkedin-oauth2').OAuth2Strategy,
    User = mongoose.model('User'),
    authentication = require('../app/services/authentication'),
    config = require('./config');
    config = require('./env/secrets');


module.exports = function(passport) {
    //Serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id: id
        }, '-salt -hashed_password', function(err, user) {
            done(err, user);
        });
    });

    //Use twitter strategy
    passport.use(new TwitterStrategy({
            consumerKey: config.twitter.clientID,
            consumerSecret: config.twitter.clientSecret,
            callbackURL: config.twitter.callbackURL,
            passReqToCallback:true
        },authentication.authenticationCallBack("twitter")));

    //Use facebook strategy
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            passReqToCallback:true
        },authentication.authenticationCallBack("facebook")));

    //Use github strategy
    passport.use(new GitHubStrategy({
            clientID: config.github.clientID,
            clientSecret: config.github.clientSecret,
            callbackURL: config.github.callbackURL,
            passReqToCallback:true
        },authentication.authenticationCallBack("github")));

    //Use google strategy
    passport.use(new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL,
            passReqToCallback:true
        },authentication.authenticationCallBack("google")));

    //Use linkedin strategy
    passport.use(new LinkedinStrategy({
            clientID: config.linkedin.clientID,
            clientSecret: config.linkedin.clientSecret,
            callbackURL: config.linkedin.callbackURL,
            scope: ['r_basicprofile'],
            passReqToCallback:true
        },authentication.authenticationCallBack("linkedin")));
};
