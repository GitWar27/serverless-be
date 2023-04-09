import Joi from "joi";

export const registerPayload = {
  email: Joi.string().email().required().min(1),
  first_name: Joi.string().required().min(5),
  last_name: Joi.string().required().min(5),
  password: Joi.string().required().min(8),
  role: Joi.string().required(),
  partnerCode: Joi.string().allow(null, ""),
  user_name: Joi.string().allow(null, ""),
};
