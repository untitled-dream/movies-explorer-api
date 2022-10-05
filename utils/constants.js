const MONGODB_ADDRESS = 'mongodb://localhost:27017/moviesdb';
const PORT_NUMBER = 3000;

const ALLOWED_CORS = [
  'https://beat-film.nomoredomains.icu',
  'http://beat-film.nomoredomains.icu',
  'http://localhost:3001'
];

const ERROR_MESSAGE = {
  FORBIDDEN: 'Недостаточно прав для выполнения этого действия',
  NOT_FOUND: 'Ресурс не найден',
  INTERNAL_SERVER_ERROR: 'Внутренняя ошибка сервера',
  BAD_LINK: 'Значение не является URL-адресом',
  VALIDATION_ERROR: 'Ошибка при валидации',
  NOT_UNIQUE_EMAIL_VALUE: 'Пользователь с таким Email уже зарегистрирован'
};

const AUTH_ERROR_BAD_EMAIL_PASSWORD = 'Неправильные почта и пароль';

const USER_SCHEMA_MSG = {
  REQUIRED: {
    EMAIL: 'Поле "email (адрес эл. почты)" является обязательнным',
    PASSWORD: 'Поле "password (пароль)" является обязательнным',
    NAME: 'Поле "name (имя пользователя)" является обязательнным'
  },
  VALIDATE: {
    EMAIL: 'Значение поля "email" не является адресом электронно почты',
    PASSWORD: 'Значение поля "password" не является надежным',
    NAME: 'Значение поля "name" не удовлетворяет условия - длина строки от 2 до 30 символов'
  }
};

const MOVIE_SCHEMA_MSG = {
  REQUIRED: {
    COUNTRY: 'Значение поля "country (страна создания)" является обязательным',
    DIRECTOR: 'Значение поля "director (режиссёр)" является обязательным',
    DURATION: 'Поле-число "duration (длительность)" является обязательным',
    YEAR: 'Значение поля "year (год выпуска)" является обязательным',
    DESCRIPTION: 'Значение поля "description (описание)" является обязательным',
    IMAGE: 'Значение поля "image (ссылка на постер)" является обязательным',
    TRAILER_LINK: 'Значение поля "trailer (ссылка на трейлер)" является обязательным',
    THUMBNAIL: 'Значение поля "thumbnail (миниатюрное изображение постера)" является обязательным',
    OWNER: 'Значение поля "owner (_id пользователя, сохранившего фильм)" является обязательным',
    MOVIE_ID: 'Поле-число "movieId (id фильма)" является обязательным',
    NAME_RU: 'Значение поля "nameRU (название фильма на русском языке)" является обязательным',
    NAME_EN: 'Значение поля "nameEN (название фильма на английском языке)" является обязательным'
  },
  VALIDATE: {
    IMAGE_LINK: 'Значение поля "image (ссылка на постер)" не является URL-адресом',
    TRAILER_LINK: 'Значение поля "trailer (ссылка на трейлер)" не является URL-адресом',
    THUMBNAIL: 'Значение поля "thumbnail (миниатюрное изображение постера)" не является URL-адресом'
  }
};

module.exports = {
  ERROR_MESSAGE,
  MONGODB_ADDRESS,
  PORT_NUMBER,
  ALLOWED_CORS,
  AUTH_ERROR_BAD_EMAIL_PASSWORD,
  USER_SCHEMA_MSG,
  MOVIE_SCHEMA_MSG
};
