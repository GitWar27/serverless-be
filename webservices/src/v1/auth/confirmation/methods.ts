import { cognitoUserConfirmation } from "../../../utils/cognito";

interface ICognitoSignUpConfirm {
  UserPoolId: string;
  Username: string;
}

export const cognitoSignupConfirm: any = (data: ICognitoSignUpConfirm) => {
  return new Promise(async (resolve, _reject) => {
    const userConfirmation = await cognitoUserConfirmation();

    userConfirmation.adminConfirmSignUp(data, function (err, result) {
      if (err) {
        console.log(err);
        resolve({
          error: 1,
          message: err.message,
          data: err,
        });
      }

      resolve({
        error: 0,
        message: "success",
        data: result,
      });
    });
  });
};
