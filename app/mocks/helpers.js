const errorMessages = {
  'posts': 'Post is too long!',
  'comments': 'The comments size limit for this post exceeded!'
};

exports.options = {
  maxAge: 3600000
};

exports.generateId = () => (
  'id' + Math.random().toString(36).split('.')[1]
);

exports.exceedsSizeLimit = (object, type, res) => {
  if (object.toString().length > 2048) {
    res.status(400);
    res.send({ reason: errorMessages[type] });
    return true;
  } else {
    return false;
  }
};
