import express from "express";
import dotenv from "dotenv";
import path from "path";
import * as main from "./routes/main";
import * as user from "./routes/user";
import sequelizeConnection from "./config/Mysql";
import cors from "cors";

try{
    dotenv.config({
        path: path.resolve(__dirname, "../.env")
    });

    const app = express();
    const port = process.env.PORT;

    sequelizeConnection.sync({alter: process.env.NODE_ENV == "development" ? true : false});

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());

    app.listen(port, () => {
        // logger.info(`server start at port ${port}`);
        const dateNow = new Date().toISOString();
        console.log(`[${dateNow}] server start at port ${port}`);
    });

    app.use("/", main.default);
    app.use("/user", user.default);
}
catch(err: any){
    console.error(err);
}