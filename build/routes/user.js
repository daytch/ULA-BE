"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const router = express_1.default.Router();
try {
    const controller = new UserController_1.UserController();
    router.post("/login", controller.login);
    router.post("/register", controller.register);
}
catch (err) {
    console.error(err);
}
exports.default = router;
//# sourceMappingURL=user.js.map