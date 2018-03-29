const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

const prepareUser = ({ _id, email, name, roles }) => ({
  _id, email, name, roles
});

const sendUser = (req, res) => {
  if (req.user) {
    res.send(prepareUser(req.user));
  } else {
    res.send(null);
  }
};

module.exports = (app) => {

  app.post('/api/login', passport.authenticate('local'), sendUser);

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', sendUser);

  app.get('/api/users', (req, res) => {
    User.find({}).exec(function (err, collection) {
      const users = [];
      collection.forEach(user => {
        users.push(prepareUser(user));
      })
      res.send(users);
    });
  });

  app.get('/api/posts', (req, res) => {
    Post.find({}).exec(function (err, collection) {
      res.send(collection);
    });
  });

  app.post('/api/posts', (req, res) => {
    const data = req.body;

    Post.create(data, (err, post) => {
      if (err) {
        res.status(400);
        return res.send({ reason: err.toString() });
      }
      res.send(post);
    });
  });

  app.put('/api/posts/:id', (req, res) => {
    const { content } = req.body;

    Post.findOne({ _id: req.params.id }).exec((err, post) => {
      if (err) {
        res.status(400);
        return res.send({ reason: err.toString() });
      }

      post.content = content;

      post.save((err) => {
        if (err) {
          res.status(400);
          return res.send({ reason: err.toString() });
        }
        res.send(post);
      });
    });
  });

  app.delete('/api/posts/:id', (req, res) => {
    Post.remove({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(400);
        return res.send({ reason: err.toString() });
      }
      res.status(200);
      res.end();
    });
  });

  app.get('/api/posts/:id/comments', (req, res) => {
    Comment.find({ post_id: req.params.id }).exec(function (err, collection) {
      res.send(collection);
    });
  });

  app.post('/api/posts/:id/comments', (req, res) => {
    const data = req.body;

    Comment.create(data, (err, comment) => {
      if (err) {
        res.status(400);
        return res.send({ reason: err.toString() });
      }

      Post.findByIdAndUpdate(req.params.id, { $inc: { comments: 1 } })
      .exec();

      res.send(comment);
    });
  });

  app.put('/api/posts/:id/comments/:commentId', (req, res) => {
    const { content } = req.body;

    Comment.findByIdAndUpdate(req.params.commentId, { $set: { content } }, {
      new: true
    }, (err, comment) => {
      if (err) {
        res.status(400);
        return res.send({ reason: err.toString() });
      }
      res.send(comment);
    });
  });

  app.delete('/api/posts/:id/comments/:commentId', (req, res) => {
    Comment.remove({ _id: req.params.commentId }, (err) => {
      if (err) {
        res.status(400);
        return res.send({ reason: err.toString() });
      }

      Post.findByIdAndUpdate(req.params.id, { $inc: { comments: -1 } })
      .exec();

      res.status(200);
      res.end();
    });
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../src/index.html'));
  });

};
