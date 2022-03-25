const Joi = require('joi');

const registerValidate = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().min(5).max(20).required(),
    email: Joi.string().min(15).email().required(),
    password: Joi.string().min(6).max(32).required(),
  });
  return userSchema.validate(data);
};

const loginValidate = (data) => {
  const userSchema = Joi.object({
    email: Joi.string().min(15).email().required(),
    password: Joi.string().min(6).max(32).required(),
  });
  return userSchema.validate(data);
};

module.exports = {
  registerValidate,
  loginValidate,
};
