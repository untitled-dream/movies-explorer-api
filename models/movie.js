const mongoose = require('mongoose');

const isURL = require('validator/lib/isURL');
const isLength = require('validator/lib/isLength');

const {
  MOVIE_SCHEMA_MSG
} = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, MOVIE_SCHEMA_MSG.REQUIRED.COUNTRY],
    validate: {
      validator(v) {
        return isLength(v, { min: 2, max: 100 });
      },
      message: (props) => `${props.value} ${MOVIE_SCHEMA_MSG.VALIDATE.COUNTRY}`
    }
  },
  director: {
    type: String,
    required: [true, MOVIE_SCHEMA_MSG.REQUIRED.DIRECTOR]
  },
  duration: {
    type: Number,
    required: [true, MOVIE_SCHEMA_MSG.REQUIRED.DURATION]
  },
  year: {
    type: String,
    required: [true, MOVIE_SCHEMA_MSG.REQUIRED.YEAR]
  },
  description: {
    type: String,
    required: [true, MOVIE_SCHEMA_MSG.REQUIRED.DESCRIPTION]
  },
  image: {
    type: String,
    required: [true, MOVIE_SCHEMA_MSG.REQUIRED.IMAGE],
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: (props) => `${props.value} ${MOVIE_SCHEMA_MSG.VALIDATE.IMAGE}`
    }
  },
  trailerLink: {
    type: String,
    required: [true, MOVIE_SCHEMA_MSG.REQUIRED.TRAILER_LINK],
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: (props) => `${props.value} ${MOVIE_SCHEMA_MSG.VALIDATE.TRAILER_LINK}`
    }
  },
  thumbnail: {
    type: String,
    required: [true, MOVIE_SCHEMA_MSG.REQUIRED.THUMBNAIL],
    default: '',
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: (props) => `${props.value} ${MOVIE_SCHEMA_MSG.VALIDATE.THUMBNAIL}`
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, MOVIE_SCHEMA_MSG.REQUIRED.OWNER]
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, MOVIE_SCHEMA_MSG.REQUIRED.MOVIE_ID]
  },
  nameRU: {
    type: String,
    required: [true, MOVIE_SCHEMA_MSG.REQUIRED.NAME_RU]
  },
  nameEN: {
    type: String,
    required: [true, MOVIE_SCHEMA_MSG.REQUIRED.NAME_EN]
  }
});

module.exports = mongoose.model('movie', movieSchema);
