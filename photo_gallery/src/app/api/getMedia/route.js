import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import Media from "@/models/Media";

export async function GET(req) {
  try {
    await dbConnect();

    // ✅ Extract query parameter from URL
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // image, video, document

    const token = req.cookies.get("Logintoken")?.value;
    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    // ✅ Fetch only that user's media
    const media = await Media.find({ uploadedBy: userId, type }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, media }, { status: 200 });
  } catch (err) {
    console.error("Fetch Media Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
