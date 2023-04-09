import Joi from "joi";

export const confirmPasswordPayload = {
  email: Joi.string().required().min(1),
  code: Joi.string().required().min(1),
  password: Joi.string().required().min(6),
};
