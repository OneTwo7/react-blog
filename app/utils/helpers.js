const prepareUser = ({ _id, email, name, roles }) => ({
  _id, email, name, roles
});

exports.hasError = (err, res, status = 400) => {
  if (err) {
    res.status(status);
    res.send({ reason: err.toString() });
    return true;
  }
  return false;
};

exports.prepareUser = prepareUser;

exports.sendUser = (req, res) => {
  if (req.user) {
    res.send(prepareUser(req.user));
  } else {
    res.send(null);
  }
};

exports.logoutUser = (req, res) => {
  req.logout();
  res.redirect('/');
};
