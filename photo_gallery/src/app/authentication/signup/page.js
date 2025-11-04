"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/signup", { username, email, password });
      console.log(res.data);
      router.push("/authentication/verify");
    } catch (error) {

      if (error.response) {
        setError(error.response.data.error || "Something went wrong.");
      } else {
        setError("Network error, please try again.");
      }

      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen shadow-md shadow-white  text-black ">
      <div className="bg-[#e1dede] border border-[#dadce0] rounded-lg shadow-md w-full max-w-[380px] text-center p-12 md:p-10 sm:p-8 transition-all duration-300 ease-initial">

        <h1 className="text-[24px] font-normal mb-2">Sign up</h1>

        {error !== "" && <p className="py-3 text-[16px] text-red ">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="flex flex-col gap-5 mb-8">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-3 py-3 text-[16px] border border-[#000000] rounded-md outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-3 text-[16px] border border-[#000000] rounded-md outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-3 text-[16px] border border-[#000000] rounded-md outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1a73e8] hover:bg-[#1669c1] text-white font-medium text-[15px] rounded-md py-3  transition-colors"
          >
            Sign up
          </button>

          
        </form>

      </div>
    </div>
  );
};

export default SignupPage;
