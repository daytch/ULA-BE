"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const main = __importStar(require("./routes/main"));
const user = __importStar(require("./routes/user"));
const Mysql_1 = __importDefault(require("./config/Mysql"));
const cors_1 = __importDefault(require("cors"));
try {
    dotenv_1.default.config({
        path: path_1.default.resolve(__dirname, "../.env")
    });
    const app = (0, express_1.default)();
    const port = process.env.PORT;
    Mysql_1.default.sync({ alter: process.env.NODE_ENV == "development" ? true : false });
    app.use("*", (0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded());
    app.listen(port, () => {
        // logger.info(`server start at port ${port}`);
        const dateNow = new Date().toISOString();
        console.log(`[${dateNow}] server start at port ${port}`);
    });
    app.use("/", main.default);
    app.use("/user", user.default);
}
catch (err) {
    console.error(err);
}
//# sourceMappingURL=index.js.map