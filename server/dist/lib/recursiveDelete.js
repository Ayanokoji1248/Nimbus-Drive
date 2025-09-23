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
exports.deleteFolderRecursive = void 0;
const file_model_1 = __importDefault(require("../models/file.model"));
const folder_model_1 = __importDefault(require("../models/folder.model"));
const deleteFolderRecursive = (folderId) => __awaiter(void 0, void 0, void 0, function* () {
    const folder = yield folder_model_1.default.findById(folderId).populate("files");
    if (!folder)
        return;
    if (folder.files && folder.files.length > 0) {
        yield file_model_1.default.deleteMany({ _id: { $in: folder.files } });
    }
    const subFolders = yield folder_model_1.default.find({ parentFolder: folder._id });
    for (const subFolder of subFolders) {
        yield (0, exports.deleteFolderRecursive)(subFolder._id.toString());
    }
    yield folder_model_1.default.findByIdAndDelete(folder._id);
});
exports.deleteFolderRecursive = deleteFolderRecursive;
