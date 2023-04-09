import { cognitoUser } from "./cognito";
import { queryOne, mysqlconnect } from "./sql";

export const tokenValidationService: any = async (token: any) => {
  let user_params: any = {};

  try {
    user_params.AccessToken = token;

    let result = await cognitoUser().getUser(user_params).promise();

    console.log("[cognito Id]:", result.Username);

    const sql = await mysqlconnect();

    if (result.Username) {
      const queryParams = {
        sql,
        table: "users",
        fields: ["*"],
        conditions: ["cognito_id"],
        conditionValues: [result.Username],
      };

      const response: any = await queryOne(queryParams);

      sql.destroy();

      return {
        ...response,
      };
    }
  } catch (e) {
    console.log("[error]: ", e.message);

    return e.message;
  }
};
