import mongoose, { model, Schema } from "mongoose";

const fileSchema = new Schema({
    fileName: String,
    fileType: String,
    folder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "folder"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true })

const File = model('file', fileSchema);

export default File;