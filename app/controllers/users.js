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

    //this should be in a node service.
    // if addin
    
    Talks.find().exec(function(talks){
        //we need to update the talk schema to have a user id array

        talks.forEach(function(talk) {
            //remove user from all talks.
            if (!talk.users) {
                talk.users = [];
            }

            talk.users = _.without(talks.users, user.Id);

        });
    });
    
    user.save(function(err){
        if(err)
            console.log(err);
    });
};

exports.toggle = function(req, res) {
    var user = req.user;
    var options = req.body;
    Talks.load(options.talkId, function(err, talk){
        if (err) {
            console.log(err);
            return next(err);
        }
        if (options.adding) {
            if (!talk.users) {
                 talk.users = [];
            }
            talk.users.push(user._id);
            user.talks.push(talk.Id);
        } else {
            talk.users = _.without(talk.users, user._id);
            user.talks = _.without(user.talks, talk.Id);
        }
        user.save();
        talk.save();
        res.send(true);
    });
};
    
/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};

