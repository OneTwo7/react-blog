const router = require('express').Router();
const passport = require('passport');
const userRoutes = require('./users');
const postRoutes = require('./posts');
const commentRoutes = require('./comments');
const authRoutes = require('./auth');
const { sendUser, logoutUser } = require('../utils/helpers');
const { requiresActivation } = require('../utils/auth');

module.exports = (app) => {

  app.use('/', router);

  router.use('/api/users', userRoutes);

  router.use('/api/posts', postRoutes);

  router.use('/api/posts/:id/comments', commentRoutes);

  router.use('/auth', authRoutes);

  router.post(
    '/api/login', requiresActivation, passport.authenticate('local'), sendUser
  );

  router.get('/api/logout', logoutUser);

  router.get('/api/current_user', sendUser);

};
