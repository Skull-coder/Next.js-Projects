"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Inputcode = ({ email }) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Send verification email
  const sendEmail = async () => {
    try {
      const res = await axios.post("/api/sendEmail", { email });
      console.log(res.data);
      if (res.data.success) {
        setMessage("Verification code sent!");
      } else {
        setMessage(res.data.message || "Failed to send verification code.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("Network error, please try again.");
    }
  };

  // Verify entered code
  const VerifyCode = async () => {
    try {
      const res = await axios.post("/api/checkCode", { email, code });
      console.log(res.data);

      if (res.data.success) {
        setMessage("Verification successful!");
        router.push("/authentication/login");
      } else {
        setMessage("Invalid or expired code.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setMessage("Invalid or expired code.");
    }
  };

  // Send email automatically when the page loads (if email is passed)
  useEffect(() => {
    if (email) sendEmail();
  }, [email]);

  return (
    <div className="flex flex-col items-center gap-5">
      <input
        type="text"
        placeholder="Verification Code"
        className="w-full px-3 py-3 text-[16px] border border-[#000000] rounded-md outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] text-black"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        onClick={VerifyCode}
        className="w-full bg-[#1a73e8] hover:bg-[#1669c1] text-white font-medium text-[15px] rounded-md py-3 transition-colors"
      >
        Verify
      </button>

      <button
        onClick={sendEmail}
        className="w-full bg-[#1a73e8] hover:bg-[#1669c1] text-white font-medium text-[15px] rounded-md py-3 transition-colors"
      >
        Resend
      </button>

      {message && <p className="text-[#5f6368] text-sm mt-3">{message}</p>}
    </div>
  );
};

export default Inputcode;
