const Post = require('mongoose').model('Post');
const { hasError } = require('../utils/helpers');

exports.getPosts = (req, res) => {
  Post.find({}).exec(function (err, collection) {
    if (!hasError(err, res)) {
      res.send(collection);
    }
  });
};

exports.createPost = (req, res) => {
  const data = req.body;

  Post.create(data, (err, post) => {
    if (!hasError(err, res)) {
      res.send(post);
    }
  });
};

exports.updatePost = (req, res) => {
  const { content } = req.body;

  Post.findOne({ _id: req.params.id }).exec((err, post) => {
    if (!hasError(err, res)) {

      post.content = content;

      post.save((err) => {
        if (!hasError(err, res)) {
          res.send(post);
        }
      });
    }
  });
};

exports.deletePost = (req, res) => {
  Post.remove({ _id: req.params.id }, (err) => {
    if (!hasError(err, res)) {
      res.status(200);
      res.end();
    }
  });
};
