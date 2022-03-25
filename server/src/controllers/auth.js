const createError = require('http-errors');
const { registerValidate, loginValidate } = require('../validations/user');
const User = require('../models/user');
const {
  signInAccessToken,
  signInRefreshToken,
  verifyRefreshToken,
} = require('../middlewares/jwt');
const redisClient = require('../configs/connectRedis');

const loginWithGoogle = async (req, res, next) => {
  const user = req.user;

  const accessToken = await signInAccessToken(user._id);
  const refreshToken = await signInRefreshToken(user._id);

  return res.status(200).json({
    elements: {
      accessToken,
      refreshToken,
    },
  });
};

const register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const { error } = registerValidate(req.body);

    if (error) {
      throw createError(error.message);
    }

    if (!email || !password || !username) {
      throw createError.BadRequest();
    }

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      throw createError.Conflict(`${email} is already exists`);
    }

    const newUser = new User({
      email,
      password,
      username,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      elements: savedUser,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = loginValidate(req.body);

    if (error) {
      throw createError(error.message);
    }

    if (!email || !password) {
      throw createError.BadRequest();
    }

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      throw createError.NotFound(`${email} is not exists`);
    }

    const isMatch = await foundUser.isMatchPassword(password);

    if (!isMatch) {
      throw createError.Unauthorized();
    }

    const accessToken = await signInAccessToken(foundUser._id);
    const refreshToken = await signInRefreshToken(foundUser._id);

    return res.status(200).json({
      status: 200,
      elements: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    let { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    if (refreshToken.startsWith('Bearer '))
      refreshToken = refreshToken.slice(7);

    const { userId } = await verifyRefreshToken(refreshToken);

    const newAccessToken = await signInAccessToken(userId);
    const newRefreshToken = await signInRefreshToken(userId);

    return res.status(200).json({
      elements: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    let { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    if (refreshToken.startsWith('Bearer '))
      refreshToken = refreshToken.slice(7);

    const { userId } = await verifyRefreshToken(refreshToken);

    redisClient.del(userId.toString(), (err, reply) => {
      if (err) throw createError.InternalServerError();

      return res.status(200).json({
        message: 'Logout success',
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  loginWithGoogle,
};
