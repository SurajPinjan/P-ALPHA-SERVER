import dotenv from "dotenv";
import { Sequelize } from 'sequelize';
dotenv.config();

const DB_HOST: string = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
const DB_USER: string = process.env.DB_USER ? process.env.DB_USER : 'root';
const DB_PASSWORD: string = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'admin123';
const DB_NAME: string = process.env.DB_NAME ? process.env.DB_NAME : 'schema_x';

export const sequelize = new Sequelize(
  DB_NAME,
  DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
});