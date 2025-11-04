import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/dbConnect";
import User from "../../../models/User";

export async function POST(req) {
  try {
    await dbConnect();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Recipient email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    // configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // your Gmail App Password
      },
    });

    // mail details
    const mailOptions = {
      from: `"Moments." <${process.env.EMAIL_USER}>`,
      to: email, 
      subject: "Verification Email",
      text: "Your Moments verification code.",
      html: `<p>Your verification code from <b>Moments</b> is: <b>${user.verificationCode}</b></p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: "Failed to send email." });
  }
}
