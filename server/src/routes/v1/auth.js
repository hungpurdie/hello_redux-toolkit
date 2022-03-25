const express = require('express');
const {
  register,
  login,
  refreshToken,
  logout,
  loginWithGoogle,
} = require('../../controllers/auth');

const { verifyRefreshToken } = require('../../middlewares/jwt');

const passport = require('passport');
require('../../middlewares/passport');

const router = express.Router();

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/refresh-token').post(refreshToken);

router.route('/logout').delete(logout);

router.route('/google').get(
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.route('/google/callback').get(
  passport.authenticate('google', {
    session: false,
    failureRedirect: 'http://localhost:3000',
    successRedirect: 'http://localhost:3000',
  }),
  loginWithGoogle
);

module.exports = router;
