module.exports = (keys) => {

  const mongoose = require('mongoose');

  mongoose.connect(keys.mongoURI).catch(err => {
    console.log('encountered error when connecting to DB -', err);
  });

  require('../models/User');
  require('../models/Post');
  require('../models/Comment');

};
