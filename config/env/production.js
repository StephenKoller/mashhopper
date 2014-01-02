'use strict';

module.exports = {
    db: process.env.MONGOHQ_URL,
    app: {
        name: "MashHopper - Production"
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
        callbackURL: "http://obscure-citadel-2994.herokuapp.com/auth/google/callback"
    }
}