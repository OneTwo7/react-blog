const Comment = require('mongoose').model('Comment');
const { hasError } = require('../utils/helpers');

exports.getCommentsByPostId = (req, res) => {
  Comment.find({ post_id: req.params.id }).exec(function (err, collection) {
    if (!hasError(err, res)) {
      res.send(collection);
    }
  });
};

exports.createComment = (req, res) => {
  const data = req.body;

  Comment.create(data, (err, comment) => {
    if (!hasError(err, res)) {

      res.send(comment);
    }
  });
};

exports.updateComment = (req, res) => {
  const { content } = req.body;

  Comment.findByIdAndUpdate(req.params.commentId, { $set: { content } }, {
    new: true
  }, (err, comment) => {
    if (!hasError(err, res)) {
      res.send(comment);
    }
  });
};

exports.deleteComment = (req, res) => {
  Comment.remove({ _id: req.params.commentId }, (err) => {
    if (!hasError(err, res)) {

      res.status(200);
      res.end();
    }
  });
};
