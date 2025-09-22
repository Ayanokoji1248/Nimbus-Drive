"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogout = exports.userLogin = exports.userRegistration = void 0;
const zod_1 = require("zod");
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../lib/generateToken");
const userRegisterSchema = zod_1.z.object({
    username: zod_1.z.string().min(5, "Atleast 5 character").trim(),
    email: zod_1.z.string().email("Invalid Email").trim(),
    password: zod_1.z.string().min(5, "Atleast 5 character").trim()
});
const userLoginSchema = userRegisterSchema.pick({
    email: true,
    password: true,
});
const userRegistration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const userParse = userRegisterSchema.safeParse({ username, email, password });
        if (!userParse.success) {
            res.status(400).json({
                errors: userParse.error.flatten().fieldErrors
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const existedUser = yield user_model_1.default.findOne({ email });
        if (existedUser) {
            res.status(400).json({
                message: "Email already taken"
            });
            return;
        }
        const user = new user_model_1.default({
            username,
            email,
            password: hashedPassword
        });
        yield user.save();
        const token = yield (0, generateToken_1.generateToken)({ id: user._id.toString(), email: user.email });
        res.cookie("token", token);
        const _a = user.toObject(), { password: _ } = _a, userData = __rest(_a, ["password"]);
        res.status(201).json({
            message: "Registeration Successfull",
            user: userData,
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.userRegistration = userRegistration;
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userParse = userLoginSchema.safeParse({ email, password });
        if (!userParse.success) {
            res.status(400).json({
                errors: userParse.error.flatten().fieldErrors
            });
            return;
        }
        const userExist = yield user_model_1.default.findOne({ email });
        if (!userExist) {
            res.status(400).json({
                message: "Invalid Credential"
            });
            return;
        }
        const validPass = yield bcrypt_1.default.compare(password, userExist.password);
        if (!validPass) {
            res.status(400).json({
                message: "Invalid Credential"
            });
            return;
        }
        const token = yield (0, generateToken_1.generateToken)({ id: userExist._id.toString(), email: userExist.email });
        res.cookie("token", token);
        const _a = userExist.toObject(), { password: _ } = _a, userData = __rest(_a, ["password"]);
        res.status(200).json({
            message: "User Login successfull",
            user: userData
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.userLogin = userLogin;
const userLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token");
        res.status(200).json({
            message: "Logout successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.userLogout = userLogout;
