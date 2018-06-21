const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
const { hasError, uploadPictures } = require('../utils/helpers');

exports.getPosts = (req, res) => {
  Post.find({}).exec(function (err, collection) {
    if (!hasError(err, res)) {
      res.send(collection);
    }
  });
};

exports.createPost = (req, res) => {
  const { body: data, files } = req;
  const { pictureFields } = data;

  delete data.pictureFields;

  uploadPictures(res, files, pictureFields).then(pictures => {
    data.pictures = pictures;

    Post.create(data, (err, post) => {
      if (!hasError(err, res)) {
        res.send(post);
      }
    });
  }).catch(error => {
    hasError(error, res, 403);
  });
};

exports.updatePost = (req, res) => {
  const { body: data, files } = req;
  const { pictureFields } = data;
  let { removedPictures } = data;

  if (removedPictures !== 'undefined' && !Array.isArray(removedPictures)) {
    removedPictures = [removedPictures];
  }

  uploadPictures(res, files, pictureFields).then(pictures => {
    Post.findOne({ _id: data._id }).exec((err, post) => {
      if (!hasError(err, res)) {
        post.title = data.title;
        post.content = data.content;
        post.category = data.category;
        post.tags = data.tags;

        let postPictures = post.pictures;

        if (removedPictures !== 'undefined') {
          postPictures = postPictures.filter(({ field }) => (
            !removedPictures.includes(field)
          ));
        }

        post.pictures = postPictures.concat(pictures);

        post.save((err) => {
          if (!hasError(err, res)) {
            res.send(post);
          }
        });
      }
    });
  }).catch(error => {
    hasError(error, res, 403);
  });
};

exports.deletePost = (req, res) => {
  const post_id = req.params.id;
  Post.remove({ _id: post_id }, (err) => {
    if (!hasError(err, res)) {
      Comment.remove({ post_id: post_id }, (err) => {
        if (!hasError(err, res)) {
          res.status(200);
          res.end();
        }
      });
    }
  });
};
