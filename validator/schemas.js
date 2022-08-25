const Joi = require('joi');

exports.schemas = {
  createPost: Joi.object().keys({
    title: Joi.string().required().min(4).max(50),
    description: Joi.string().min(15).max(2000).required()
  }),
  signUp: Joi.object().keys({
    name: Joi.string().required().min(3).max(150),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),
    password: Joi.string().required().min(6).max(150),
    password_confirmation: Joi.any().valid(Joi.ref('password')).required()
  }),
  signIn: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
};