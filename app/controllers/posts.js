const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
const { uploadPictures } = require('../utils/helpers');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ created_at: -1 });
    res.send(posts);
  } catch (e) {
    res.status(400);
    res.send({ reason: e.toString() });
  }
};

exports.createPost = async (req, res) => {
  const { body: data, files } = req;
  const { pictureFields } = data;

  delete data.pictureFields;

  try {
    data.pictures = await uploadPictures(files, pictureFields);
    const post = await Post.create(data);
    res.send(post);
  } catch (e) {
    res.status(400);
    res.send({ reason: e.toString() });
  }
};

exports.updatePost = async (req, res) => {
  const { body: data, files } = req;
  const { pictureFields, mainPicture } = data;
  let { removedPictures } = data;

  if (removedPictures !== 'undefined' && !Array.isArray(removedPictures)) {
    removedPictures = [removedPictures];
  }

  try {
    const pictures = await uploadPictures(files, pictureFields);
    const post = await Post.findOne({ _id: data._id });
    post.title = data.title;
    post.content = data.content;
    post.category = data.category;
    post.tags = post.tags;
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
    const updatedPost = await post.save();
    res.send(updatedPost);
  } catch (e) {
    res.status(400);
    res.send({ reason: e.toString() });
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    await Post.remove({ _id: postId });
    await Comment.remove({ post_id: postId });
    res.status(200);
    res.end();
  } catch (e) {
    res.status(400);
    res.send({ reason: e.toString() });
  }
};
