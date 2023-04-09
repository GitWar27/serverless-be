import {
  handleCreated,
  handleError,
  handleConflict,
  handleUnprocessable,
} from "../../../utils/responses";
import { cognitoSignup } from "./methods";
import { insert, mysqlconnect, queryOne } from "../../../utils/sql";
import { sendAdminEmail } from "../../../utils/sendEmail";
import validator from "../../../utils/schemaValidator";
import { registerPayload } from "./schema";

import isEmpty from "lodash/isEmpty";

const ADMIN_EMAIL = "valsapongay@gmail.com";

export const handler = async (event: any, _context: any) => {
  const body = JSON.parse(event.body);

  const validatorResult = await validator(registerPayload, body);

  const {
    email,
    first_name,
    last_name,
    password,
    role,
    partnerCode,
    user_name,
  } = body;

  if (validatorResult.isValid === 0) {
    return handleUnprocessable(validatorResult);
  }

  const payload = {
    username: email,
    password: password,
  };

  try {
    const signupResult = await cognitoSignup(payload);

    console.log("[signupResult]: ", signupResult);

    if (signupResult.error) {
      const { code } = signupResult.data;
      if (code === "UsernameExistsException") {
        return handleConflict(signupResult);
      }
      return handleError(signupResult);
    }

    let user = {
      email,
      first_name,
      last_name,
      role,
      status: signupResult.data.userConfirmed,
      is_deleted: false,
      cognito_id: signupResult.data.userSub,
    };

    const sql = await mysqlconnect();

    const insertLogsParams = {
      sql,
      table: "users",
      fields: Object.keys(user),
      values: Object.values(user),
    };

    const result: any = await insert(insertLogsParams);

    if (!isEmpty(result?.id) && role === "partner") {
      console.log("[RESULT]: ", result);

      const queryFindPartner = {
        sql,
        table: "partner_codes",
        fields: "*",
        conditions: ["code"],
        conditionValues: [partnerCode],
      };

      const findPartnerCode: any = await queryOne(queryFindPartner);

      // let partner = {
      //   cognito_id: signupResult?.data?.userSub,
      //   email,
      //   name: user_name,
      //   code: partnerCode,
      //   address: "",
      //   website: "",
      //   contact_number: "",
      //   creator_id: signupResult?.data?.userSub,
      //   creator_role: role,
      //   status: false,
      //   is_deleted: false,
      // };

      let partner = {
        cognito_id: signupResult?.data?.userSub,
        user_id: result?.id,
        user_name,
        partner_id: findPartnerCode?.id,
        partner_name: findPartnerCode?.name,
        partner_code: findPartnerCode?.code,
        partner_address: findPartnerCode?.address,
        partner_email: findPartnerCode?.email,
        partner_website: findPartnerCode?.website,
        partner_contact_number: findPartnerCode?.contact_number,
        project_id: "",
        creator_id: "",
        creator_role: "",
        is_deleted: false,
      };

      const insertLogsParams = {
        sql,
        table: "user_partners",
        fields: Object.keys(partner),
        values: Object.values(partner),
      };

      const response = await insert(insertLogsParams);

      console.log("[created Partner]: ", response);
    }

    sql.destroy();

    const response = {
      error: 0,
      message: "User is successfully created!",
      data: {
        user_confimed: signupResult.data.userConfirmed,
        cognito_id: signupResult.data.userSub,
      },
    };

    const send_mail_result: any = await sendAdminEmail(ADMIN_EMAIL);

    console.log(send_mail_result);

    return handleCreated(response);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};
