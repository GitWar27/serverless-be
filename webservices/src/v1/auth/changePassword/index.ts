import { handleSuccess, handleError } from "../../../utils/responses";
import validator from "../../../utils/schemaValidator";
import { cognitoChangePassword } from "./methods";
import { update, mysqlconnect } from "../../../utils/sql";

import { tokenValidationService } from "../../../utils/token_validation_services";

import { confirmPasswordPayload } from "./schema";

export const handler = async (event: any, _context: any) => {
  try {
    if (!event.headers.Authorization) return "access token is required";

    const data: any = await tokenValidationService(event.headers.Authorization);

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

    const { password, newPassword } = body;

    const authUserPayload = {
      AccessToken: event.headers.Authorization,
      PreviousPassword: password,
      ProposedPassword: newPassword,
    };

    const cognitoLoginResult = await cognitoChangePassword(authUserPayload);

    console.log("[cognitoLoginResult]", cognitoLoginResult);

    if (cognitoLoginResult.error === 0) {
      const sql = await mysqlconnect();
      const queryParams = {
        sql,
        table: "users",
        fields: ["has_changed"],
        values: [true],
        conditions: ["email"],
        conditionValues: [data?.email],
      };

      const sql_response = await update(queryParams);
      console.log(sql_response);
      sql.destroy();

      const response = {
        error: 0,
        message: "Successfully change password.",
      };

      return handleSuccess(response);
    }

    return handleError(cognitoLoginResult?.message);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};
