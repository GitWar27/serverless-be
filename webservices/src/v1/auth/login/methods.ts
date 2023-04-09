import { cognitoUser } from "../../../utils/cognito";

interface ICognitoLogin {
  AuthFlow: string;
  ClientId: string;
  AuthParameters: any;
}

interface IUserParams {
  AccessToken: string;
}

export const cognitoLogin: any = (payload: ICognitoLogin) => {
  return new Promise(async (resolve, reject) => {
    cognitoUser().initiateAuth(payload, (err, data) => {
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
