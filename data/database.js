const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

// I'm keeping a single client instance here so we don't
// open a new connection on every request — that would be slow
let client;

const connectToDatabase = (callback) => {
  if (client) {
    // already connected, just return it
    return callback(null, client);
  }

  MongoClient.connect(process.env.MONGODB_URL)
    .then((connectedClient) => {
      client = connectedClient;
      console.log('Successfully connected to MongoDB!');
      callback(null, client);
    })
    .catch((err) => {
      console.error('MongoDB connection failed:', err.message);
      callback(err);
    });
};

const getDb = () => {
  if (!client) {
    throw new Error('You need to call connectToDatabase first before getting the db');
  }
  // using "moviereviews" as the database name
  return client.db('moviereviews');
};

module.exports = { connectToDatabase, getDb };