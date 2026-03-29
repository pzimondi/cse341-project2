const router = require('express').Router();
const reviewsCtrl = require('../controllers/reviews');
const reviewValidation = require('../middleware/reviewValidation');
const isAuthenticated = require('../middleware/isAuthenticated');

// Public routes — anyone can read reviews
router.get('/', reviewsCtrl.getAllReviews);
router.get('/:id', reviewsCtrl.getReview);

// Protected routes — must be logged in via GitHub OAuth
router.post('/', isAuthenticated, reviewValidation, reviewsCtrl.addReview);
router.put('/:id', isAuthenticated, reviewValidation, reviewsCtrl.updateReview);
router.delete('/:id', isAuthenticated, reviewsCtrl.removeReview);

module.exports = router;