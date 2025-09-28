import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema({
  website: { type: String, required: true },
  websiteLink: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

const Password = mongoose.models.Password || mongoose.model("Password", PasswordSchema);

export default Password;
