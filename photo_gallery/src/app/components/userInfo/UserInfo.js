"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserInfo = () => {
  const [user, setUser] = useState(null); // ✅ use state to trigger re-render
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await axios.get("/api/getUserInfo");
        console.log(res);

        setUser(res.data.username); // ✅ store username in state
      } catch (err) {
        console.error("Failed to fetch user info:", err);
        setError(err.response?.data?.error || "Error fetching user info");
      }
    };

    getInfo(); // ✅ call function
  }, []);

  return (
    <div className="p-4 text-white">
      { user ? (
        <p className="text-xl">{user}</p>
      ) : (
        <p className="text-gray-400">Loading user info...</p>
      )}
    </div>
  );
};

export default UserInfo;
