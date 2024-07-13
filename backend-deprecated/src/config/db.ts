import mongoose from "mongoose";
import { MONGO_URI } from "./const";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
