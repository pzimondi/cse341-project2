// After GitHub redirects back, passport has already authenticated the user
// and stored them in req.user. We just redirect to a success page or back to docs.
const loginSuccess = (req, res) => {
  res.status(200).json({
    message: 'You are logged in!',
    user: {
      displayName: req.user.displayName || req.user.username,
      githubId: req.user.id
    }
  });
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.status(200).json({ message: 'You have been logged out successfully.' });
    });
  });
};

module.exports = { loginSuccess, logout };