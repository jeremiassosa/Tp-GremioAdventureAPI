const Joi = require('joi');
const createPostSchema = Joi.object({
title: Joi.string().trim().min(3).max(100).required(),
description: Joi.string().trim().max(500).allow(''),
user: Joi.string().trim().email().required().messages({ 
'string.empty': "The 'user' field cannot be empty.",
'string.email': "The 'user' field must contain a valid email address.",
'any.required': "The 'user' field is required."
})
});
module.exports = { createPostSchema };