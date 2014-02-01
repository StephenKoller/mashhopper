'use strict';

module.exports = {
    db: process.env.MONGOHQ_URL,
    app: {
        name: "EventHopper"
    },
    facebook: {
        clientID: process.env.FACEBOOK_CLIENTID,
        clientSecret: process.env.FACEBOOK_CLIENTID,
        callbackURL: process.env.FACEBOOK_CLIENTID
    },
    twitter: {
        clientID: process.env.TWITTER_CLIENTID,
        clientSecret: process.env.TWITTER_CLIENTSECRET,
        callbackURL: process.env.TWITTER_CALLBACKURL
    },
    github: {
        clientID: process.env.GITHUB_CLIENTID,
        clientSecret: process.env.GITHUB_CLIENTSECRET,
        callbackURL: process.env.GITHUB_CALLBACKURL
    },
    google: {
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENTSECRET,
        callbackURL: process.env.GOOGLE_CALLBACKURL
    },
     linkedin: {
        clientID: process.env.LINKEDIN_CLIENTID,
        clientSecret: process.env.LINKEDIN_CLIENTSECRET,
        callbackURL: process.env.LINKEDIN_CALLBACKURL
    }
}