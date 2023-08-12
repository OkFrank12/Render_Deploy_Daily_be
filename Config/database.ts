import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url: string = process.env.DATABASE!;

export const dbConfig = () => {
  mongoose.connect(url).then(() => {
    console.log("Server is connected with the Database 🎉✨🎇");
  });
};
