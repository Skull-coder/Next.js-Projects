import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // ⚠️ If not verified — send flag to frontend
    if (!user.verified) {
      const verifyToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
      const res = NextResponse.json({ redirectToVerify: true });
      res.cookies.set("JWTtoken", verifyToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60,
      });
      return res;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });

    res.cookies.set("Logintoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;

  } catch (err) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
