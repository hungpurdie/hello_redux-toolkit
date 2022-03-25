const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const OAuth = require('../configs/oauth');
const User = require('../models/user');

passport.use(
  new GoogleStrategy(
    {
      clientID: OAuth.google.clientID,
      clientSecret: OAuth.google.clientSecret,
      callbackURL: OAuth.google.callbackURL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const foundUser = await User.findOne({
          googleId: profile.id,
          authProvider: 'google',
        });
        if (foundUser) return cb(null, foundUser);

        const newUser = new User({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          authProvider: 'google',
        });

        await newUser.save();
        return cb(null, newUser);
      } catch (error) {
        return cb(error, false);
      }
    }
  )
);
