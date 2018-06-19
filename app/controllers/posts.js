const Post = require('mongoose').model('Post');
const { hasError } = require('../utils/helpers');
const path = require('path');
const fs = require('fs');

const uploadPictures = (res, files, pictureFields) => {
  return new Promise((resolve, reject) => {
    if (!pictureFields) {
      resolve([]);
    }

    const fiveMegaBytes = 5 * 1024 * 1024;
    const fields = Array.prototype.concat(pictureFields);
    const fieldsLength = fields.length;
    const pictures = [];

    for (let file of files) {
      const { originalname: name, path: tempPath, mimetype, size } = file;
      const target = path.join(__dirname, '../..', 'src/img/uploads', name);

      if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
        fs.unlink(tempPath, err => {
          if (!hasError(err, res, 500)) {
            reject('Wrong file type!');
          }
        });
      }

      if (size > fiveMegaBytes) {
        fs.unlink(tempPath, err => {
          if (!hasError(err, res, 500)) {
            reject(`Picture ${name} is too big!`);
          }
        });
      }

      fs.rename(tempPath, target, err => {
        if (!hasError(err, res, 500)) {
          pictures.push({
            field: fields.shift(),
            url: `/img/uploads/${name}`
          });
          if (pictures.length === fieldsLength) {
            resolve(pictures);
          }
        }
      });
    }
  });
};

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

  delete data.pictureFields;

  uploadPictures(res, files, pictureFields).then(pictures => {
    Post.findOne({ _id: data._id }).exec((err, post) => {
      if (!hasError(err, res)) {
        post.title = data.title;
        post.content = data.content;
        post.category = data.category;
        post.tags = data.tags;
        post.pictures = post.pictures.concat(pictures);

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
  Post.remove({ _id: req.params.id }, (err) => {
    if (!hasError(err, res)) {
      res.status(200);
      res.end();
    }
  });
};
