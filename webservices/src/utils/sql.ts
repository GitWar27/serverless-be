require("dotenv").config();
import { v4 as uuidv4 } from "uuid";
import isEmpty from "lodash/isEmpty";
import mysql from "mysql";

const DB_USER: any = "oxfamAdmin";
const DB_HOST: any = "oxfamdb.cdfs7nfym6vs.ap-southeast-1.rds.amazonaws.com";
const DB_PASS: any = "redacted";
const DB_NAME: any = "oxfamDB-stg";

export const mysqlconnect = () => {
  return mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    timezone: "+08:00",
  });
};

export const mysqlconnectdb = (db) => {
  return mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: db,
  });
};

export const mysqlconnectdbmigrate = (db) => {
  return mysql.createConnection({
    host: process.env.DB_MIGRATE,
    user: process.env.DB_MIGRATE_USERNAME,
    password: process.env.DB_MIGRATE_PASSWORD,
    database: db,
  });
};

interface insertInterface {
  sql: any;
  table: string;
  fields: any;
  values: any;
}

export const insert = async (data: insertInterface) => {
  const affected = await new Promise((resolve, reject) => {
    const { sql, table, fields, values } = data;
    // "id" field name applicable
    const id = fields.some((value) => value === "id")
      ? values[fields.indexOf("id")]
      : uuidv4();
    const newFields = fields.some((value) => value === "id")
      ? fields
      : ["id", ...fields];
    const sqlValues = fields.some((value) => value === "id")
      ? [...values, new Date(), new Date()]
      : [id, ...values, new Date(), new Date()];
    const escape = "?, ";
    const query = `INSERT INTO ${table} (${newFields},createdAt, updatedAt) VALUES (${escape
      .repeat(newFields.length + 2)
      .replace(/,\s*$/, "")})`;
    console.log("[SQL.Query]", query);
    console.log("[SQL.Insert]", { table, newFields, sqlValues });
    sql.query(query, sqlValues, (err, result) => {
      if (err) reject(err);
      console.log("SQL.INSERT RESULT", result);
      resolve({ id: id });
    });
  });
  console.log({ affected });
  if (affected) {
    return affected;
  }
};

interface insertBulkInterface {
  sql: any;
  table: string;
  values: any;
}

export const bulkInsert = async (data: insertBulkInterface) => {
  return new Promise(async (resolve, reject) => {
    const { sql, table, values } = data;
    const newValues = await values.map((value: any) => ({
      id: value.id ? value.id : uuidv4(),
      ...value,
    }));

    console.log("valuie", newValues);
    let fields = Object.keys(newValues[0]);
    fields = fields.map((item) => "`" + item + "`");
    const valuesBulkInsert = newValues.map((value) => [
      ...Object.values(value),
      new Date(),
      new Date(),
    ]);

    // const valuesBulkInsert = newValues.map(value => [...Object.values(value), new Date(), new Date()]);
    console.log("valuesBulkInsert", valuesBulkInsert);
    const query = `INSERT INTO ${table} (${fields}, createdAt, updatedAt) VALUES ?`;
    console.log("[SQL.Query]", query);
    console.log("[SQL.BulkInsert]: ", { table, fields });
    sql.query(query, [valuesBulkInsert], (err: any, result: any) => {
      if (err) {
        console.log("[ERROR SQL.BulkInsert]", JSON.stringify(err));

        return reject(err);
      }
      console.log("[RESULT SQL.BulkInsert]", result);
      return resolve(result);
    });
  });
};

