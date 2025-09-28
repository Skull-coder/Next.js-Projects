import crypto from "crypto";
// export const runtime = "nodejs";
import { connectDB } from "@/lib/mongodb";
import Password from "@/models/Password";


const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
const IV = Buffer.from(process.env.ENCRYPTION_IV, "hex");

const encryptPassword = (plainText) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, IV);
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = params;

  try {
    await Password.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: "Deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = await params; // await before using

  await connectDB();
  const body = await req.json();
  const { website, websiteLink, username, password } = body;

  const existing = await Password.findById(id);
  if (!existing) {
    return new Response(JSON.stringify({ error: "Password not found" }), { status: 404 });
  }

  const updatedData = {
    website,
    websiteLink,
    username,
    password: password ? encryptPassword(password) : existing.password
  };

  const updatedPassword = await Password.findByIdAndUpdate(id, updatedData, { new: true });
  return new Response(JSON.stringify(updatedPassword), { status: 200 });
}
