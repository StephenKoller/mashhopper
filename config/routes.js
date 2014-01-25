'use strict';

module.exports = function(app, passport, auth) {
    var talks = require('../app/controllers/talks');
    app.get('/talks', talks.all);
    app.get('/schedule', talks.all);

    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

    //Setting up the users api
    app.post('/users', users.create);
    app.post('/users/toggle', users.toggle)
    app.post('/users/:userId', auth.requiresLogin, auth.user.hasAuthorization, users.update);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the linkedin oauth routes
    app.get('/auth/linkedin', passport.authenticate('linkedin', {
        failureRedirect: '/signin',
        scope: ['r_basicprofile'],
        state: "dev4myappUpunk",
    }), users.signin);

    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
        failureRedirect: '/signin',
        state: "dev4myappUpunk"
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter'), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook'), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github'), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes for linking to existing account
    app.get('/users/link/github', passport.authenticate('github'), users.linkAccount);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/#!/profile'
    }), users.linkAccountCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    var graphs = require('../app/controllers/graphs');
    app.get('/graphs', graphs.all);

    //Article Routes
    var articles = require('../app/controllers/articles');
    app.get('/articles', articles.all);
    app.post('/articles', auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);

    //Finish with setting up the articleId param
    app.param('articleId', articles.article);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', auth.requiresLogin, index.render);
    app.get('/', users.signin);

};