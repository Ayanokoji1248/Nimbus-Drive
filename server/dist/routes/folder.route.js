"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const folder_controller_1 = require("../controllers/folder.controller");
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const folderRouter = (0, express_1.Router)();
folderRouter.post('/create', user_middleware_1.default, folder_controller_1.createFolder);
folderRouter.get('/', user_middleware_1.default, user_middleware_1.default, folder_controller_1.getAllFolder);
folderRouter.delete('/:id', user_middleware_1.default, folder_controller_1.deleteFolder);
exports.default = folderRouter;
