'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Talks = mongoose.model('Talk'),
    _ = require('lodash');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }

            return res.render('users/signup', {
                message: message,
                user: user
            });
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/');
        });
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

exports.update = function(req, res) {
    var user = req.user;

    user = _.extend(user, req.body);


    user.save(function(err) {
        if (err)
            console.log(err);
    });
    res.send({
        status: 200
    });
};

exports.toggle = function(req, res, next) {
    var user = req.user;
    var options = req.body;
    Talks.load(options.talkId, function(err, talk) {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (options.adding) {
            if (!talk.Users) {
                talk.Users = [];
            }
            talk.Users.push(user._id);
            user.talks.push(talk._id);
        } else {
            talk.Users = _.without(talk.Users, user._id.toString());
            user.talks = _.without(user.talks, talk._id.toString());
        }
        user.save();
        talk.save();
        res.send(true);
    });
};

exports.toggleLandingPage = function(req, res) {
    var user = req.user;
    user.showLandingPage = !user.showLandingPage;
    user.save();
    res.send(true);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    console.log('id needs to be an int:' + id);
    User.findOne({
        _id: id
    }).exec(function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load User ' + id));
        req.profile = user;
        next();
    });
};

exports.linkAccount = function() {

};

exports.linkAccountCallback = function() {

};


exports.contact = function(req, res) {
    //log event using event service (add event to user object)
    res.send(200);
};