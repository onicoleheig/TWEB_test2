/**
  * @desc second test during TWEB 2018 api file
  * @author Olivier Nicole
*/

const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const passport = require('passport');
const { User } = require('./auth.js');

/**
 * authenticationRequired is a middleware that use the jwt strategy to authenticate
 * the use. If authentication fails, passport will respond with a 401 Unauthorized status.
 * If authentication succeeds, the `req.user` property will be set to the authenticated user.
 */
const authenticationRequired = passport.authenticate('jwt', { session: false });

/**
 * authentication middleware overrides the default behavior of passport. The next handler is
 * always invoked. If authentication fails, the `req.user` property will be set to null.
 * If authentication succeeds, the `req.user` property will be set to the authenticated user.
 * see: http://www.passportjs.org/docs/authenticate/#custom-callback
 */
const authentication = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) { next(err); }
    req.user = user || null;
    next();
  })(req, res, next);
};

// movie schema declaration
const { Schema } = mongoose;
const MovieSchema = new Schema({
  _id: {
    $oid: {
      type: 'ObjectId',
    },
  },
  vote_count: {
    $numberInt: {
      type: 'Date',
    },
  },
  video: {
    type: 'Boolean',
  },
  vote_average: {
    $numberDouble: {
      type: 'Date',
    },
  },
  title: {
    type: 'String',
  },
  popularity: {
    $numberDouble: {
      type: 'String',
    },
  },
  poster_path: {
    type: 'String',
  },
  original_language: {
    type: 'String',
  },
  original_title: {
    type: 'String',
  },
  backdrop_path: {
    type: 'String',
  },
  adult: {
    type: 'Boolean',
  },
  overview: {
    type: 'String',
  },
  release_date: {
    type: 'Date',
  },
  tmdb_id: {
    $numberInt: {
      type: 'String',
    },
  },
  genres: {
    type: [
      'String',
    ],
  },
});
MovieSchema.plugin(mongoosePaginate);
const Movie = mongoose.model('Movie', MovieSchema);

// get all movies
router.get('/movies', authentication, (req, res) => {
  Movie.find((err, movies) => {
    if (err) return err;
    res.send(movies);
    return true;
  });
});

// get all movies with pagination
router.get('/movies/:page/:limit', authenticationRequired, (req, res) => {
  const { page, limit } = req.params;
  Movie.paginate({}, { page: parseInt(page, 10), limit: parseInt(limit, 10) }).then(response => {
    res.send(response);
  });
});

// get the watchlist from a user
router.get('/:id/watchlist', authenticationRequired, (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    res.send(user.watchlist);
  });
});

// This endpoint is protected and has access to the authenticated user.
router.get('/me', authenticationRequired, (req, res) => {
  res.send({ user: req.user });
});

module.exports = router;
