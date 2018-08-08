const router = require('express').Router();
const passport = require('passport');
const { socialLoginRedirect } = require('../utils/helpers');

router.get('/google', passport.authenticate('google', {
  scope: ['profile'],
  display: 'popup'
}));

router.get('/github', passport.authenticate('github', { display: 'popup' }));

router.get('/vk', passport.authenticate('vkontakte', { display: 'popup' }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  socialLoginRedirect
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  socialLoginRedirect
);

router.get(
  '/vk/callback',
  passport.authenticate('vkontakte', { failureRedirect: '/' }),
  socialLoginRedirect
);

module.exports = router;
