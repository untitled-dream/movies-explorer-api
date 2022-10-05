const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const {
  MONGO_DB_ADDRESS,
  PORT_NUMBER
} = require('./utils/constants');

const cors = require('./middlewares/cors');
const rateLimiter = require('./middlewares/rateLimit');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandling = require('./middlewares/errorHandling');
const router = require('./routes');

const { PORT = PORT_NUMBER } = process.env;

const app = express();

mongoose.connect(MONGO_DB_ADDRESS, {
  useNewUrlParser: true
});

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(rateLimiter);

app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
