const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const { regular } = require('./utils/constants');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');

const mainRouter = require('./routes/index');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors);
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regular),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

app.use(auth);

app.use(mainRouter);

app.use(errorLogger);
app.use(errors());

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});
