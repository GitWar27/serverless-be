import { cognitoUser } from "../../../utils/cognito";

interface ICognitoLogin {
  ClientId: string;
  Session: string;
  ChallengeName: string;
  ChallengeResponses: {
    CODE: string;
    USERNAME: string;
    ANSWER: string;
  };
}

interface IUserParams {
  AccessToken: string;
}

export const cognitoLoginVerify: any = (payload: ICognitoLogin) => {
  return new Promise(async (resolve, reject) => {
    cognitoUser().respondToAuthChallenge(payload, (err, data) => {
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
