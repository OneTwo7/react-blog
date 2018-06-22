const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = mongoose.model('User');
const keys = require('../config/keys');

passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  User.findOne({ email }).exec((err, user) => {
    if (user && user.authenticate(password)) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ id: profile.id }).exec((err, existingUser) => {
    if (existingUser) {
      done(null, existingUser);
    } else {
      const user = new User({ id: profile.id, name: profile.displayName });
      user.save().then(err => {
        done(null, user);
      });
    }
  });
}));

passport.serializeUser((user, done) => {
  if (user) {
    done(null, user._id);
  }
});

passport.deserializeUser((_id, done) => {
  User.findOne({ _id }).exec((err, user) => {
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});
