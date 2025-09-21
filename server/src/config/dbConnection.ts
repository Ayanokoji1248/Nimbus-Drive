import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)

        console.log("Connected to DB");

    } catch (error) {
        console.error("Error connecting in DB", error)
        process.exit(1)
    }
}