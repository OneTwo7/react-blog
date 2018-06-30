const User = require('mongoose').model('User');
const { prepareUser } = require('../utils/helpers');
const encrypt = require('../utils/encrypt');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { name: 1 });
    res.send(users);
  } catch (e) {
    res.status(400);
    res.send({ reason: e.toString() });
  }
};

exports.createUser = async (req, res) => {
  const { email, name, password } = req.body;

  if (email.length < 6 || password.length < 6) {
    return res.status(400).send({
      reason: 'Email/Password should be at least 6 characters long!'
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(409);
      res.send({ reason: 'User with that email already exists!' });
    } else {
      const salt = encrypt.createSalt();
      const pwd_hash = encrypt.hashPws(salt, password);
      const data = { email, name, salt, pws_hash };

      const newUser = await User.create(data);
      req.logIn(newUser);
      res.send(prepareUser(newUser));
    }
  } catch (e) {
    res.status(400);
    res.send({ reason: e.toString() });
  }
};
