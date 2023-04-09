import { cognitoUser } from "../../../utils/cognito";

interface ICognitoLogin {
  ClientId: string;
  Username: any;
}

export const cognitoForgotPassword: any = (payload: ICognitoLogin) => {
  return new Promise(async (resolve, reject) => {
    cognitoUser().forgotPassword(payload, (err, data) => {
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
