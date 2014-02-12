'use strict';

module.exports = function(app, passport, auth) {
    var authService = require('../app/services/authentication');
    var talks = require('../app/controllers/talks');
    var game = require('../app/services/game');
    app.get('/talks', talks.all);
    app.get('/schedule', talks.all);

    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

    //Setting up the users api
    app.post('/users/toggle', users.toggle)
    app.post('/users/contact', users.contact);
    app.post('/users/:userId', auth.requiresLogin, auth.user.hasAuthorization, users.update);

    app.post('/users', users.create);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        successRedirect: '/home',
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', authService.authenticate(passport.authenticate('google', {
        successRedirect: '/home',
        failureRedirect: '/signin'
    })), users.authCallback);

    //Setting the linkedin oauth routes
    app.get('/auth/linkedin', passport.authenticate('linkedin', {
        successRedirect: '/home',
        failureRedirect: '/signin',
        scope: ['r_basicprofile'],
        state: "dev4myappUpunk",
    }), users.signin);

    app.get('/auth/linkedin/callback', authService.authenticate(passport.authenticate('linkedin', {
        successRedirect: '/home',
        failureRedirect: '/signin',
        state: "dev4myappUpunk"
    })), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter'), users.signin);

    app.get('/auth/twitter/callback', authService.authenticate(passport.authenticate('twitter', {
        successRedirect: '/home',
        failureRedirect: '/signin'
    })), users.authCallback);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook'), users.signin);

    app.get('/auth/facebook/callback', authService.authenticate(passport.authenticate('facebook', {
        successRedirect: '/home',
        failureRedirect: '/signin'
    })), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github'), users.signin);

    app.get('/auth/github/callback', authService.authenticate(passport.authenticate('github', {
        successRedirect: '/home',
        failureRedirect: '/signin'
    })), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    var graphs = require('../app/controllers/graphs');
    app.get('/graphs', graphs.all);
    
    //Users QR code scanned at booth
    app.get('/event/boothVisit', game.userVistsBooth); 



    //authenticated users only here on out.
    var home = require('../app/controllers/home');
    app.get('/home', auth.requiresLogin, home.render);


    //public landing page. no auth required.
    var index = require('../app/controllers/index');
    app.get('/', index.render);



    //if user falls past auth they get directed to signin.
    //this seems odd. need to review this.
    //app.get('/', users.signin);

};
