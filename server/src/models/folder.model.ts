import mongoose, { model, Schema } from "mongoose";

const folderSchema = new Schema({
    folderName: String,
    parentFolder: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: "folder"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
})

const Folder = model("folder", folderSchema);

export default Folder;