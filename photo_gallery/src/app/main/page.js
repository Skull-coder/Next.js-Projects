"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import Gallery from "../components/gallery/Gallery";
import axios from "axios";

const Page = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState("image")
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/checkAuth");
        if (!res.data.authenticated) {
          router.push("/authentication/login");
        } else {
          setLoading(false);
        }
      } catch (error) {
        router.push("/authentication/login");
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <p className="text-white">Checking authentication...</p>;

  return (
    <div className="bg-[#1e1f20] h-screen">
      <div className="w-[95%] mx-auto">
        <Topbar setDrawerOpen={setDrawerOpen} />
        <div className="flex gap-10 mt-3" onClick={() => setDrawerOpen(false)}>
          <Sidebar DrawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} setSection={setSection} section={section} />
          <Gallery section={section} />
        </div>
      </div>
    </div>
  );
};

export default Page;
