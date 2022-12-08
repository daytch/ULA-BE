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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const User_1 = require("../models/User");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../.env")
});
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let rtn = {};
            let status = 0;
            try {
                let pass = yield bcrypt_1.default.hash(req.body.password, 10);
                req.body.password = pass;
                yield User_1.User.create(Object.assign({}, req.body));
                status = 200;
                rtn = {
                    "message": "Success register user"
                };
            }
            catch (err) {
                console.error(err);
                status = 500;
            }
            return res.status(status).json(rtn);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let rtn = {};
            let status = 0;
            try {
                let users = yield User_1.User.findOne({
                    where: { username: req.body.username }
                });
                if (users == null) {
                    status = 401;
                    rtn = {
                        message: "User Not Found"
                    };
                }
                else {
                    let isValid = yield bcrypt_1.default.compare(req.body.password, users.password);
                    if (isValid) {
                        let payload = {
                            username: users.username,
                            id: users.id,
                            status: users.status
                        };
                        let token = yield jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: process.env.JWT_EXPIRED });
                        rtn = {
                            message: "User Found",
                            token: token,
                            role: users.status
                        };
                        status = 200;
                    }
                    else {
                        status = 403;
                        rtn = {
                            message: "Invalid Password"
                        };
                    }
                }
            }
            catch (err) {
                console.error(err);
                status = 500;
            }
            return res.status(status).json(rtn);
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map