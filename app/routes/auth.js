const router = require('express').Router();
const passport = require('passport');
const { redirect } = require('../utils/helpers');

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/github', passport.authenticate('github'));

router.get('/vk', passport.authenticate('vkontakte'));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  redirect
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  redirect
);

router.get(
  '/vk/callback',
  passport.authenticate('vkontakte', { failureRedirect: '/' }),
  redirect
);

module.exports = router;
