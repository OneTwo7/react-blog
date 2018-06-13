const Post = require('mongoose').model('Post');
const { hasError } = require('../utils/helpers');

const path = require('path');
const fs = require('fs');

const unlink = (res, tempPath, reason) => {
  fs.unlink(tempPath, err => {
    if (err) {
      return handleError(res, err);
    }

    handleError(res, null, reason);
  });
};

const handleError = (res, err, reason) => {
  if (err) {
    res.status(500).send({ reason: err.toString() });
  } else {
    res.status(403).send({ reason });
  }
};

exports.getPosts = (req, res) => {
  Post.find({}).exec(function (err, collection) {
    if (!hasError(err, res)) {
      res.send(collection);
    }
  });
};

exports.createPost = (req, res) => {
  const data = req.body;
  const files = req.files;
  const fiveMegaBytes = 5 * 1024 * 1024;

  for (let file of files) {
    const name = file.originalname;
    const tempPath = file.path;
    const targetPath = path.join(__dirname, '../..', 'src/img/uploads', name);
    const type = file.mimetype;
    const size = file.size;

    if (!(type === 'image/png' || type === 'image/jpeg')) {
      return unlink(res, tempPath, 'Wrong file type!');
    }

    if (size > fiveMegaBytes) {
      return unlink(res, tempPath, `Picture ${name} is too big!`);
    }

    fs.rename(tempPath, targetPath, err => {
      if (err) {
        return handleError(res, err);
      }
    });
  }

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
