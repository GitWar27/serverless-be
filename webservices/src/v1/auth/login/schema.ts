import Joi from "joi";

export const loginPayload = {
  email: Joi.string().email().required().min(1),
  password: Joi.string().required().min(8),
};
