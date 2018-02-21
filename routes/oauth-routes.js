const router = require('express').Router();
const passport = require('passport');

//auth logout
router.get('/logout', (req, res) => {
  //handle login out with passport
  req.logout();
  res.redirect('/');
});

//auth with twitter
router.get('/twitter',
  passport.authenticate('twitter'));

//callback route for twitter to redirect to
router.get('/twitter/redirect', passport.authenticate('twitter'), (req, res) => {
  //user logged in
  res.redirect('/cloneboard');
});

module.exports = router;
