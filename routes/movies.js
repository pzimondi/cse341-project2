const router = require('express').Router();
const moviesCtrl = require('../controllers/movies');
const { body } = require('express-validator');

// These rules apply to both POST and PUT so I define them once up here
const movieValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Every movie needs a title'),
  body('director')
    .trim()
    .notEmpty()
    .withMessage('Director name is required'),
  body('genre')
    .trim()
    .notEmpty()
    .withMessage('Please provide a genre'),
  body('releaseYear')
    .isInt({ min: 1888, max: new Date().getFullYear() })
    .withMessage(`Release year must be between 1888 and ${new Date().getFullYear()}`),
  body('runtime')
    .isInt({ min: 1 })
    .withMessage('Runtime should be in minutes and must be at least 1'),
  body('language')
    .trim()
    .notEmpty()
    .withMessage('Language is required'),
  body('rating')
    .isFloat({ min: 0, max: 10 })
    .withMessage('Rating must be a number between 0 and 10'),
  body('synopsis')
    .trim()
    .notEmpty()
    .withMessage('Please include a short synopsis'),
  body('studio')
    .trim()
    .notEmpty()
    .withMessage('Studio name is required')
];

router.get('/', moviesCtrl.getAllMovies);
router.get('/:id', moviesCtrl.getMovie);
router.post('/', movieValidation, moviesCtrl.addMovie);
router.put('/:id', movieValidation, moviesCtrl.updateMovie);
router.delete('/:id', moviesCtrl.removeMovie);

module.exports = router;