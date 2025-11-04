import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import Inputcode from "./inputcode";

export default async function VerificationPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("JWTtoken")?.value;

  if (!token) redirect("/");

  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen  font-['Roboto'] text-black">
      <div className="bg-[#e1dede] border border-[#dadce0] rounded-lg shadow-md w-full max-w-[380px] text-center p-12 md:p-10 sm:p-8">
        <h1 className="text-[24px] font-normal mb-2">Verification Page</h1>
        <p className="text-[#5f6368] text-sm mb-1">
          Verification code sent to:{" "}
          <span className="font-medium">{decode.email}</span>
        </p>
        <p className="text-[#5f6368] text-sm mb-6">
          Code valid for: <span className="font-medium">1 minute</span>
        </p>

        <Inputcode email={decode.email} />
      </div>
    </div>
  );
}
