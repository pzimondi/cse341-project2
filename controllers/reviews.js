const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');
const { getDb } = require('../data/database');

const reviewsCollection = () => getDb().collection('reviews');
const isValidId = (id) => ObjectId.isValid(id);

// GET /reviews — list all reviews
const getAllReviews = async (req, res) => {
  // #swagger.tags=['Reviews']
  // #swagger.description='Returns all movie reviews'
  try {
    const reviews = await reviewsCollection().find().toArray();
    res.status(200).json(reviews);
  } catch (err) {
    console.error('getAllReviews error:', err.message);
    res.status(500).json({ error: 'Could not load reviews right now' });
  }
};

// GET /reviews/:id — get one review
const getReview = async (req, res) => {
  // #swagger.tags=['Reviews']
  // #swagger.description='Returns a single review by ID'
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: 'That is not a valid MongoDB ID' });
    }

    const review = await reviewsCollection().findOne({ _id: new ObjectId(req.params.id) });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (err) {
    console.error('getReview error:', err.message);
    res.status(500).json({ error: 'Failed to fetch review' });
  }
};

// POST /reviews — submit a new review
const addReview = async (req, res) => {
  // #swagger.tags=['Reviews']
  // #swagger.description='Submit a new movie review'
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Review details',
        required: true,
        schema: {
          reviewer: 'Pastor Zimondi',
          movieTitle: 'Inception',
          score: 9.5,
          comment: 'One of the most mind-bending films I have ever watched.',
          watchedOn: '2024-03-10'
        }
  } */
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newReview = {
      reviewer: req.body.reviewer,
      movieTitle: req.body.movieTitle,
      score: req.body.score,
      comment: req.body.comment,
      watchedOn: req.body.watchedOn
    };

    const result = await reviewsCollection().insertOne(newReview);

    if (result.acknowledged) {
      res.status(201).json({ message: 'Review submitted!', id: result.insertedId });
    } else {
      res.status(500).json({ error: 'MongoDB did not acknowledge the insert' });
    }
  } catch (err) {
    console.error('addReview error:', err.message);
    res.status(500).json({ error: 'Failed to submit the review' });
  }
};

// PUT /reviews/:id — update an existing review
const updateReview = async (req, res) => {
  // #swagger.tags=['Reviews']
  // #swagger.description='Update a review by ID'
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated review details',
        required: true,
        schema: {
          reviewer: 'Pastor Zimondi',
          movieTitle: 'Inception',
          score: 10,
          comment: 'On second watch, this film is even better than I remembered.',
          watchedOn: '2024-06-01'
        }
  } */
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const updatedReview = {
      reviewer: req.body.reviewer,
      movieTitle: req.body.movieTitle,
      score: req.body.score,
      comment: req.body.comment,
      watchedOn: req.body.watchedOn
    };

    const result = await reviewsCollection().replaceOne(
      { _id: new ObjectId(req.params.id) },
      updatedReview
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Review not found or no changes were made' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('updateReview error:', err.message);
    res.status(500).json({ error: 'Failed to update the review' });
  }
};

// DELETE /reviews/:id — remove a review
const removeReview = async (req, res) => {
  // #swagger.tags=['Reviews']
  // #swagger.description='Delete a review by ID'
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const result = await reviewsCollection().deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'No review found with that ID' });
    }

    res.status(200).json({ message: 'Review deleted' });
  } catch (err) {
    console.error('removeReview error:', err.message);
    res.status(500).json({ error: 'Failed to delete the review' });
  }
};

module.exports = {
  getAllReviews,
  getReview,
  addReview,
  updateReview,
  removeReview
};