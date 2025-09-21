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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFolder = exports.createFolder = void 0;
const folder_model_1 = __importDefault(require("../models/folder.model"));
const createFolder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { folderName } = req.body;
        let { parentFolder } = req.query;
        if (parentFolder === "null" || parentFolder === undefined) {
            parentFolder = null;
        }
        const folder = new folder_model_1.default({
            folderName,
            parentFolder,
            user: userId
        });
        yield folder.save();
        res.status(201).json({
            message: "Folder Created Successfully",
            folder
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
exports.createFolder = createFolder;
const getAllFolder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { parentFolder } = req.query;
        if (parentFolder === "null" || parentFolder === undefined) {
            parentFolder = null;
        }
        const folders = yield folder_model_1.default.find({ parentFolder });
        res.status(200).json({
            folders
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
exports.getAllFolder = getAllFolder;
