const User = require('mongoose').model('User');

exports.requiresLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(403);
    res.send({ reason: 'You have to log in to perform that action!' });
  } else {
    next();
  }
};

exports.requiresAdmin = (req, res, next) => {
  if (!req.isAuthenticated() || !req.user.roles.includes('admin')) {
    res.status(403);
    res.send({ reason: 'This action requires administrative privileges!' });
  } else {
    next();
  }
};

exports.correctUser = (req, res, id) => {
  const { user } = req;

  if (!user.roles.includes('admin') && user._id.toString() !== id.toString()) {
    res.status(403);
    res.send({ reason: 'Only the author can perform that action!' });
    return false;
  } else {
    return true;
  }
};

exports.requiresActivation = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const reason = 'Account with provided email does not exist!';
      return res.status(403).send({ reason })
    }
    if (user.activated) {
      next();
    } else {
      const reason = `
        Your account is not activated. Check your email for activation link!
      `;
      res.status(403).send({ reason });
    }
  } catch (e) {
    res.status(400).send({ reason: e.toString() });
  }
};
