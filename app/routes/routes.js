const router = require('express').Router();
const path = require('path');
const passport = require('passport');
const userRoutes = require('./users');
const postRoutes = require('./posts');
const commentRoutes = require('./comments');
const { sendUser, logoutUser } = require('../utils/helpers');

module.exports = (app) => {

  app.use('/', router);

  router.use('/api/users', userRoutes);

  router.use('/api/posts', postRoutes);

  router.use('/api/posts/:id/comments', commentRoutes);

  router.post('/api/login', passport.authenticate('local'), sendUser);

  router.get('/api/logout', logoutUser);

  router.get('/api/current_user', sendUser);

  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../src/index.html'));
  });

};
