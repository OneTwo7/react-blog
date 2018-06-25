const Post = require('mongoose').model('Post');
const { hasError, uploadPictures } = require('../../utils/helpers');
const { options, generateId, exceedsSizeLimit } = require('../helpers');

exports.getPosts = (req, res) => {
  const posts = [];
  const { cookies } = req;

  for (let key in cookies) {
    if (key.split('-')[0] === 'post') {
      posts.push(cookies[key]);
    }
  }

  Post.find({}).exec(function (err, collection) {
    if (!hasError(err, res)) {
      res.send(collection.concat(posts));
    }
  });
};

exports.createPost = (req, res) => {
  const { body: data, files } = req;
  const { pictureFields } = data;

  delete data.mainPicture;
  delete data.pictureFields;

  const post = Object.assign({}, data);
  const postId = generateId();
  post._id = postId;
  post.created_at = new Date();

  uploadPictures(res, files, pictureFields).then(pictures => {
    post.pictures = pictures;

    if (!exceedsSizeLimit(post, 'posts', res)) {
      res.cookie(`post-${postId}`, post, options);
      res.send(post);
    }
  }).catch(error => {
    hasError(error, res, 403);
  });
};

exports.updatePost = (req, res) => {
  const { body: data, files } = req;
  const { pictureFields, mainPicture } = data;
  let { removedPictures } = data;

  if (removedPictures !== 'undefined' && !Array.isArray(removedPictures)) {
    removedPictures = [removedPictures];
  }

  uploadPictures(res, files, pictureFields).then(pictures => {
    const cookieKey = `post-${data._id}`;
    const post = req.cookies[cookieKey];

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

    postPictures = postPictures.concat(pictures);

    if (mainPicture) {
      let main;
      const otherPictures = postPictures.filter(pic => {
        if (pic.field !== mainPicture) {
          return true;
        } else {
          main = pic;
          return false;
        }
      });
      postPictures = [main, ...otherPictures];
    }

    post.pictures = postPictures;

    if (!exceedsSizeLimit(post, 'posts', res)) {
      res.cookie(cookieKey, post, options);
      res.send(post);
    }
  }).catch(error => {
    hasError(error, res, 403);
  });
};

exports.deletePost = (req, res) => {
  const postId = req.params.id;
  res.clearCookie(`post-${postId}`);
  res.clearCookie(`comments-${postId}`);
  res.status(200);
  res.end();
};
