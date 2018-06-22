const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const VkStrategy = require('passport-vkontakte').Strategy;
const User = mongoose.model('User');
const keys = require('../config/keys');
const { handleSocialLogin } = require('../utils/helpers');

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
  handleSocialLogin(profile.id, profile.displayName, done);
}));

passport.use(new GithubStrategy({
  clientID: keys.githubClientID,
  clientSecret: keys.githubClientSecret,
  callbackURL: '/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
  handleSocialLogin(profile.id, profile.displayName, done);
}));

passport.use(new VkStrategy({
  clientID: keys.vkClientID,
  clientSecret: keys.vkClientSecret,
  callbackURL: '/auth/vk/callback'
}, (accessToken, refreshToken, params, profile, done) => {
  handleSocialLogin(profile.id, profile.displayName, done);
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
