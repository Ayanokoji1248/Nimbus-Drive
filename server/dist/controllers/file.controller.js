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
exports.searchFile = exports.getSharedFiles = exports.shareFile = exports.deleteFile = exports.getAllFiles = exports.fileUpload = void 0;
const file_model_1 = __importDefault(require("../models/file.model"));
const supabaseDelete_1 = __importDefault(require("../lib/supabaseDelete"));
const fileUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, size, type, fileUrl, parentFolder } = req.body;
        const userId = req.user.id;
        const file = new file_model_1.default({
            fileName: name,
            fileSize: size,
            fileType: type,
            fileUrl: fileUrl,
            parentFolder: parentFolder,
            user: userId
        });
        yield file.save();
        res.status(200).json({
            message: "File Upload Successfully",
            file
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.fileUpload = fileUpload;
const getAllFiles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { parentFolder } = req.query;
        const userId = req.user.id;
        const userEmail = req.user.email;
        if (parentFolder === "null" || parentFolder === undefined) {
            parentFolder = null;
        }
        const files = yield file_model_1.default.find({ parentFolder: parentFolder, user: userId });
        res.status(200).json({
            message: "All user files",
            files
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.getAllFiles = getAllFiles;
const deleteFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileId = req.params.id;
        const userId = req.user.id;
        const file = yield file_model_1.default.findById(fileId);
        if (!file) {
            res.status(404).json({
                message: "File not found"
            });
            return;
        }
        const filePath = `${userId}/${file === null || file === void 0 ? void 0 : file.parentFolder}/${file === null || file === void 0 ? void 0 : file.fileName}`;
        console.log(filePath);
        const supabaseDeleted = yield (0, supabaseDelete_1.default)(filePath);
        console.log(supabaseDeleted);
        if (!supabaseDeleted) {
            res.status(500).json({ message: "Error deleting file from Supabase" });
            return;
        }
        const deletedFile = yield file_model_1.default.deleteOne({ _id: fileId, user: userId });
        if (deletedFile.deletedCount === 0) {
            return res.status(404).json({ message: "File not found or unauthorized" });
        }
        res.status(200).json({
            message: "File Deleted Successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.deleteFile = deleteFile;
const shareFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = req.user.id;
        const userEmail = req.user.email;
        const { email } = req.body;
        const fileId = req.params.id;
        if (!email || !email.includes("@")) {
            res.status(400).json({
                message: "Invalid Email Id"
            });
            return;
        }
        if (email === userEmail) {
            res.status(400).json({
                message: "Cannot share with yourself"
            });
            return;
        }
        const file = yield file_model_1.default.findById(fileId);
        if (!file) {
            res.status(404).json({
                message: "File not found"
            });
            return;
        }
        if (((_a = file.user) === null || _a === void 0 ? void 0 : _a.toString()) !== userId) {
            res.status(403).json({
                message: "Unauthorized Access"
            });
            return;
        }
        if (!file.sharedWith.includes(email)) {
            file.sharedWith.push(email);
        }
        yield file.save();
        res.status(200).json({
            message: "File Shared Successfully",
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
exports.shareFile = shareFile;
const getSharedFiles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = req.user.email;
        const files = yield file_model_1.default.find({ sharedWith: userEmail }).populate("user", "_id username email");
        res.status(200).json({
            message: "All Shared Files",
            files
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
exports.getSharedFiles = getSharedFiles;
const searchFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { q } = req.query;
        if (!q || typeof q !== 'string') {
            res.status(400).json({
                message: "Search query is required"
            });
            return;
        }
        const files = yield file_model_1.default.find({
            $or: [{ fileName: { $regex: q, $options: "i" } }],
            user: userId
        });
        res.status(200).json({
            files
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
exports.searchFile = searchFile;
