import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Mongo Connected ${connect.connection.host}`);
  } catch (e) {
    console.log("MongoDB Connected error: ", e);
  }
};
