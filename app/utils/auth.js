const User = require('mongoose').model('User');
const strings = require('../strings/utils');

exports.requiresLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    const { lang = 'ru' } = req.cookies;
    res.status(403);
    res.send({ reason: strings[req.cookies.lang].auth.reqLogin });
  } else {
    next();
  }
};

exports.requiresAdmin = (req, res, next) => {
  if (!req.isAuthenticated() || !req.user.roles.includes('admin')) {
    const { lang = 'ru' } = req.cookies;
    res.status(403);
    res.send({ reason: strings[req.cookies.lang].auth.reqAdmin });
  } else {
    next();
  }
};

exports.correctUser = (req, res, id) => {
  const { user } = req;

  if (!user.roles.includes('admin') && user._id.toString() !== id.toString()) {
    const { lang = 'ru' } = req.cookies;
    res.status(403);
    res.send({ reason: strings[req.cookies.lang].auth.reqAuthor });
    return false;
  } else {
    return true;
  }
};

exports.requiresActivation = async (req, res, next) => {
  const { email } = req.body;
  const { lang = 'ru' } = req.cookies;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const reason = strings[lang].auth.notFoundError;
      return res.status(403).send({ reason })
    }
    if (user.activated) {
      next();
    } else {
      const reason = strings[lang].auth.notActiveError;
      res.status(403).send({ reason });
    }
  } catch (e) {
    res.status(400).send({ reason: e.toString() });
  }
};
