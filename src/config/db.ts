import { Sequelize } from "sequelize";

const database = process.env.DB_DATABASE || "campo_db";
const username = process.env.DB_USER || "root";
const password = process.env.DB_PASSWORD || "television07";
const host = process.env.BD_HOST || "localhost";

console.log({ database: process.env.DB_DATABASE, username, password, host });

export const sequelize = new Sequelize(database, username, password, {
   host,
   dialect: "mysql",
});
