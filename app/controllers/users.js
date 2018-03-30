const User = require('mongoose').model('User');
const { prepareUser } = require('../utils/helpers');

exports.getUsers = (req, res) => {
  User.find({}).exec(function (err, collection) {
    const users = [];
    collection.forEach(user => {
      users.push(prepareUser(user));
    })
    res.send(users);
  });
};
