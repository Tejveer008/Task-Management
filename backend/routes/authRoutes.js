const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/user-dashboard'); // Redirect user after successful login
  }
);

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/user-dashboard'); // Redirect user after successful login
  }
);

// LinkedIn OAuth
router.get('/linkedin', passport.authenticate('linkedin'));
router.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/user-dashboard'); // Redirect user after successful login
  }
);

module.exports = router;
