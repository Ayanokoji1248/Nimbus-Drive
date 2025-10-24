import mongoose, { model, Schema } from "mongoose";

const fileSchema = new Schema({
    fileName: String,
    fileSize: Number,
    fileType: String,
    fileUrl: String,
    parentFolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "folder",
        default: null,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    sharedWith: [{
        type: String,
        index: true 
    }]
}, { timestamps: true })

const File = model('file', fileSchema);

export default File;