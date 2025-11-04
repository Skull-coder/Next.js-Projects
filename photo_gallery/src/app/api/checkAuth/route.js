import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("Logintoken")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false });
    }

    // verify token (make sure to use same secret used while creating it)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({ authenticated: true, user: decoded });
  } catch (error) {
    return NextResponse.json({ authenticated: false });
  }
}
