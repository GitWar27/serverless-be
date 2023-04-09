import Joi from "joi";

export const loginOtpPayload = {
  user_id: Joi.string().required().min(1),
};
