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
const supabaseClient_1 = __importDefault(require("../config/supabaseClient"));
const deleteFromSupabase = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabaseClient_1.default
            .storage
            .from("nimbus-drive") // your bucket name
            .remove([filePath]); // remove takes an array of paths
        if (error) {
            console.error("Supabase delete error:", error.message);
            throw new Error("Error deleting file from Supabase");
        }
        return true;
    }
    catch (err) {
        console.error("Unexpected error:", err);
        if (err instanceof Error)
            return false;
        return false;
    }
});
exports.default = deleteFromSupabase;
