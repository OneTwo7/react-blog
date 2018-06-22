const User = require('mongoose').model('User');
const { prepareUser, hasError } = require('../utils/helpers');
const encrypt = require('../utils/encrypt');

exports.getUsers = (req, res) => {
  User.find({}).exec(function (err, collection) {
    const users = [];
    collection.forEach(user => {
      users.push(prepareUser(user));
    })
    res.send(users);
  });
};

exports.createUser = (req, res) => {
  const { email, name, password } = req.body;

  if (email.length < 6 || password.length < 6) {
    return res.status(400).send({
      reason: 'Email/Password should be at least 6 characters long!'
    });
  }

  const salt = encrypt.createSalt();
  const pwd_hash = encrypt.hashPwd(salt, password);

  const data = { email, name, salt, pwd_hash };

  User.create(data, (err, user) => {
    if (!hasError(err, res)) {
      req.logIn(user, (err) => {
        if (!hasError(err)) {
          res.send(prepareUser(user));
        }
      });
    }
  });
};
