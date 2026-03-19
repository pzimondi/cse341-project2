const router = require('express').Router();
const reviewsCtrl = require('../controllers/reviews');
const { body } = require('express-validator');

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

router.get('/', reviewsCtrl.getAllReviews);
router.get('/:id', reviewsCtrl.getReview);
router.post('/', reviewValidation, reviewsCtrl.addReview);
router.put('/:id', reviewValidation, reviewsCtrl.updateReview);
router.delete('/:id', reviewsCtrl.removeReview);

module.exports = router;