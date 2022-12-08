import express from "express";
import { UserMiddleware } from "../middlewares/UserMiddleware";
import { MainController } from "../controllers/MainController";

const router = express.Router();
try{
    const main = new MainController();
    const middleware = new UserMiddleware();

    router.get("/", (req,res) => {
        return res.json("Hello Fauzi");
    })

    router.post("/selfservice", main.SelfService);
    router.post("/submitsurat", middleware.validateToken, main.SubmitSurat);
    router.get("/trackingpage", main.TrackingPage);
    router.get("/dashboard", middleware.validateToken, main.Dashboard);
    router.get("/suratmasuk", middleware.validateToken, main.SuratMasuk);
    router.get("/suratkeluar", middleware.validateToken, main.SuratKeluar);
    router.post("/actionsurat", middleware.validateToken, main.ActionSurat);
    router.get("/laporan", main.laporan);
}
catch(err: any){
    console.error(err);
}
export default router;