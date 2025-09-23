import mongoose, { model, Schema } from "mongoose";

const fileSchema = new Schema({
    fileName: String,
    fileType: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true })

const File = model('file', fileSchema);

export default File;