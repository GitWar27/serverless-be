import {
  handleSuccess,
  handleError,
  handleForbidden,
  handleUnauthorized,
} from "../../../utils/responses";
import validator from "../../../utils/schemaValidator";
import { cognitoLoginVerify } from "./methods";
import { queryOne, update, mysqlconnect } from "../../../utils/sql";

import { loginVerifyPayload } from "./schema";
import { tokenValidationService } from "../../../utils/token_validation_services";

export const handler = async (event: any, _context: any) => {
  try {
    const body = JSON.parse(event.body);

    const validatorResult = await validator(loginVerifyPayload, body);

    if (validatorResult.isValid === 0) {
      const error = {
        error: 1,
        message: "Something went wrong!",
        validatorResult,
      };

      return handleError(error);
    }

    const { confirmation_code, user_id, session } = body;

    const authUserPayload = {
      ChallengeName: "CUSTOM_CHALLENGE",
      Session: session,
      ClientId: process.env.COGNITO_CLIENT_ID,
      ChallengeResponses: {
        CODE: confirmation_code,
        USERNAME: user_id,
        ANSWER: confirmation_code,
      },
    };

    console.log("[authUserPayload]", authUserPayload);

    const cognitoLoginResult = await cognitoLoginVerify(authUserPayload);

    console.log("[cognitoLoginResult]", cognitoLoginResult);

    if (cognitoLoginResult.error) {
      const { code } = cognitoLoginResult.data;
      if (code === "UserNotConfirmedException") {
        return handleForbidden(cognitoLoginResult);
      }
      if (code === "NotAuthorizedException") {
        return handleUnauthorized(cognitoLoginResult);
      }
      return handleError(cognitoLoginResult);
    }

    const userData = await tokenValidationService(
      cognitoLoginResult.data.AuthenticationResult.AccessToken
    );

    console.log("[userData]", userData);

    const sql = await mysqlconnect();

    const queryParams = {
      sql,
      table: "users",
      fields: ["*"],
      conditions: ["cognito_id"],
      conditionValues: [userData.cognito_id],
    };

    const result: any = await queryOne(queryParams);

    console.log(result.is_deleted + " : RESULT");

    if (result.is_deleted !== "0") {
      const error = {
        error: 1,
        message: "Access Denied! Account already deleted!",
      };
      return handleError(error);
    }

    const updateParams = {
      sql,
      table: "users",
      fields: ["has_changed"],
      values: [true],
      conditions: ["cognito_id"],
      conditionValues: [userData?.cognito_id],
    };

    const sql_response = await update(updateParams);

    console.log("[sql_response]", sql_response);

    sql.destroy();

    const response = {
      error: 0,
      accessToken: cognitoLoginResult.data.AuthenticationResult.AccessToken,
      user: result,
    };

    return handleSuccess(response);
  } catch (error) {
    console.log("[error verify]", error);
    return handleError(error);
  }
};
