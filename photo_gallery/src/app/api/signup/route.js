import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbConnect } from "../../../lib/dbConnect";
import User from "../../../models/User";

export async function POST(req) {
  try {
    console.log("📩 signup API called");
    await dbConnect();

    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // generate 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // create user in DB
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationCode,
      verified: false,
    });

    // 🔹 create JWT token with only email as payload
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // 🔹 create response and attach cookie
    const res = NextResponse.json(
      {
        message: "Signup successful. Please verify your email.",
      },
      { status: 201 }
    );

    // 🔹 set cookie named "JWTtoken"
    res.cookies.set("JWTtoken", token, {
      httpOnly: true, // secure from client-side JS
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict",
      path: "/", // available throughout site
      maxAge: 60 * 60, // 1 hour
    });

    return res;
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    console.error(err.stack);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
