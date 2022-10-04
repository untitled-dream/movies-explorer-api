const MONGODB_ADDRESS = 'mongodb://localhost:27017/moviesdb';
const PORT_NUMBER = 3000;

const ALLOWED_CORS = [
  'https://beat-film.nomoredomains.icu',
  'http://beat-film.nomoredomains.icu',
  'http://localhost:3001',
];

const BAD_REQUEST = '';
const UNAUTHORIZED = '';
const FORBIDDEN = '';
const NOT_FOUND = 'Resource not Found';
const CONFLICT = '';
const INTERNAL_SERVER_ERROR = 'Internal Server Error';

module.exports = {
  MONGODB_ADDRESS,
  PORT_NUMBER,
  ALLOWED_CORS,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
};
