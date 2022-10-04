const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');

const {
  MONGO_DB_ADDRESS,
  PORT_NUMBER,
} = require('./utils/constants');

const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const rateLimiter = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const moviesRoutes = require('./routes/movies');
const usersRoutes = require('./routes/users');
const { login, createUser } = require('./controllers/users');

const NotFoundError = require('./errors/notFoundError');

const { PORT = PORT_NUMBER } = process.env;

const app = express();

mongoose.connect(MONGO_DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(rateLimiter);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
    }),
  }),
  createUser,
);

app.use(auth);

app.use('/', moviesRoutes);
app.use('/', usersRoutes);
app.use('*', () => {
  throw new NotFoundError('Not Found');
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'Internal Server Error' : message,
  });

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
