const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    nama: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(1024),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;