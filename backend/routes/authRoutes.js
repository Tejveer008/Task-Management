const express = require('express');
const passport = require('passport');
const router = express.Router();

const { signup, login } = require('../controllers/AuthController');
const { signupValidation, loginValidation } = require('../middlewares/AuthMiddleware');

// Regular Authentication Routes
router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

// Google OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Role-based redirection
  const userRole = req.user.role;
  if (userRole === 'admin') {
    res.redirect('/admin-dashboard');
  } else {
    res.redirect('/user-dashboard');
  }
});

// GitHub OAuth Routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  const userRole = req.user.role;
  if (userRole === 'admin') {
    res.redirect('/admin-dashboard');
  } else {
    res.redirect('/user-dashboard');
  }
});

// LinkedIn OAuth Routes
router.get('/linkedin', passport.authenticate('linkedin'));
router.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }), (req, res) => {
  const userRole = req.user.role;
  if (userRole === 'admin') {
    res.redirect('/admin-dashboard');
  } else {
    res.redirect('/user-dashboard');
  }
});

module.exports = router;
