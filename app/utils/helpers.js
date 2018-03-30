const prepareUser = ({ _id, email, name, roles }) => ({
  _id, email, name, roles
});

exports.hasError = (err, res) => {
  if (err) {
    res.status(400);
    res.send({ reason: err });
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
