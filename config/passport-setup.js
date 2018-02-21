const passport = require('passport');
const TwitterStrategy = require("passport-twitter").Strategy;
const keys = require('./keys.js');
const User = require('../models/user-model');

passport.use(
  new TwitterStrategy({
    consumerKey: keys.twitter.consumerKey,
    consumerSecret: keys.twitter.consumerSecret,
    callbackURL: '/auth/twitter/redirect'
  }, (token, tokenSecret, profile, done) => {
    //check if user already exists
    User.findOne({twitterid: profile.id}).then((currentUser) => {
      if (currentUser) {
        //user already exists
        done(null, currentUser);
      } else {
        //if user does not exists create a new one
        new User({
          username: profile.displayName.toLowerCase(),
          twitterid: profile.id,
          thumbnail: profile._json.profile_image_url
        }).save().then((newUser) => {
          done(null, newUser);
        });
      };
    });
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  }).catch( (err)=> {
    console.log(err.message);
  });
});
