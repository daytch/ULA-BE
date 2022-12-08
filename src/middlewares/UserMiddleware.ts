import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(__dirname, "../.env")
});
export class UserMiddleware{
    // Create function validate token with jsonwebtoken.
    public async validateToken(req: Request, res: Response, next: NextFunction){
        
        // Get token from header.
        let token : any = req.headers['x-access-token'];
        if(!token){
            return res.status(401).json({
                message: 'No token provided'
            });
        }

        // Verify token.
        try{
            let decoded : any = await jwt.verify(token, `${process.env.JWT_SECRET}`);
            req.body.payload = decoded;
            next();
        }
        catch(err){
            return res.status(401).json({
                message: 'Invalid token'
            });
        }

    }
}