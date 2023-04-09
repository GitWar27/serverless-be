import { cognitoUserPool } from "../../../utils/cognito";

interface ICognitoSignUp {
  username: string;
  password: string;
}

export const cognitoSignup: any = (data: ICognitoSignUp) => {
  const { username, password } = data;
  return new Promise(async (resolve, _reject) => {
    const userPool = await cognitoUserPool();
    userPool.signUp(username, password, null, null, function (err, result) {
      if (err) {
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
