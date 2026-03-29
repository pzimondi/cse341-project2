const router = require('express').Router();
const passport = require('passport');
const authCtrl = require('../controllers/auth');

// GET /auth/github — kick off the GitHub OAuth flow
// #swagger.tags=['Auth']
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GET /auth/github/callback — GitHub redirects here after the user approves
// #swagger.tags=['Auth']
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/failure' }),
  authCtrl.loginSuccess
);

// GET /auth/failure — shown if GitHub login fails
// #swagger.tags=['Auth']
router.get('/failure', (req, res) => {
  res.status(401).json({ error: 'GitHub authentication failed. Please try again.' });
});

// GET /auth/logout — destroys the session and logs the user out
// #swagger.tags=['Auth']
router.get('/logout', authCtrl.logout);

module.exports = router;