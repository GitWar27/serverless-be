import Joi from "joi";

export const loginVerifyPayload = {
  session: Joi.string().required().min(1),
  confirmation_code: Joi.string().required().min(1),
  user_id: Joi.string().required().min(1),
};
