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
