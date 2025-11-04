import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/dbConnect";
import User from "../../../models/User";


export async function POST(req) {
  try {
    await dbConnect();

    const { email, code } = await req.json();

    // 🛑 Check if both fields are provided
    if (!email || !code) {
      return NextResponse.json(
        { success: false, message: "Email and code are required" },
        { status: 400 }
      );
    }

    // 🔍 Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // ❌ If code doesn’t match
    if (user.verificationCode !== code) {
      return NextResponse.json(
        { success: false, message: "Invalid verification code" },
        { status: 401 }
      );
    }

    // ✅ If code matches, update user to verified
    user.verified = true;
    user.verificationCode = undefined; // optional: clear code
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Email verified successfully!",
    });
  } catch (error) {
    console.error("❌ Error verifying code:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
