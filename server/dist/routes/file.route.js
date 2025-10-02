"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_controller_1 = require("../controllers/file.controller");
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const fileRouter = (0, express_1.Router)();
fileRouter.post('/upload', user_middleware_1.default, file_controller_1.fileUpload);
fileRouter.get('/all', user_middleware_1.default, file_controller_1.getAllFiles);
fileRouter.delete('/:id', user_middleware_1.default, file_controller_1.deleteFile);
exports.default = fileRouter;
