const Comment = require('mongoose').model('Comment');
const { hasError } = require('../../utils/helpers');
const { options, generateId, exceedsSizeLimit } = require('../helpers');

exports.getCommentsByPostId = (req, res) => {
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

  Comment.find({ post_id: id }).exec(function (err, collection) {
    if (!hasError(err, res)) {
      let comments = collection;
      if (cookieComments) {
        comments = comments.concat(cookieComments);
      }
      res.send(comments);
    }
  });
};

exports.createComment = (req, res) => {
  const { id } = req.params;
  const comment = Object.assign({}, req.body);
  const cookieKey = `comments-${id}`;
  let cookieComments = req.cookies[cookieKey];

  comment._id = generateId();
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
