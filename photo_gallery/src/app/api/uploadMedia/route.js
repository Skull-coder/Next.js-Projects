import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import {dbConnect} from "@/lib/dbConnect";
import Media from "@/models/Media";
import jwt from "jsonwebtoken";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function POST(req) {
  try {
    await dbConnect();
    const token = req.cookies.get("Logintoken")?.value;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const { file, fileName, type } = await req.json();

    if (!file || !fileName || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const uploadResponse = await imagekit.upload({
      file,
      fileName,
      folder: `/${type}`,
    });

    const media = await Media.create({
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
      name: uploadResponse.name,
      type: type,
      uploadedBy: userId,
    });

    return NextResponse.json(
      { success: true, media },
      { status: 201 }
    );
  } catch (err) {
    console.error("Upload Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
