require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const { connectToDatabase } = require('./data/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Allow all the standard HTTP methods from any origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Swagger docs live at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Pull in all the routes
app.use('/', require('./routes'));

// Boot up the database connection first, then start listening
connectToDatabase((err) => {
  if (err) {
    console.error('Could not start the server — database connection failed:', err);
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
  });
});