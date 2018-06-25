const router = require('express').Router();
const path = require('path');
const passport = require('passport');
const userRoutes = require('../routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const authRoutes = require('../routes/auth');
const { sendUser, logoutUser } = require('../utils/helpers');

module.exports = (app) => {

  app.use('/', router);

  router.use('/api/users', userRoutes);

  router.use('/api/posts', postRoutes);

  router.use('/api/posts/:id/comments', commentRoutes);

  router.use('/auth', authRoutes);

  router.post('/api/login', passport.authenticate('local'), sendUser);

  router.get('/api/logout', logoutUser);

  router.get('/api/current_user', sendUser);

  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../src/index.html'));
  });

};
