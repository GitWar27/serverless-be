import Joi from "joi";

export const confirmationPayload = {
  email: Joi.string().email().required().min(1),
};
