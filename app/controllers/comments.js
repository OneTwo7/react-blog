const Comment = require('mongoose').model('Comment');
const { correctUser } = require('../utils/auth');
const { populateAuthorField } = require('../utils/helpers');

exports.getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({ post_id: req.params.id })
    .populate('author', 'name').sort({ created_at: -1 });
    res.send(comments);
  } catch (e) {
    res.status(400);
    res.send({ reason: e.toString() });
  }
};

exports.createComment = async (req, res) => {
  const data = req.body;
  data.author = req.user._id;

  try {
    const comment = await Comment.create(data);
    res.send(populateAuthorField(comment, req.user));
  } catch (e) {
    res.status(400);
    res.send({ reason: e.toString() });
  }
};

exports.updateComment = async (req, res) => {
  const { content } = req.body;

  try {
    const comment = await Comment.findOne({ _id: req.params.commentId });
    if (correctUser(req, res, comment.author)) {
      comment.content = content;
      const updatedComment = await comment.save();
      res.send(populateAuthorField(updatedComment, req.user));
    }
  } catch (e) {
    res.status(400);
    res.send({ reason: e.toString() });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.commentId });
    if (correctUser(req, res, comment.author)) {
      await comment.remove();
      res.status(200);
      res.end();
    }
  } catch (e) {
    res.status(400);
    res.send({ reason: e.toString() });
  }
};
