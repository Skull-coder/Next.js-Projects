import { connectDB } from "@/lib/mongodb";
import Password from "@/models/Password";
import crypto from "crypto";

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, "hex"); // 32 bytes
const IV = Buffer.from(process.env.ENCRYPTION_IV, "hex"); // 16 bytes

const encryptPassword = (plainText) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, IV);
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decryptPassword = (encryptedHex) => {
  if (!encryptedHex) return "";
  const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
  let decrypted = decipher.update(encryptedHex, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

export async function POST(req) {
  await connectDB();
  try {
    const { website, websiteLink, username, password } = await req.json();
    const newPassword = await Password.create({
      website,
      websiteLink,
      username,
      password: encryptPassword(password)
    });
    return new Response(JSON.stringify(newPassword), { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const docs = await Password.find().lean();
    const withDecrypted = docs.map(doc => ({
      ...doc,
      password: decryptPassword(doc.password)
    }));
    return new Response(JSON.stringify(withDecrypted), { status: 200 });
  } catch (err) {
    console.error("GET error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
