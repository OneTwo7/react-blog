const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
const { createSalt, hashPwd, createToken } = require('../utils/encrypt');
const { prepareUser, logoutUser } = require('../utils/helpers');
const { correctUser } = require('../utils/auth');
const sendEmail = require('../services/mailer');
const template = require('../services/emailTemplates/template');

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
      const token = createToken();
      const activation_digest = hashPwd(salt, token);
      const data = { email, name, salt, pwd_hash, activation_digest };

      const newUser = await User.create(data);
      const encodedToken = encodeURIComponent(token);
      const encodedEmail = encodeURIComponent(email);
      const emailData = {
        title: 'Welcome to React Blog App',
        body: 'Follow the link to activate your account:',
        link: `/api/users/${encodedEmail}/activate/${encodedToken}`,
        text: 'activation link'
      };
      await sendEmail('Account activation', email, template(emailData));
      res.status(200).end();
    }
  } catch (e) {
    res.status(400).send({ reason: e.toString() });
  }
};

exports.activateUser = async (req, res) => {
  const { email, token } = req.params;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const { activated, activation_digest, salt } = user;
      if (!activated && activation_digest === hashPwd(salt, token)) {
        user.activated = true;
        const activatedUser = await user.save();
        req.logIn(activatedUser, (err) => {
          if (err) {
            throw err;
          }
          res.redirect('/');
        });
      } else {
        res.status(400).send({ reason: 'Invalid activation link!' });
      }
    } else {
      res.status(400).send({ reason: `${email} is not registered!` });
    }
  } catch (e) {
    res.status(400).send({ reason: e.toString() });
  }
};

exports.generateResetToken = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = createToken();
      user.reset_digest = hashPwd(user.salt, token);
      await user.save();

      const encodedToken = encodeURIComponent(token);
      const encodedEmail = encodeURIComponent(email);
      const emailData = {
        title: 'Password Reset',
        body: 'Use the following link to reset your password:',
        link: `/api/users/${encodedEmail}/reset/${encodedToken}`,
        text: 'reset link'
      };
      await sendEmail('Password reset', email, template(emailData));
      res.status(200).end();
    } else {
      res.status(400).send({ reason: `${email} is not registered!` });
    }
  } catch (e) {
    res.status(400).send({ reason: e.toString() });
  }
};

exports.authenticateResetToken = async (req, res) => {
  const { email, token } = req.params;

  try {
    const user = await User.findOne({ email });
    if (user) {
      if (hashPwd(user.salt, token) === user.reset_digest) {
        user.reset_digest = null;
        const updatedUser = await user.save();
        req.logIn(updatedUser, (err) => {
          if (err) {
            throw err;
          }
          res.redirect('/password_reset');
        });
      } else {
        res.status(400).send({ reason: `Invalid reset link!` });
      }
    } else {
      res.status(400).send({ reason: `${email} is not registered!` });
    }
  } catch (e) {
    res.status(400).send({ reason: e.toString() });
  }
};

exports.updateUser = async (req, res) => {
  const { name, password } = req.body;
  const { id } = req.params;

  if (!name && !password) {
    return res.status(400).send({ reason: 'No update data provided!' });
  }

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
