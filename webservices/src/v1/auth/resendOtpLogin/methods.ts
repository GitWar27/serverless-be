import { cognitoUser } from "../../../utils/cognito";

interface ICognitoLogin {
  ClientId: string;
  Username: string;
}

export const cognitoLoginResendOtp: any = (payload: ICognitoLogin) => {
  return new Promise(async (resolve, reject) => {
    cognitoUser().resendConfirmationCode(payload, (err, data) => {
      if (err) {
        console.log("[err]: ", err);

        resolve({
          error: 1,
          message: err.message,
          data: err,
        });
      }

      resolve({
        error: 0,
        message: "success",
        data: data,
      });
    });
  });
};
