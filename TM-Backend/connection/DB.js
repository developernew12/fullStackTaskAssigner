import mongoose from "mongoose";
import "dotenv/config";

export const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODBURL);
        console.log("DB CONNECTED");
    } catch (error) {
        console.log("Error connecting to the DB", error);
    }
}