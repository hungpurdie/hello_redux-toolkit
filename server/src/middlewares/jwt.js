const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const redisClient = require('../configs/connectRedis');

const signInAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}s`,
    };

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });
};

const verifyAccessToken = (req, res, next) => {
  if (!req.headers['authorization']) return next(createError.Unauthorized());

  let token = req.headers['authorization'];
  if (token.startsWith('Bearer ')) token = token.slice(7, token.length);

  const secret = process.env.ACCESS_TOKEN_SECRET;
  jwt.verify(token, secret, (err, payload) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return next(createError.Unauthorized(err.message));
      } else if (err.name === 'JsonWebTokenError') {
        return next(createError.Unauthorized());
      }
    }
    req.payload = payload;
    next();
  });
};

const signInRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_IN}s`,
    };

    jwt.sign(payload, secret, options, async (err, token) => {
      if (err) return reject(err);
      redisClient.set(userId.toString(), token, (err, reply) => {
        if (err) {
          return reject(createError.InternalServerError(err.message));
        }
      });

      redisClient.expire(userId.toString(), process.env.REDIS_EXPIRE_IN);
      return resolve(token);
    });
  });
};

const verifyRefreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    jwt.verify(refreshToken, secret, async (err, payload) => {
      if (err) {
        return reject(err);
      }
      redisClient.get(payload.userId, (err, reply) => {
        if (err) {
          return reject(createError.InternalServerError(err.message));
        }
        if (reply === refreshToken) {
          return resolve(payload);
        }
        return reject(createError.Unauthorized());
      });
    });
  });
};

module.exports = {
  signInAccessToken,
  verifyAccessToken,
  signInRefreshToken,
  verifyRefreshToken,
};
