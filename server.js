const config = require('./config');
const express = require('express');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

passport.serializeUser(function (user, done) {
  console.log('serializing', user);
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  console.log('deserializing', obj);
  done(null, obj);
});

passport.use(new TwitterStrategy({
  consumerKey: config.CONSUMER_KEY,
  consumerSecret: config.CONSUMER_SECRET,
  callbackURL: 'http://localhost:3001/auth/twitter/callback'
}, function (token, tokenSecret, profile, done) {
  // look up the user in your database and send
  // that instead of the entire twitter profile
  done(null, profile);
}));

var app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(express.session({secret: 'ohsosecret'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function (req, res) {
    // you are here after approving twitter auth.  the user
    // stored in the session is controlled by what you return
    // on line 23
    res.send(req.user);
  }
);

// you can visit this after auth to view the session
app.get('/me', function (req, res) {
  res.send(req.user);
});

module.exports = app;
