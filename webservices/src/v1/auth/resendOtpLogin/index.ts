import { handleError, handleSuccess } from "../../../utils/responses";
import validator from "../../../utils/schemaValidator";
import { cognitoLoginResendOtp } from "./methods";
import { loginOtpPayload } from "./schema";

export const handler = async (event: any, _context: any) => {
  const body = JSON.parse(event.body);

  const validatorResult = await validator(loginOtpPayload, body);

  if (validatorResult.isValid === 0) {
    const error = {
      error: 1,
      message: "Something went wrong!",
      validatorResult,
    };

    return handleError(error);
  }

  const { user_id } = body;

  const payload = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: user_id,
  };

  let result = await cognitoLoginResendOtp(payload);

  console.log("[result]", result);

  if (result?.message === "success") {
    return handleSuccess({
      code: 0,
      message: "OTP was sent to your registered email.",
    });
  }

  if (result?.message !== "success") {
    return handleError({
      code: 0,
      message: result,
    });
  }
};
