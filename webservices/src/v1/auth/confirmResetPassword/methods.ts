import { cognitoUser } from "../../../utils/cognito";

interface ICognitoLogin {
  ClientId: string;
  Username: string;
  ConfirmationCode: string;
  Password: string;
}

export const cognitoConfirmForgotPassword: any = (payload: ICognitoLogin) => {
  return new Promise(async (resolve, reject) => {
    cognitoUser().confirmForgotPassword(payload, (err, data) => {
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
