// passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../Models/User'); // Your User model

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          role: 'user',
        });
        await user.save();
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });
      if (!user) {
        user = new User({
          githubId: profile.id,
          email: profile.emails[0].value,
          role: 'user',
        });
        await user.save();
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
));

// LinkedIn OAuth Strategy
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: '/auth/linkedin/callback',
    scope: ['r_emailaddress', 'r_liteprofile'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ linkedinId: profile.id });
      if (!user) {
        user = new User({
          linkedinId: profile.id,
          email: profile.emails[0].value,
          role: 'user',
        });
        await user.save();
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
));

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
