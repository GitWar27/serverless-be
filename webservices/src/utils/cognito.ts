import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  IAuthenticationDetailsData,
  ICognitoUserData,
  ICognitoUserAttributeData,
  ICognitoUserPoolData,
} from "amazon-cognito-identity-js";

import AWS from "./aws";

const COGNITO_USER_POOL_ID: any = process.env.COGNITO_USER_POOL_ID;
const COGNITO_CLIENT_ID: any = process.env.COGNITO_CLIENT_ID;

export const cognitoUserData: any = (username: string) => {
  console.log("username", username);

  return new Promise(async (resolve, _reject) => {
    const params = {
      UserPoolId: COGNITO_USER_POOL_ID,
      Username: username,
    };

    console.log("params", params);
    const cognitoidentityserviceprovider =
      new AWS.CognitoIdentityServiceProvider({ apiVersion: "2016-04-18" });

    cognitoidentityserviceprovider.adminGetUser(params, function (err, data) {
      if (err) {
        console.log("err", err);
        resolve({
          error: 1,
          message: "success",
          data: err,
        });
      } else {
        resolve({
          error: 0,
          message: "success",
          data,
        });
      }
    });
  });
};

export const cognitoUserConfirmation = () => {
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(
    { apiVersion: "2016-04-18" }
  );

  return cognitoidentityserviceprovider;
};

export const cognitoUserPool = () => {
  const poolData: ICognitoUserPoolData = {
    UserPoolId: COGNITO_USER_POOL_ID,
    ClientId: COGNITO_CLIENT_ID,
  };

  const userPool = new CognitoUserPool(poolData);
  return userPool;
};

export const cognitoUser = () => {
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(
    { apiVersion: "2016-04-18" }
  );

  return cognitoidentityserviceprovider;
};

export const cognitoUserAttribute = (data: ICognitoUserAttributeData) => {
  const userAttribute = new CognitoUserAttribute(data);
  return userAttribute;
};

export const authenticationDetails = (data: IAuthenticationDetailsData) => {
  const userAuthDetails = new AuthenticationDetails(data);
  return userAuthDetails;
};
