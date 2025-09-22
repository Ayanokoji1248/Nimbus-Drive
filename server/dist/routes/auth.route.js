"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const authRouter = (0, express_1.Router)();
authRouter.post('/register', auth_controller_1.userRegistration);
authRouter.post('/login', auth_controller_1.userLogin);
authRouter.post('/logout', user_middleware_1.default, auth_controller_1.userLogout);
exports.default = authRouter;
