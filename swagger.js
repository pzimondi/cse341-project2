const swaggerAutogen = require('swagger-autogen')();

// Update the host below once you have your Render URL
const doc = {
  info: {
    title: 'Movie Review API',
    description: 'A personal API for cataloguing movies and keeping track of reviews'
  },
  host: 'movie-review-api.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);