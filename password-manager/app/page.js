"use client";
import { useState, useEffect } from "react";
import PasswordCard from "./components/PasswordCard";
import AddNewPassword from "./components/AddPassword";
import PasswordGenerator from "./components/PasswordGenerator";
import { useDrawer } from "./components/DrawerContext";
import './page.css';

export default function Home() {

  const { openDrawer } = useDrawer();

  const [passwords, setPasswords] = useState([]);
  const [editingPassword, setEditingPassword] = useState(null);

  const fetchPasswords = async () => {
    const res = await fetch("/api/passwords");
    const data = await res.json();
    setPasswords(data);
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  // This function will be called after adding a new password
  const handlePasswordAdded = (newPassword) => {
    setPasswords((prev) => [...prev, newPassword]);
  };

  const handleDelete = (id) => {
    setPasswords((prev) => prev.filter((p) => p._id !== id));
  };

  const handleUpdate = (updatedPassword) => {
    setPasswords((prev) =>
      prev.map((p) => (p._id === updatedPassword._id ? updatedPassword : p))
    );
  };

  const handleEdit = (password) => {
    setEditingPassword(password);
    openDrawer(); // ✅ opens the AddNewPassword drawer
  };

  return (
    <>
      <AddNewPassword
        onPasswordAdded={handlePasswordAdded}
        editingPassword={editingPassword}
        setEditingPassword={setEditingPassword}
        onPasswordUpdated={handleUpdate}   // ✅ new prop
      />
      <PasswordGenerator />

      <div className="Collection">
        {passwords.length > 0 ? (
          passwords.map((p) => (
            <PasswordCard
              key={p._id}
              _id={p._id}
              website={p.website}
              websiteLink={p.websiteLink}
              username={p.username}
              password={p.password}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p>No passwords stored yet.</p>
        )}
      </div>
    </>
  );
}
