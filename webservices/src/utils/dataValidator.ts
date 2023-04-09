import aws from "aws-sdk";
import { queryOne, mysqlconnect } from "./sql";

const ses = new aws.SES({ region: "ap-southeast-1" });

export const duplicateChecker: any = async (email: any) => {
  try {
    const sql = await mysqlconnect();

    const queryParams = {
      sql,
      table: "partners",
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
      table: "partners",
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
      conditions: [field],
      conditionValues: [variable],
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

export const isDataExist: any = async (
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
      conditionValues: [variable, 0],
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
