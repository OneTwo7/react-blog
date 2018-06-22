const router = require('express').Router();
const path = require('path');
const passport = require('passport');
const userRoutes = require('./users');
const postRoutes = require('./posts');
const commentRoutes = require('./comments');
const { sendUser, logoutUser, redirect } = require('../utils/helpers');

module.exports = (app) => {

  app.use('/', router);

  router.use('/api/users', userRoutes);

  router.use('/api/posts', postRoutes);

  router.use('/api/posts/:id/comments', commentRoutes);

  router.post('/api/login', passport.authenticate('local'), sendUser);

  router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  router.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    redirect
  );

  router.get('/auth/facebook', passport.authenticate('facebook'));

  router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook'),
    redirect
  );

  router.get('/auth/vk', passport.authenticate('vkontakte'));

  router.get(
    '/auth/vk/callback',
    passport.authenticate('vkontakte'),
    redirect
  );

  router.get('/api/logout', logoutUser);

  router.get('/api/current_user', sendUser);

  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../src/index.html'));
  });

};
