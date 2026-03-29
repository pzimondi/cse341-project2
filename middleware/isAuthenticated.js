// Middleware that blocks access to protected routes if the user is not logged in.
// Applied to any route that should require authentication (POST, PUT, DELETE).
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    error: 'Unauthorized. Please log in via GitHub at /auth/github before accessing this route.'
  });
};

module.exports = isAuthenticated;