import Joi from "joi";

export const createAdventurerSchema = Joi.object({
  name: Joi.string().trim().max(200).required(),
  level: Joi.number().integer().positive().required(),
  user_id: Joi.number().integer().positive().required(),
});
