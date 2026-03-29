const { body } = require('express-validator');

// Validation rules for movie documents.
// Exported as middleware so routes stay clean and this logic is reusable.
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

module.exports = movieValidation;