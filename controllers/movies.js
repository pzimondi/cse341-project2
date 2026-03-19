const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');
const { getDb } = require('../data/database');

// Helper so I'm not typing this collection path over and over
const moviesCollection = () => getDb().collection('movies');

// A small helper to check if an id is a proper MongoDB ObjectId before querying
const isValidId = (id) => ObjectId.isValid(id);

// GET /movies — grab everything in the collection
const getAllMovies = async (req, res) => {
  // #swagger.tags=['Movies']
  // #swagger.description='Returns a list of all movies in the database'
  try {
    const movies = await moviesCollection().find().toArray();
    res.status(200).json(movies);
  } catch (err) {
    console.error('getAllMovies error:', err.message);
    res.status(500).json({ error: 'Something went wrong fetching movies' });
  }
};

// GET /movies/:id — fetch one movie by its _id
const getMovie = async (req, res) => {
  // #swagger.tags=['Movies']
  // #swagger.description='Returns a single movie by ID'
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: 'That ID does not look right — check the format' });
    }

    const movie = await moviesCollection().findOne({ _id: new ObjectId(req.params.id) });

    if (!movie) {
      return res.status(404).json({ error: 'No movie found with that ID' });
    }

    res.status(200).json(movie);
  } catch (err) {
    console.error('getMovie error:', err.message);
    res.status(500).json({ error: 'Failed to fetch the movie' });
  }
};

// POST /movies — add a new movie to the collection
const addMovie = async (req, res) => {
  // #swagger.tags=['Movies']
  // #swagger.description='Add a new movie to the database'
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Movie details',
        required: true,
        schema: {
          title: 'Inception',
          director: 'Christopher Nolan',
          genre: 'Sci-Fi',
          releaseYear: 2010,
          runtime: 148,
          language: 'English',
          rating: 8.8,
          synopsis: 'A thief who steals corporate secrets through dream-sharing technology.',
          studio: 'Warner Bros.'
        }
  } */
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newMovie = {
      title: req.body.title,
      director: req.body.director,
      genre: req.body.genre,
      releaseYear: req.body.releaseYear,
      runtime: req.body.runtime,
      language: req.body.language,
      rating: req.body.rating,
      synopsis: req.body.synopsis,
      studio: req.body.studio
    };

    const result = await moviesCollection().insertOne(newMovie);

    if (result.acknowledged) {
      res.status(201).json({ message: 'Movie added!', id: result.insertedId });
    } else {
      res.status(500).json({ error: 'Insert was not acknowledged by MongoDB' });
    }
  } catch (err) {
    console.error('addMovie error:', err.message);
    res.status(500).json({ error: 'Failed to add the movie' });
  }
};

// PUT /movies/:id — replace all fields on an existing movie
const updateMovie = async (req, res) => {
  // #swagger.tags=['Movies']
  // #swagger.description='Update an existing movie by ID'
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated movie details',
        required: true,
        schema: {
          title: 'Inception',
          director: 'Christopher Nolan',
          genre: 'Sci-Fi Thriller',
          releaseYear: 2010,
          runtime: 148,
          language: 'English',
          rating: 9.0,
          synopsis: 'Updated synopsis goes here.',
          studio: 'Warner Bros.'
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

    const updatedMovie = {
      title: req.body.title,
      director: req.body.director,
      genre: req.body.genre,
      releaseYear: req.body.releaseYear,
      runtime: req.body.runtime,
      language: req.body.language,
      rating: req.body.rating,
      synopsis: req.body.synopsis,
      studio: req.body.studio
    };

    const result = await moviesCollection().replaceOne(
      { _id: new ObjectId(req.params.id) },
      updatedMovie
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Movie not found or nothing changed' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('updateMovie error:', err.message);
    res.status(500).json({ error: 'Failed to update the movie' });
  }
};

// DELETE /movies/:id — remove a movie permanently
const removeMovie = async (req, res) => {
  // #swagger.tags=['Movies']
  // #swagger.description='Permanently delete a movie by ID'
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const result = await moviesCollection().deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Could not find a movie with that ID to delete' });
    }

    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    console.error('removeMovie error:', err.message);
    res.status(500).json({ error: 'Failed to delete the movie' });
  }
};

module.exports = {
  getAllMovies,
  getMovie,
  addMovie,
  updateMovie,
  removeMovie
};