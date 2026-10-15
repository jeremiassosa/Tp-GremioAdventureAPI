import Joi from "joi";

export const createMissionSchema = Joi.object({
  title: Joi.string().trim().max(200).required(),
  objetive: Joi.string().trim().max(200).required(),
  level: Joi.number().integer().positive().required(),
  gremio_id: Joi.number().integer().positive().required(),
});

export const updateMissionStatusSchema = Joi.object({
  status: Joi.boolean().required()
});
