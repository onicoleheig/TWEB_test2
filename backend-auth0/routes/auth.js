/**
  * @desc second test during TWEB 2018 auth file
  * @author Olivier Nicole
*/

const express = require('express');
const passport = require('passport');
const passportLocal = require('passport-local');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { jwtOptions } = require('../config');
const { MovieSchema } = require('./api.js');

// user schema declaration
const { Schema } = mongoose;
const UserSchema = new Schema({
  username: { type: String, required: true, max: 20 },
  password: { type: String, required: true, max: 100 },
  toys: [MovieSchema],
});
const User = mongoose.model('Todo', UserSchema);

const router = express.Router();
const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  (username, password, done) => {
    let currentUser;
    User.findOne({ username }, (err, user) => {
      // the username is already taken !!
      if (user) {
        currentUser = user;
      }
    });
    if (currentUser) {
      return done(null, currentUser);
    }
    return done(null, false);
  },
));

passport.use(new JWTStrategy(
  {
    secretOrKey: jwtOptions.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  (jwtPayload, done) => {
    const { userId } = jwtPayload;
    let currentUser;
    User.findOne({ _id: userId }, (err, user) => {
      // the username is already taken !!
      if (user) {
        currentUser = user;
      }
    });
    if (userId !== currentUser.id) {
      return done(null, false);
    }
    return done(null, currentUser);
  },
));

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const { password, ...user } = req.user;
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ userId: user._id }, jwtOptions.secret);
  res.send({ user, token });
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    User.findOne({ username }, (err, user) => {
      // manage request error
      if (err) {
        res.send({ message: err });
        return;
      }

      // the username is already taken !!
      if (user) {
        res.send('username already taken');
        return;
      }

      // create the new user
      const newUser = new User(
        {
          username,
          password,
        },
      );

      // save the new user in the database
      newUser.save((error) => {
        if (error) { return err; }
        res.status(201).send('user created');
        return true;
      });
    });
  }
});

module.exports = router;
