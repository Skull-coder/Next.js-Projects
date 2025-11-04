import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },          
    fileId: { type: String, required: true },       
    name: { type: String, required: true },         
    type: {
      type: String,
      enum: ["image", "video", "document"],         
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",                                 
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Media || mongoose.model("Media", mediaSchema);
