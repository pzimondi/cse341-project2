const router = require('express').Router();

// Simple home route just to confirm the API is alive
router.get('/', (req, res) => {
  // #swagger.tags=['Home']
  res.json({ message: 'Movie Review API is up and running!' });
});

router.use('/movies', require('./movies'));
router.use('/reviews', require('./reviews'));

module.exports = router;