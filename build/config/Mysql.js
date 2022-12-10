"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const sequelize_typescript_1 = require("sequelize-typescript");
const SuratLog_1 = require("../models/SuratLog");
const SuratStatus_1 = require("../models/SuratStatus");
const Surat_1 = require("../models/Surat");
const User_1 = require("../models/User");
const SuratAttachment_1 = require("../models/SuratAttachment");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../../.env")
});
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbLogging = process.env.DB_LOGGING == "true";
const sequelizeConnection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: dbHost,
    username: dbUser,
    password: dbPassword,
    database: dbName,
    logging: dbLogging,
    models: [
        Surat_1.Surat,
        SuratLog_1.SuratLog,
        SuratStatus_1.SuratStatus,
        User_1.User,
        SuratAttachment_1.SuratAttachment
    ],
    pool: {
        min: 2,
        max: 10
    }
});
exports.default = sequelizeConnection;
//# sourceMappingURL=Mysql.js.map