import { handleSuccess, handleError } from "../../../utils/responses";
import validator from "../../../utils/schemaValidator";
import { cognitoForgotPassword } from "./methods";

import { forgotPasswordPayload } from "./schema";

export const handler = async (event: any, _context: any) => {
  try {
    const body = JSON.parse(event.body);

    const validatorResult = await validator(forgotPasswordPayload, body);

    if (validatorResult.isValid === 0) {
      const error = {
        error: 1,
        message: "Something went wrong!",
        validatorResult,
      };

      return handleError(error);
    }

    const { email } = body;

    const authUserPayload = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
    };

    const cognitoLoginResult = await cognitoForgotPassword(authUserPayload);

    console.log("[cognitoLoginResult]", cognitoLoginResult);

    // if (cognitoLoginResult.error) {
    //   const { code } = cognitoLoginResult.data;
    //   if (code === "UserNotConfirmedException") {
    //     return handleForbidden(cognitoLoginResult);
    //   }
    //   if (code === "NotAuthorizedException") {
    //     return handleUnauthorized(cognitoLoginResult);
    //   }
    //   return handleError(cognitoLoginResult);
    // }

    const response = {
      error: 0,
      message: "Please check email for the confirmation code",
    };

    return handleSuccess(response);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};
