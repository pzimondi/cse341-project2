const { body } = require('express-validator');

// Validation rules for review documents.
// Kept separate from routes so the middleware layer handles all input validation.
const reviewValidation = [
  body('reviewer')
    .trim()
    .notEmpty()
    .withMessage('Reviewer name cannot be blank'),

  body('movieTitle')
    .trim()
    .notEmpty()
    .withMessage('Which movie is this review for?'),

  body('score')
    .isFloat({ min: 1, max: 10 })
    .withMessage('Score must be between 1 and 10'),

  body('comment')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Please write at least 10 characters for your comment'),

  body('watchedOn')
    .isISO8601()
    .withMessage('watchedOn must be a valid date (e.g. 2024-01-15)')
];

module.exports = reviewValidation;