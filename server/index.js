const express = require('express')
const cors = require('cors')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook')
const keys = require('../config')
const chalk = require('chalk') // helps adding colour to console
const AmazonStrategy = require('passport-amazon').Strategy
const GithubStrategy = require('passport-github').Strategy
const InstagramStrategy = require('passport-instagram').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const TwitchStrategy = require('passport-twitch').Strategy
const SpotifyStrategy = require('passport-spotify').Strategy

let user = {} //for reseting everytime a new way to login is used

passport.serializeUser(fn: (user, cb) => {
    cb(null, user)
})
passport.deserializeUser(fn: (user, cb) => {
    cb(null, user)
})

const app = express()
app.use(cors())
app.use(passport.initialize())


//------------------------FACEBOOK STRATEGY-----------------------------------//

passport.use(new FacebookStrategy({
    clientID: keys.FACEBOOK.clientID,
    clientSecret: keys.FACEBOOK.clientSecret,
    callBackUrl: './auth/facebook/callback'
},
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)))
        user = { ...profile }
        return cb(null, profile)
    }
))

app.get('/auth/facebook', passport.authenticate('facebook'))
app.get('/auth/facebook/callback',
    passport.authenticate(('facebook'),
        (req, res) => {
            res.redirect('/profile')
        }))
//----------------------------------------------AMAZON STRATEGY----------------------------------------------//

passport.use(new AmazonStrategy({
    clientID: keys.AMAZON.clientID,
    clientSecret: keys.AMAZON.clientSecret,
    callBackUrl: './auth/amazon/callback'
},
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)))
        user = { ...profile }
        return cb(null, profile)
    }
))

app.get('/auth/amazon', passport.authenticate('amazon', {
    scope: ['profile']
}))
app.get('/auth/amazon/callback',
    passport.authenticate(('amazon'),
        (req, res) => {
            res.redirect('/profile')
        }))

//----------------------------------------------GITHUB STRATEGY----------------------------------------------//

passport.use(new GithubStrategy({
    clientID: keys.GITHUB.clientID,
    clientSecret: keys.GITHUB.clientSecret,
    callBackUrl: './auth/github/callback'
},
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)))
        user = { ...profile }
        return cb(null, profile)
    }
))

app.get('/auth/github', passport.authenticate('github'))
app.get('/auth/github/callback',
    passport.authenticate(('github'),
        (req, res) => {
            res.redirect('/profile')
        }))

//----------------------------------------------GOOGLE STRATEGY----------------------------------------------//

passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret,
    callBackUrl: './auth/google/callback'
},
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)))
        user = { ...profile }
        return cb(null, profile)
    }
))

app.get('/auth/google', passport.authenticate('google', {
    scope: ["profile", "email"]
}))
app.get('/auth/google/callback',
    passport.authenticate(('google'),
        (req, res) => {
            res.redirect('/profile')
        }))

//----------------------------------------------INSTAGRAM STRATEGY----------------------------------------------//

passport.use(new InstagramStrategy({
    clientID: keys.INSTAGRAM.clientID,
    clientSecret: keys.INSTAGRAM.clientSecret,
    callBackUrl: './auth/instagram/callback'
},
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)))
        user = { ...profile }
        return cb(null, profile)
    }
))

app.get('/auth/instagram', passport.authenticate('instagram'))
app.get('/auth/instagram/callback',
    passport.authenticate(('instagram'),
        (req, res) => {
            res.redirect('/profile')
        }))

//----------------------------------------------SPOTIFY STRATEGY----------------------------------------------//

passport.use(new SpotifyStrategy({
    clientID: keys.SPOTIFY.clientID,
    clientSecret: keys.SPOTIFY.clientSecret,
    callBackUrl: './auth/spotify/callback'
},
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)))
        user = { ...profile }
        return cb(null, profile)
    }
))

app.get('/auth/spotify', passport.authenticate('spotify'))
app.get('/auth/spotify/callback',
    passport.authenticate(('spotify'),
        (req, res) => {
            res.redirect('/profile')
        }))

//----------------------------------------------TWITCH STRATEGY----------------------------------------------//

passport.use(new TwitchStrategy({
    clientID: keys.TWITCH.clientID,
    clientSecret: keys.TWITCH.clientSecret,
    callBackUrl: './auth/twitch/callback'
},
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)))
        user = { ...profile }
        return cb(null, profile)
    }
))

app.get('/auth/twitch', passport.authenticate('twitch'))
app.get('/auth/twitch/callback',
    passport.authenticate(('twitch'),
        (req, res) => {
            res.redirect('/profile')
        }))

app.get('/user', (req, res) => {
    console.log("getting user data")
    res.send(user)
})


app.get('/auth/logout', (req, res) => {
    console.log('loggin out')
    user = {}
    res.redirect('/')
})
const PORT = 5000
app.listen(PORT)