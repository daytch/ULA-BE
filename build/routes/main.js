"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserMiddleware_1 = require("../middlewares/UserMiddleware");
const MainController_1 = require("../controllers/MainController");
const router = express_1.default.Router();
try {
    const main = new MainController_1.MainController();
    const middleware = new UserMiddleware_1.UserMiddleware();
    router.get("/", (req, res) => {
        return res.json("Hello Fauzi");
    });
    router.post("/selfservice", main.SelfService);
    router.post("/submitsurat", middleware.validateToken, main.SubmitSurat);
    router.get("/trackingpage", main.TrackingPage);
    router.get("/dashboard", middleware.validateToken, main.Dashboard);
    router.get("/suratmasuk", middleware.validateToken, main.SuratMasuk);
    router.get("/suratkeluar", middleware.validateToken, main.SuratKeluar);
    router.post("/actionsurat", middleware.validateToken, main.ActionSurat);
    router.get("/laporan", main.laporan);
}
catch (err) {
    console.error(err);
}
exports.default = router;
//# sourceMappingURL=main.js.map