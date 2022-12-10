import dotenv from "dotenv";
import path from 'path';
import { Sequelize } from "sequelize-typescript";
import { SuratLog } from "../models/SuratLog";
import { SuratStatus } from "../models/SuratStatus";
import { Surat } from "../models/Surat";
import { User } from "../models/User";
import { SuratAttachment } from "../models/SuratAttachment";

dotenv.config({
    path: path.resolve(__dirname, "../../.env")
});

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbPassword = process.env.DB_PASSWORD
const dbLogging = process.env.DB_LOGGING == "true";

const sequelizeConnection = new Sequelize({
    dialect: "mysql",
    host: dbHost,
    username: dbUser,
    password: dbPassword,
    database: dbName,
    logging: dbLogging,
    models: [
        Surat,
        SuratLog,
        SuratStatus,
        User,
        SuratAttachment
    ],
    pool: {
        min: 2,
        max: 10
    }
})

export default sequelizeConnection