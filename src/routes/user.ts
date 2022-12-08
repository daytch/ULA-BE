import express from "express";
import { UserController } from "../controllers/UserController";

const router = express.Router();
try{
    const controller = new UserController();

    router.post("/login", controller.login);
    router.post("/register", controller.register);
}
catch(err: any){
    console.error(err);
}
export default router;