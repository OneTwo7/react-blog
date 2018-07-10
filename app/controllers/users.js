const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
const { createSalt, hashPwd } = require('../utils/encrypt');
const { prepareUser, logoutUser } = require('../utils/helpers');
const { correctUser } = require('../utils/auth');

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
      const salt = createSalt();
      const pwd_hash = hashPwd(salt, password);
      const data = { email, name, salt, pwd_hash };

      const newUser = await User.create(data);
      req.logIn(newUser, (err) => {
        if (err) {
          throw err;
        }
        res.send(prepareUser(newUser));
      });
    }
  } catch (e) {
    res.status(400).send({ reason: e.toString() });
  }
};

exports.updateUser = async (req, res) => {
  const { name, password } = req.body;
  const { id } = req.params;

  if (correctUser(req, res, id)) {
    try {
      const user = await User.findOne({ _id: id });
      if (name) {
        user.name = name;
      }
      if (password) {
        if (password.length < 6) {
          return res.status(400).send({
            reason: 'Password should be at least 6 characters long!'
          });
        }
        user.salt = createSalt();
        user.pwd_hash = hashPwd(user.salt, password);
      }
      const updatedUser = await user.save();
      res.send(prepareUser(updatedUser));
    } catch (e) {
      res.status(400).send({ reason: e.toString() });
    }
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  if (correctUser(req, res, id)) {
    try {
      await Comment.remove({ author: id });
      await Post.remove({ author: id });
      await User.findOneAndRemove({ _id: id });
      res.end();
    } catch (e) {
      res.status(400).send({ reason: e.toString() });
    }
  }
};
