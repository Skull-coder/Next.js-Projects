import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(req) {
  try {
    await dbConnect();

    // 1️⃣ Read JWT token from cookies
    const token = req.cookies.get("Logintoken")?.value;
    if (!token)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    console.log(userId);

    if (!userId)
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });

    // 3️⃣ Find user in MongoDB
    const user = await User.findById(userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // 4️⃣ Return username only
    return NextResponse.json({ success: true, username: user.username });
  } catch (err) {
    console.error("GetUserInfo Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
