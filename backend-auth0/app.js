/* eslint-disable no-console */
/**
  * @desc second test during TWEB 2018 main file
  *       this file allows console.log
  * @author Olivier Nicole
*/

// loads environment variables
require('dotenv/config');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const api = require('./routes/api');
const auth = require('./routes/auth');

const { port, mongoUri } = require('./config');

const app = express();
app.use(express.json());

// enable CORS for the client app
app.use(cors());

// database connection
mongoose.connect(mongoUri);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// simple hello world to see if the server repond
app.get('/', (req, res) => {
  res.send('The API is online');
});

// api endpoint
app.use('/api', api);

// auth endpoint
app.use('/auth', auth);

// forward 404 to error handler
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// error handler
app.use((err, req, res) => {
  console.error(err);
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});
