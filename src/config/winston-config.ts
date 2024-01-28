import dotenv from "dotenv";
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
dotenv.config();

const AUDIT_FILE_NAME: string = process.env.AUDIT_FILE_NAME ? process.env.AUDIT_FILE_NAME : 'alpha-1';
const MAX_FILE_AGE: string = process.env.MAX_FILE_AGE ? process.env.MAX_FILE_AGE : '14d';
const MAX_FILE_SIZE: string = process.env.MAX_FILE_SIZE ? process.env.MAX_FILE_SIZE : '2m';

const transport = new DailyRotateFile({
    filename: AUDIT_FILE_NAME.concat('-error.log'),
    dirname: 'logs',
    datePattern: 'YYYY-MM-DD', // For daily rotation
    maxFiles: MAX_FILE_AGE, // Keep logs for 14 days
    maxSize: MAX_FILE_SIZE, // Rotate when the file size exceeds 2MB
    zippedArchive: true,
    level: 'error'
});

const logger: winston.Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: AUDIT_FILE_NAME.concat('-service') },
    transports: [
        transport,
        new winston.transports.Console(),
    ],
});

export default logger;
