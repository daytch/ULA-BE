import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { User } from "../models/User";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(__dirname, "../.env")
});
export class UserController{
    public async register(req: Request, res: Response){
        let rtn = {};
        let status = 0;
        try{
            let pass = await bcrypt.hash(req.body.password, 10);
            req.body.password = pass
            await User.create({...req.body});
            status = 200;
            rtn = {
                "message": "Success register user"
            }
        }
        catch(err: any){
            console.error(err);
            status = 500;
        }
        return res.status(status).json(rtn);
    }

    public async login(req: Request, res: Response){
        let rtn = {};
        let status = 0;
        try{
            let users : User | null = await User.findOne({
                where: {username: req.body.username}
            });
            if(users == null){
                status = 401;
                rtn = {
                    message: "User Not Found"
                }
            }
            else {
                let isValid = await bcrypt.compare(req.body.password, users.password);
                if(isValid){
                    let payload = {
                        username: users.username,
                        id: users.id,
                        status: users.status
                    }
                    let token = await jwt.sign(payload, `${process.env.JWT_SECRET}`, {expiresIn: process.env.JWT_EXPIRED});
                    rtn = {
                        message: "User Found",
                        token: token,
                        role: users.status
                    }
                    status = 200;
                }
                else {
                    status = 403;
                    rtn = {
                        message: "Invalid Password"
                    }
                }
            }
        }
        catch(err: any){
            console.error(err);
            status = 500;
        }
        return res.status(status).json(rtn);
    }
}