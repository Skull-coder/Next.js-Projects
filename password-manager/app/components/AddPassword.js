"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDrawer } from "./DrawerContext";
import './AddPassword.css';

const AddNewPassword = ({ onPasswordAdded, editingPassword, setEditingPassword, onPasswordUpdated }) => {
  const { isAPOpen, closeDrawer } = useDrawer();

  const [website, setWebsite] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");




  // Determine password strength
  const calculateStrength = (pass) => {
    if (!pass) return "";

    if (pass.length < 8) return "Weak";

    const hasLower = /[a-z]/.test(pass);
    const hasUpper = /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSymbol = /[^a-zA-Z0-9]/.test(pass);

    if (hasLower && !hasUpper && !hasNumber && !hasSymbol) return "Weak";
    if (hasLower && hasUpper && !hasNumber && !hasSymbol) return "Medium";
    if (hasLower && hasSymbol && hasNumber && hasSymbol) return "Strong";

    return "Weak";
  };

  useEffect(() => {
    setStrength(calculateStrength(password));
  }, [password]);

  // Submit form to backend
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingPassword) {
      
      // UPDATE
      const res = await fetch(`/api/passwords/${editingPassword._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website, websiteLink, username, password }), // send plaintext
      });

      if (res.ok) {
        const updatedPassword = await res.json();
        updatedPassword.password = password; // plaintext for frontend
        onPasswordUpdated(updatedPassword);
      } else {
        console.error("Failed to update password");
      }
    } else {
      // ADD
      const res = await fetch("/api/passwords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website, websiteLink, username, password }), // plaintext
      });

      if (res.ok) {
        const savedPassword = await res.json();
        savedPassword.password = password; // plaintext for frontend
        onPasswordAdded(savedPassword);
      } else {
        console.error("Failed to add password");
      }
    }

    // Reset form
    setWebsite("");
    setWebsiteLink("");
    setUsername("");
    setPassword("");
    setStrength("");
    setEditingPassword(null);
    closeDrawer();
  } catch (error) {
    console.error("Error submitting password:", error);
  }
};



  useEffect(() => {
  if (editingPassword) {
    setWebsite(editingPassword.website);
    setWebsiteLink(editingPassword.websiteLink);
    setUsername(editingPassword.username);
    setPassword(editingPassword.password); // plaintext from GET
  } else {
    setWebsite("");
    setWebsiteLink("");
    setUsername("");
    setPassword("");
  }
}, [editingPassword]);



  return (
    <>
      {/* Overlay */}
      <div
        className={`overlay ${isAPOpen ? "show" : ""}`}
        onClick={closeDrawer}
      ></div>

      {/* Drawer Form */}
      <form onSubmit={handleSubmit}>
        <div className={`drawer ${isAPOpen ? "open" : ""}`}>
          <button type="button" className="close-btn" onClick={closeDrawer}>
            ×
          </button>

          {/* Website Name */}
          <div className="inputField">
            <div className="inputbox">
              <input
                type="text"
                placeholder="Website Name"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>

          {/* Website Link */}
          <div className="inputField">
            <label>Website Link</label>
            <div className="inputbox">
              <Image src="/website.png" alt="" width={24} height={24} />
              <input
                type="text"
                placeholder="https://example.com"
                value={websiteLink}
                onChange={(e) => setWebsiteLink(e.target.value)}
              />
            </div>
          </div>

          {/* Username */}
          <div className="inputField">
            <label>Username</label>
            <div className="inputbox">
              <Image src="/user.png" alt="" width={24} height={24} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="inputField">
            <label>Password</label>
            <div className="inputbox">
              <Image src="/password.png" alt="" width={24} height={24} />
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password && <p className={`strength ${strength}`}>{strength}</p>}
            </div>
          </div>

          {/* Add Button */}
          <div className="Addbtn">
            <button type="submit">Add +</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddNewPassword;
