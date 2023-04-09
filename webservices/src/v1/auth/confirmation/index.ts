require("dotenv").config();
import {
  handleSuccess,
  handleError,
  handleUnprocessable,
} from "../../../utils/responses";
import validator from "../../../utils/schemaValidator";
import { cognitoSignupConfirm } from "./methods";
import { update, mysqlconnect } from "../../../utils/sql";
import { tokenValidationService } from "../../../utils/token_validation_services";
import { sendEmail } from "../../../utils/sendEmail";
import { confirmationPayload } from "./schema";

export const handler = async (event: any, _context: any) => {
  try {
    if (!event.headers.Authorization) return "access token is required";

    const data: any = await tokenValidationService(event.headers.Authorization);

    let user_info: any = data;

    console.log("[user_info]: ", user_info);

    if (user_info.role === "admin" && user_info.is_deleted === "1") {
      return handleError("No sufficient access to do such action");
    }

    const body = JSON.parse(event.body);

    const { email } = body;

    const validatorResult = validator(confirmationPayload, body);

    if (validatorResult.isValid === 0)
      return handleUnprocessable(validatorResult);

    const payload = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: email,
    };

    const signupConfirmationResult = await cognitoSignupConfirm(payload);

    if (signupConfirmationResult.error) {
      return handleError(signupConfirmationResult);
    } else {
      const sql = await mysqlconnect();
      const queryParams = {
        sql,
        table: "users",
        fields: ["status"],
        values: [true],
        conditions: ["email"],
        conditionValues: [email],
      };

      // console.log(queryParams.sql + " :PARAMS")
      const sql_response = await update(queryParams);
      console.log(sql_response);
      sql.destroy();

      const response = {
        error: 0,
        message: "User was successfully confirmed!",
      };

      const send_mail_result: any = await sendEmail(email);
      console.log(send_mail_result);
      return handleSuccess(response);
    }
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};
