const jwt = require('jsonwebtoken');
const jwtUtils = require('../utils/jwt');
const UnauthorizedError = require('../customErrors/UnauthorizedError');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError();
  }
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, jwtUtils.getJWTSecret());
  } catch (err) {
    throw new UnauthorizedError();
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};
