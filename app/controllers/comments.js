const Comment = require('mongoose').model('Comment');
const { correctUser } = require('../utils/auth');

exports.getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({ post_id: req.params.id }).sort({
      created_at: -1
    });
    res.send(comments);
  } catch (e) {
    res.status(400);
    res.send({ reason: e.toString() });
  }
};

exports.createComment = async (req, res) => {
  const data = req.body;

  try {
    const comment = await Comment.create(data);
    res.send(comment);
  } catch (e) {
    res.status(400);
    res.send({ reason: e.toString() });
  }
};

exports.updateComment = async (req, res) => {
  const { author, content } = req.body;

  if (correctUser(req, res, author)) {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        { $set: { content } },
        { new: true }
      );
      res.send(comment);
    } catch (e) {
      res.status(400);
      res.send({ reason: e.toString() });
    }
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
