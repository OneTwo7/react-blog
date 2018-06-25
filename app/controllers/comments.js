const Comment = require('mongoose').model('Comment');
const { hasError } = require('../utils/helpers');
const { correctUser } = require('../utils/auth');

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
  const { author, content } = req.body;

  if (correctUser(req, res, author)) {
    Comment.findByIdAndUpdate(req.params.commentId, { $set: { content } }, {
      new: true
    }, (err, comment) => {
      if (!hasError(err, res)) {
        res.send(comment);
      }
    });
  }
};

exports.deleteComment = (req, res) => {
  Comment.findOne({ _id: req.params.commentId }).exec((err, comment) => {
    if (!hasError(err, res)) {
      if (correctUser(req, res, comment.author)) {
        comment.remove((err) => {
          if (!hasError(err, res)) {
            res.status(200);
            res.end();
          }
        })
      }
    }
  });
};
