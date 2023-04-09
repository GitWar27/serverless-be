import { cognitoUser } from "../../../utils/cognito";

interface ICognitoLogin {
  AccessToken: string;
  PreviousPassword: string;
  ProposedPassword: string;
}

export const cognitoChangePassword: any = (payload: ICognitoLogin) => {
  return new Promise(async (resolve, reject) => {
    cognitoUser().changePassword(payload, (err, data) => {
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
