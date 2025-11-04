"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const LoginPage = () => {

  const router = useRouter();

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/checkAuth");
        if (res.data.authenticated) {
          router.push("/main");

        }

        else {
          setLoading(false);
        }

      } catch (error) {
        router.push("/authentication/login");
        console.log("loading false");
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", { email, password });
      console.log(res.data);

      if (res.data.redirectToVerify) {
        router.push("/authentication/verify");
        return;
      }

      if (res.data.success) {
        router.push("/main");
      }

    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Something went wrong.");
      } else {
        setError("Network error, please try again.");
      }
      console.error("Error Login:", error);
    }
  };


  if (loading) return;

  return (
    <div className="flex justify-center items-center min-h-screen shadow-md shadow-white text-black ">
      <div className="bg-[#e1dede] border border-[#dadce0] rounded-lg shadow-md w-full max-w-[380px] text-center p-12 md:p-10 sm:p-8">

        <h1 className="text-[24px] font-normal mb-2">Login</h1>

        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-5 mb-8">
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
            className="w-full bg-[#1a73e8] hover:bg-[#1669c1] text-white font-medium text-[15px] rounded-md py-3 transition-colors"
          >
            Login
          </button>

        

        </form>

      </div>
    </div>
  );
};

export default LoginPage;
