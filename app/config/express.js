const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const path = require('path');

module.exports = (app, keys) => {

  app.use(bodyParser.json());
  app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  }));
  app.use(cookieParser());

  app.use(passport.initialize());
  app.use(passport.session());

};
