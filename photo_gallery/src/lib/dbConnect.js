import mongoose from "mongoose";

let isConnected = false; 

export const dbConnect = async () => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Moments",
    });

    isConnected = conn.connections[0].readyState;
    console.log("✅ MongoDB Connected:", conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
