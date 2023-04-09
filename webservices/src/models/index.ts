import { Sequelize, DataTypes } from "sequelize";
import Users from "./users";

require("dotenv").config();
require("mysql2");

// let { DB_HOST, DB_PASS, DB_USER, DB_NAME } = process.env;
const DB_USER: any = "gramCoffeeAdmin";
const DB_HOST: any = "oxfamdb.cdfs7nfym6vs.ap-southeast-1.rds.amazonaws.com";
const DB_PASS: any = "conceptStone";
const DB_NAME: any = "gram-coffee-DB";

const sequelize: any = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: "mysql",
  host: DB_HOST,
});

// console.log(sequelize)

const models: any = {
  Users: Users(sequelize, DataTypes),
};

console.log(models + " Model");
Object.keys(models).forEach((modelName) => {
  console.log(modelName + " Modelname");
  if ("associate" in models[modelName]) {
    console.log(modelName + " Model Name");
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