export const bulkInsertRaw = async (data: insertBulkInterface) => {
  return new Promise(async (resolve, reject) => {
    const { sql, table, values } = data;

    const newValues = await values.map((value: any) => ({
      id: value.id ? value.id : uuidv4(),
      ...value,
    }));
    console.log("values", newValues);
    let fields = Object.keys(newValues[0]);
    fields = fields.map((item) => "`" + item + "`");
    const valuesBulkInsert = newValues.map((value) => Object.values(value));
    console.log("valuesBulkInsert", valuesBulkInsert);
    // const valuesBulkInsert = newValues.map(value => [...Object.values(value), new Date(), new Date()]);

    const query = `INSERT INTO ${table} (${fields}) VALUES ?`;
    console.log("[SQL.Query]", query);
    console.log("[SQL.BulkInsert]: ", { table, fields });
    sql.query(query, [valuesBulkInsert], (err: any, result: any) => {
      if (err) {
        console.log("[ERROR SQL.BulkInsert]", JSON.stringify(err));

        return reject(err);
      }
      console.log("[RESULT SQL.BulkInsert]", result);
      return resolve(result);
    });
  });
};

interface queryInterface {
  sql: any;
  table: string;
  fields: any;
  conditions: any;
  conditionValues: any;
  sort?: string;
  sortColumn?: string;
}

