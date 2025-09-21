"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const folder_controller_1 = require("../controllers/folder.controller");
const folderRouter = (0, express_1.Router)();
folderRouter.post('/create', folder_controller_1.createFolder);
folderRouter.get('/', folder_controller_1.getAllFolder);
exports.default = folderRouter;
