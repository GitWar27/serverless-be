import Joi from "joi";

export const confirmPasswordPayload = {
  password: Joi.string().required().min(1),
  newPassword: Joi.string().required().min(1),
};
