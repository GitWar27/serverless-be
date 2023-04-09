import Joi from "joi";

export const forgotPasswordPayload = {
  email: Joi.string().required().min(1),
};
