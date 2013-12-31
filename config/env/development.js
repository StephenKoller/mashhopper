'use strict';

module.exports = {
    db: "mongodb://localhost/mean-dev",
    app: {
        name: "MEAN - A Modern Stack - Development"
    },
    facebook: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    twitter: {
        clientID: "CONSUMER_KEY",
        clientSecret: "CONSUMER_SECRET",
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    github: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    google: {
        clientID: "1090053842878-stj45vgra7imlc5dut73dkoo1auekid2.apps.googleusercontent.com",
        clientSecret: "yMHWQF7MFNLK9CtauLiyucgf",
        callbackURL: "http://localhost:3000/auth/google/callback"
    }
}