export const query = async (data: queryInterface) => {
  console.log(data + " Data");

  const {
    sql,
    table,
    fields,
    conditions,
    conditionValues,
    sort = "DESC",
    sortColumn = "createdAt",
  } = data;

  console.log(conditions + " : conditions");
  let queryConditions: any = "";
  console.log(!isEmpty(conditions) + " :is empty");
  if (!isEmpty(conditions)) {
    queryConditions = " where ";
    conditions.forEach((item) => {
      if (item === "AND" || item === "OR" || item === "LIKE") {
        queryConditions = queryConditions + ` ${item} `;
      } else {
        queryConditions = queryConditions + ` ${item} = ? `;
      }
    });
    queryConditions = queryConditions.replace(/,\s*$/, "");
    console.log(queryConditions + " :conditions");
  }
  console.log("queryConditions", queryConditions);
  console.log("conditionValues", conditionValues);

  return new Promise((resolve, reject) => {
    const query = `select ${fields} from ${table} ${queryConditions} order by ${sortColumn} ${sort}`;
    console.log(query);
    sql.query(
      query.replace(/(\r\n|\n|\r)/gm, ""),
      conditionValues,
      (err, results, field) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

export const queryOne = async (data: queryInterface) => {
  const { sql, table, fields, conditions, conditionValues } = data;
  let queryConditions: any = "";
  if (!isEmpty(conditions)) {
    queryConditions = " where ";
    conditions.forEach((item) => {
      if (item === "AND" || item === "OR") {
        queryConditions = queryConditions + ` ${item} `;
      } else {
        queryConditions = queryConditions + ` ${item} = ? `;
      }
    });
    queryConditions = queryConditions.replace(/,\s*$/, "");
  }
  console.log("queryConditions", queryConditions);
  console.log("conditionValues", conditionValues);
  return new Promise((resolve, reject) => {
    const query = "select " + fields + " from " + table + queryConditions;
    console.log(query);
    sql.query(
      query.replace(/(\r\n|\n|\r)/gm, ""),
      conditionValues,
      (err, results, field) => {
        if (err) reject(err);
        if (isEmpty(results)) {
          resolve({});
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};

interface updateInterface {
  sql: any;
  table: string;
  fields: any;
  values: any;
  conditions: any;
  conditionValues: any;
}
// .replace(/,\s*$/, "")
export const update = async (data: updateInterface) => {
  const { sql, table, fields, values, conditions, conditionValues } = data;

  let queryUpdates: any = "";
  if (!isEmpty(fields)) {
    fields.forEach((item) => {
      queryUpdates = queryUpdates + "`" + item + "`" + " = ?, ";
    });
  }
  let queryConditions: any = "";
  if (!isEmpty(conditions)) {
    queryConditions = " where ";
    conditions.forEach((item) => {
      if (item === "AND" || item === "OR") {
        queryConditions = queryConditions + ` ${item} `;
      } else {
        queryConditions = queryConditions + ` ${item} = ? `;
      }
    });
    queryConditions = queryConditions.replace(/,\s*$/, "");
  }
  const affected = await new Promise((resolve, reject) => {
    const query =
      "UPDATE " +
      table +
      " SET " +
      queryUpdates +
      " updatedAt = ? " +
      queryConditions;
    console.log("query", query);
    console.log(
      "data",
      JSON.stringify([...values, new Date(), ...conditionValues])
    );
    sql.query(
      query,
      [...values, new Date(), ...conditionValues],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
  console.log({ affected });
  if (affected) {
    return affected;
  }

  return new Error("Request Error. Please try again.");
};

export const updateRaw = async (data: updateInterface) => {
  const { sql, table, fields, values, conditions, conditionValues } = data;

  let queryUpdates: any = "";
  if (!isEmpty(fields)) {
    fields.forEach((item) => {
      queryUpdates = queryUpdates + "`" + item + "`" + " = ?, ";
    });
  }
  let queryConditions: any = "";
  if (!isEmpty(conditions)) {
    queryConditions = " where ";
    conditions.forEach((item) => {
      if (item === "AND" || item === "OR") {
        queryConditions = queryConditions + ` ${item} `;
      } else {
        queryConditions = queryConditions + ` ${item} = ? `;
      }
    });
    queryConditions = queryConditions.replace(/,\s*$/, "");
  }
  queryUpdates = queryUpdates.replace(/,\s*$/, "");
  const affected = await new Promise((resolve, reject) => {
    const query = "UPDATE " + table + " SET " + queryUpdates + queryConditions;
    console.log("query", query);
    console.log(
      "data",
      JSON.stringify([...values, new Date(), ...conditionValues])
    );
    sql.query(query, [...values, ...conditionValues], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
  console.log({ affected });
  if (affected) {
    return affected;
  }

  return new Error("Request Error. Please try again.");
};

interface queryRawInterface {
  sql: any;
  query: any;
}
export const queryRaw = async (data: queryRawInterface) => {
  const { sql, query } = data;
  return new Promise((resolve, reject) => {
    sql.query(query, (err, results, _field) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};
interface queryRawValueInterface {
  sql: any;
  query: any;
  queryValue: any;
}

export const queryRawValue = async (data: queryRawValueInterface) => {
  const { sql, query, queryValue } = data;
  return new Promise((resolve, reject) => {
    sql.query(
      query.replace(/(\r\n|\n|\r)/gm, ""),
      queryValue,
      (err, results, _field) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

interface IQueryCount {
  sql: any;
  table: any;
  field: any;
  value: any;
  filters?: any;
}

export const queryCount = (data: IQueryCount) => {
  const { sql, table, field, value, filters } = data;

  console.log("[RECEIVED SQL.QueryCount]", data);

  let filter = "";

  let query = `SELECT Count(${field}) as count FROM ${table} where ${field} = "${value}" AND is_deleted = "0"`;

  if (!isEmpty(filters)) {
    Object.keys(filters).map((item) => {
      if (!isEmpty(filters[item])) {
        filter = `${filter} AND ${item} = "${filters[item]}"`;
      }
    });

    query = `${query} ${filter}`;
  }

  return new Promise((resolve, reject) => {
    sql.query(query, (err, results) => {
      if (err) reject(err);
      console.log(JSON.stringify(results) + " :REESULTS");
      // console.log('[RESULT SQL.QueryCount]', JSON.parse(JSON.stringify(results[0]))["Count(1)"]);
      resolve(JSON.parse(JSON.stringify(results[0])));
    });
  });
};

interface IQueryDIstinctCount {
  sql: any;
  table: any;
  field: any;
  value?: any;
  dateField?: any;
  toDateValue?: any;
  fromDateValue?: any;
  filters?: any;
}

export const queryDistinctCount = (data: IQueryDIstinctCount) => {
  const { sql, table, field } = data;

  console.log("[RECEIVED SQL.QueryCount]", data);

  const query = `SELECT Count(Distinct(${field})) as count FROM ${table}`;

  return new Promise((resolve, reject) => {
    sql.query(query, (err, results) => {
      if (err) reject(err);
      console.log(results);
      console.log(JSON.stringify(results) + " :REESULTS");
      // console.log('[RESULT SQL.QueryCount]', JSON.parse(JSON.stringify(results[0]))["Count(1)"]);
      resolve(JSON.parse(JSON.stringify(results[0])));
    });
  });
};

export const queryCountNew = (data: IQueryDIstinctCount) => {
  const { sql, table, field, dateField, value } = data;

  console.log("[RECEIVED SQL.QueryCount]", data);

  let query = `SELECT Count(*) as count FROM ${table} where ${field} = "${value}" AND ${dateField} > current_date - interval '7' day`;

  if (isEmpty(dateField) || isEmpty(value)) {
    query = `SELECT Count(*) as count FROM ${table} where ${dateField} >= current_date - interval '7' day`;
  }

  console.log(query, " :Query");

  return new Promise((resolve, reject) => {
    sql.query(query, (err, results) => {
      if (err) reject(err);
      console.log(JSON.stringify(results), " :REESULTS");
      // console.log('[RESULT SQL.QueryCount]', JSON.parse(JSON.stringify(results[0]))["Count(1)"]);
      resolve(JSON.parse(JSON.stringify(results[0])));
    });
  });
};

export const queryCountFiltered = (data: IQueryDIstinctCount) => {
  const {
    sql,
    table,
    field,
    dateField,
    value,
    toDateValue,
    fromDateValue,
    filters,
  } = data;

  let filter = "";

  let query = `SELECT Count(*) as count 
                FROM ${table} 
                where ${field} = "${value}"
                AND ${dateField} 
                BETWEEN DATE_SUB(CURRENT_DATE, INTERVAL '${toDateValue}' year)
                AND DATE_SUB(CURRENT_DATE, INTERVAL '${fromDateValue}' year)`;

  if (isEmpty(dateField) || isEmpty(value)) {
    query = `SELECT Count(*) as count FROM ${table} 
              where ${dateField} 
              BETWEEN DATE_SUB(CURRENT_DATE, INTERVAL '${toDateValue}' year)
              AND DATE_SUB(CURRENT_DATE, INTERVAL '${fromDateValue}' year)`;
  }

  if (fromDateValue === "0") {
    query = `SELECT Count(*) as count FROM ${table} 
              where ${field} = "${value}"
              AND ${dateField} 
              BETWEEN DATE_SUB(CURRENT_DATE, INTERVAL '${toDateValue}' year)
              AND CURRENT_DATE`;
  }

  if (!isEmpty(filters)) {
    Object.keys(filters).map((item) => {
      if (!isEmpty(filters[item])) {
        filter = `${filter} AND ${item} = "${filters[item]}"`;
      }
    });

    query = `${query} ${filter}`;
  }

  console.log(query, " :Query");

  return new Promise((resolve, reject) => {
    sql.query(
      `${query} AND is_deleted = "0" ORDER BY createdAt DESC`,
      (err, results) => {
        if (err) reject(err);
        console.log(JSON.stringify(results), " :REESULTS");
        // console.log('[RESULT SQL.QueryCount]', JSON.parse(JSON.stringify(results[0]))["Count(1)"]);
        resolve(JSON.parse(JSON.stringify(results[0])));
      }
    );
  });
};

export const queryAllCount = (data: IQueryCount) => {
  const { sql, table, filters } = data;

  console.log("[RECEIVED SQL.QueryCount]", data);

  let filter = "";

  let query = `SELECT Count(id) as count FROM ${table} where is_deleted = "0"`;

  if (!isEmpty(filters)) {
    Object.keys(filters).map((item) => {
      if (!isEmpty(filters[item])) {
        filter = `${filter} AND ${item} = "${filters[item]}"`;
      }
    });

    query = `${query} ${filter}`;
  }

  return new Promise((resolve, reject) => {
    sql.query(query, (err, results) => {
      if (err) reject(err);
      console.log(JSON.stringify(results) + " :REESULTS");
      // console.log('[RESULT SQL.QueryCount]', JSON.parse(JSON.stringify(results[0]))["Count(1)"]);
      resolve(JSON.parse(JSON.stringify(results[0])));
    });
  });
};
