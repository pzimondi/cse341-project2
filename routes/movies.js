const router = require('express').Router();
const moviesCtrl = require('../controllers/movies');
const movieValidation = require('../middleware/movieValidation');
const isAuthenticated = require('../middleware/isAuthenticated');

// Public routes — anyone can read movies
router.get('/', moviesCtrl.getAllMovies);
router.get('/:id', moviesCtrl.getMovie);

// Protected routes — must be logged in via GitHub OAuth
router.post('/', isAuthenticated, movieValidation, moviesCtrl.addMovie);
router.put('/:id', isAuthenticated, movieValidation, moviesCtrl.updateMovie);
router.delete('/:id', isAuthenticated, moviesCtrl.removeMovie);

module.exports = router;