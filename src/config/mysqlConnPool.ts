// db.ts
import dotenv from "dotenv";
import mysql from 'mysql2/promise';
dotenv.config();

const DB_HOST: string = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
const DB_USER: string = process.env.DB_USER ? process.env.DB_USER : 'root';
const DB_PASSWORD: string = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'admin123';
const DB_NAME: string = process.env.DB_NAME ? process.env.DB_NAME : 'schema_x';

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;
