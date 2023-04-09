import aws from "aws-sdk";
import { queryOne, mysqlconnect } from "./sql";

const ses = new aws.SES({ region: "ap-southeast-1" });

export const duplicateChecker: any = async (email: any) => {
  try {
    const sql = await mysqlconnect();

    const queryParams = {
      sql,
      table: "users",
      fields: ["*"],
      conditions: ["email"],
      conditionValues: [email],
    };
    // console.log(queryParams.sql + " :PARAMS")
    const response = await queryOne(queryParams);
    console.log(JSON.stringify(response) + " : Response");
    return JSON.stringify(response);
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};

export const duplicateCodeChecker: any = async (code: any) => {
  try {
    const sql = await mysqlconnect();

    const queryParams = {
      sql,
      table: "partner_codes",
      fields: ["*"],
      conditions: ["code"],
      conditionValues: [code],
    };
    // console.log(queryParams.sql + " :PARAMS")
    const response = await queryOne(queryParams);
    console.log(JSON.stringify(response) + " : Response");
    return JSON.stringify(response);
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};

export const duplicateNameChecker: any = async (name: any) => {
  try {
    const sql = await mysqlconnect();

    const queryParams = {
      sql,
      table: "projects",
      fields: ["*"],
      conditions: ["name"],
      conditionValues: [name],
    };
    // console.log(queryParams.sql + " :PARAMS")
    const response = await queryOne(queryParams);
    console.log(JSON.stringify(response) + " : Response");
    return JSON.stringify(response);
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};

export const duplicateCheckerActivity: any = async (
  activity: any,
  project_id: any
) => {
  try {
    const sql = await mysqlconnect();

    const queryParams = {
      sql,
      table: "activities",
      fields: ["*"],
      conditions: ["title", "AND", "project_id"],
      conditionValues: [activity, project_id],
    };
    // console.log(queryParams.sql + " :PARAMS")
    const response = await queryOne(queryParams);
    console.log(JSON.stringify(response) + " : Response");
    return JSON.stringify(response);
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};

export const partnerProjectChecker: any = async (partner_id: any) => {
  try {
    const sql = await mysqlconnect();

    const queryParams = {
      sql,
      table: "projects",
      fields: ["*"],
      conditions: ["partner_id"],
      conditionValues: [partner_id],
    };
    // console.log(queryParams.sql + " :PARAMS")
    const response = await queryOne(queryParams);
    console.log(JSON.stringify(response) + " : Response");
    return JSON.stringify(response);
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};

export const checkerForDuplicates: any = async (
  schema: any,
  field: any,
  variable: any
) => {
  try {
    const sql = await mysqlconnect();

    const queryParams = {
      sql,
      table: schema,
      fields: ["*"],
      conditions: [field, "AND", "is_deleted"],
      conditionValues: [variable, "0"],
    };
    // console.log(queryParams.sql + " :PARAMS")
    const response = await queryOne(queryParams);
    console.log(JSON.stringify(response) + " : Response");
    return JSON.stringify(response);
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};

export const duplicateCheckerUserPartner: any = async (
  user_id: any,
  partner_id: any
) => {
  try {
    const sql = await mysqlconnect();

    const queryParams = {
      sql,
      table: "user_partners",
      fields: ["*"],
      conditions: ["user_id", "AND", "partner_id"],
      conditionValues: [user_id, partner_id],
    };
    // console.log(queryParams.sql + " :PARAMS")
    const response = await queryOne(queryParams);
    console.log(JSON.stringify(response) + " : Response");
    return JSON.stringify(response);
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};

export const duplicateCheckerUserProject: any = async (
  user_id: any,
  project_id: any
) => {
  try {
    const sql = await mysqlconnect();

    const queryParams = {
      sql,
      table: "user_partners",
      fields: ["*"],
      conditions: ["user_id", "AND", "project_id"],
      conditionValues: [user_id, project_id],
    };
    // console.log(queryParams.sql + " :PARAMS")
    const response = await queryOne(queryParams);
    console.log(JSON.stringify(response), " : Response");
    return JSON.stringify(response);
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};

export const duplicateCheckerActivityProject: any = async (
  activity_id: any,
  project_id: any
) => {
  try {
    const sql = await mysqlconnect();

    const queryParams = {
      sql,
      table: "activity_projects",
      fields: ["*"],
      conditions: ["activity_id", "AND", "project_id"],
      conditionValues: [activity_id, project_id],
    };
    // console.log(queryParams.sql + " :PARAMS")
    const response = await queryOne(queryParams);
    console.log(JSON.stringify(response) + " : Response");
    return JSON.stringify(response);
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};

export const dataAvailabilityChecker: any = async (
  schema: any,
  partner_id: any,
  project_id: any
) => {
  try {
    const sql = await mysqlconnect();

    const queryParams = {
      sql,
      table: schema,
      fields: ["*"],
      conditions: ["partner_id", "AND", "project_id"],
      conditionValues: [partner_id, project_id],
    };
    // console.log(queryParams.sql + " :PARAMS")
    const response = await queryOne(queryParams);
    console.log(JSON.stringify(response) + " : Response");
    return JSON.stringify(response);
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};

export const participantChecker: any = async (
  schema: any,
  first_name: any,
  last_name: any,
  middle_name: any,
  dob: any
) => {
  try {
    const sql = await mysqlconnect();

    const queryParams = {
      sql,
      table: schema,
      fields: ["*"],
      conditions: [
        "first_name",
        "AND",
        "last_name",
        "AND",
        "middle_name",
        "AND",
        "dob",
      ],
      conditionValues: [first_name, last_name, middle_name, dob],
    };
    // console.log(queryParams.sql + " :PARAMS")
    const response = await queryOne(queryParams);
    console.log(JSON.stringify(response) + " : Response");
    return JSON.stringify(response);
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};
