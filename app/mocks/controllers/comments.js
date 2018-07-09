const Comment = require('mongoose').model('Comment');
const { options, generateId, exceedsSizeLimit } = require('../helpers');

exports.getCommentsByPostId = async (req, res) => {
  const { id } = req.params;
  const cookieComments = req.cookies[`comments-${id}`];

  if (id.slice(0, 2) === 'id') {
    if (cookieComments) {
      res.send(cookieComments);
    } else {
      res.send([]);
    }
    return;
  }

  try {
    let comments = await Comment.find({ post_id: req.params.id })
    .populate('author', 'name').sort({ created_at: -1 });
    if (cookieComments) {
      comments = comments.concat(cookieComments);
    }
    res.send(comments.reverse());
  } catch (e) {
    res.status(400);
    res.send({ reason: e.toString() });
  }
};

exports.createComment = (req, res) => {
  const { id } = req.params;
  const comment = Object.assign({}, req.body);
  const cookieKey = `comments-${id}`;
  let cookieComments = req.cookies[cookieKey];

  comment._id = generateId();
  comment.author = {
    _id: req.user._id,
    name: req.user.name
  };
  comment.created_at = new Date();

  if (cookieComments) {
    cookieComments.push(comment);
  } else {
    cookieComments = [comment];
  }

  if (!exceedsSizeLimit(cookieComments, 'comments', res)) {
    res.cookie(cookieKey, cookieComments, options);
    res.send(comment);
  }
};

exports.updateComment = (req, res) => {
  const { id, commentId } = req.params;
  const { content } = req.body;
  const cookieKey = `comments-${id}`;
  const cookieComments = req.cookies[cookieKey];

  if (!Array.isArray(cookieComments)) {
    res.status(200);
    return res.end();
  }

  const idx = cookieComments.findIndex(comment => comment._id === commentId);
  const comment = cookieComments[idx];
  comment.content = content;
  cookieComments.splice(idx, 1, comment);

  if (!exceedsSizeLimit(cookieComments, 'comments', res)) {
    res.cookie(cookieKey, cookieComments, options);
    res.send(comment);
  }
};

exports.deleteComment = (req, res) => {
  const { id, commentId } = req.params;
  const cookieKey = `comments-${id}`;
  const cookieComments = req.cookies[cookieKey];

  const idx = cookieComments.findIndex(comment => comment._id === commentId);
  cookieComments.splice(idx, 1);

  res.cookie(cookieKey, cookieComments, options);
  res.status(200);
  res.end();
};
