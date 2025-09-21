import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        minlength: 5,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const User = model("user", userSchema);

export default User;