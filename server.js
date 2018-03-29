const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const port = 3000;
const app = express();

const env = process.env.NODE_ENV || 'development';

const keys = require('./app/config/keys');
const mongoose = require('mongoose');

mongoose.connect(keys.mongoURI).catch(err => {
  console.log('encountered error when connecting to DB -', err);
});

require('./app/models/User');
require('./app/models/Post');
require('./app/models/Comment');

if (env === 'development') {
  require('./app/services/webpack.js')(app);
}

require('./app/services/passport');

app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'src')));

require('./app/routes/routes')(app);

app.listen(port, err => {
  if (err) {
    console.log(err);
    throw(err);
  }
  console.log(`Listening on port ${port}...`);
});
