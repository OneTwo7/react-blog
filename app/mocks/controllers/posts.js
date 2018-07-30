const Post = require('mongoose').model('Post');
const { uploadPictures } = require('../../utils/helpers');
const { options, generateId, exceedsSizeLimit } = require('../helpers');

exports.getPosts = async (req, res) => {
  const posts = [];
  const { cookies } = req;

  for (let key in cookies) {
    if (key.split('-')[0] === 'post') {
      posts.push(cookies[key]);
    }
  }

  try {
    const dbPosts = await Post.find({}).populate('author', 'name')
    .sort({ created_at: -1 });
    res.send(posts.reverse().concat(dbPosts));
  } catch (e) {
    res.status(400);
    res.send({ reason: e.toString() });
  }
};

exports.createPost = async (req, res) => {
  const { body: data, files } = req;
  const { pictureFields } = data;
  const { lang } = req.cookies;

  delete data.mainPicture;
  delete data.pictureFields;

  const post = Object.assign({}, data);
  const postId = generateId();
  post._id = postId;
  post.author = {
    _id: req.user._id,
    name: req.user.name
  };
  post.created_at = new Date();

  try {
    post.pictures = await uploadPictures(files, pictureFields, lang);

    if (!exceedsSizeLimit(post, 'posts', res)) {
      res.cookie(`post-${postId}`, post, options);
      res.send(post);
    }
  } catch (e) {
    res.status(400);
    res.send({ reason: e.toString() });
  }
};

exports.updatePost = async (req, res) => {
  const { body: data, files } = req;
  const { pictureFields, mainPicture } = data;
  let { removedPictures } = data;
  const { lang } = req.cookies;

  if (removedPictures !== 'undefined' && !Array.isArray(removedPictures)) {
    removedPictures = [removedPictures];
  }

  try {
    const pictures = await uploadPictures(files, pictureFields, lang);
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
      const otherPictures = postPictures.filter(picture => {
        if (picture.field !== mainPicture) {
          return true;
        } else {
          main = picture;
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
  } catch (e) {
    res.status(400);
    res.send({ reason: e.toString() });
  }
};

exports.deletePost = (req, res) => {
  const postId = req.params.id;
  res.clearCookie(`post-${postId}`);
  res.clearCookie(`comments-${postId}`);
  res.status(200);
  res.end();
};
