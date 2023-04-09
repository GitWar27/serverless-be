import { handleSuccess, handleError } from "../../../utils/responses";
import validator from "../../../utils/schemaValidator";
import { cognitoConfirmForgotPassword } from "./methods";

import { confirmPasswordPayload } from "./schema";

export const handler = async (event: any, _context: any) => {
  try {
    const body = JSON.parse(event.body);

    const validatorResult = await validator(confirmPasswordPayload, body);

    if (validatorResult.isValid === 0) {
      const error = {
        error: 1,
        message: "Something went wrong!",
        validatorResult,
      };

      return handleError(error);
    }

    const { email, code, password } = body;

    const authUserPayload = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
      Password: password,
    };

    const cognitoLoginResult = await cognitoConfirmForgotPassword(
      authUserPayload
    );

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
      message: "Successfully reset password.",
    };

    return handleSuccess(response);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};
