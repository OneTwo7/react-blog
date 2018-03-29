const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

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
