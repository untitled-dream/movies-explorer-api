const mongoose = require('mongoose');

const isEmail = require('validator/lib/isEmail');
const isStrongPassword = require('validator/lib/isStrongPassword');
const isLength = require('validator/lib/isLength');

const bcrypt = require('bcryptjs');

const {
  USER_SCHEMA_MSG,
  AUTH_ERROR_WRONG_EMAIL_PASSWORD
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, USER_SCHEMA_MSG.REQUIRED.EMAIL],
    unique: true,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: (props) => `${props.value} ${USER_SCHEMA_MSG.VALIDATE.EMAIL}`
    }
  },
  password: {
    type: String,
    required: [true, USER_SCHEMA_MSG.REQUIRED.PASSWORD],
    select: false,
    validate: {
      validator(v) {
        return isStrongPassword(v);
      },
      message: () => USER_SCHEMA_MSG.VALIDATE.PASSWORD
    }
  },
  name: {
    type: String,
    required: [true, USER_SCHEMA_MSG.REQUIRED.NAME],
    validate: {
      validator(v) {
        return isLength(v, { min: 2, max: 30 });
      },
      message: (props) => `${props.value} ${USER_SCHEMA_MSG.VALIDATE.NAME}`
    }
  }
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(AUTH_ERROR_WRONG_EMAIL_PASSWORD));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(AUTH_ERROR_WRONG_EMAIL_PASSWORD));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
