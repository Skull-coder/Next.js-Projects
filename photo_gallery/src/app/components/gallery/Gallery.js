"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Gallery = ({ section }) => {
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState([]);

  const getAcceptedTypes = () => {
    switch (section) {
      case "image":
        return "image/*";
      case "video":
        return "video/*";
      case "document":
        return ".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx";
      default:
        return "*/*"; // fallback
    }
  };

  const fetchMedia = async () => {
    try {
      const res = await axios.get(`/api/getMedia?type=${section}`);
      setMedia(res.data.media || []);
    } catch (err) {
      console.error("Error fetching media:", err);
    }
  };


  useEffect(() => {
    fetchMedia();
  }, [section]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64File = reader.result.split(",")[1];

      try {
        const res = await fetch("/api/uploadMedia", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file: base64File,
            fileName: file.name,
            type: section,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");

        fetchMedia();
        console.log("Uploaded:", data.media);
      } catch (err) {
        console.error(err);
        alert("❌ Upload failed: " + err.message);
      } finally {
        setLoading(false);
        e.target.value = ""; // reset file input
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-black rounded-3xl overflow-y-scroll h-[calc(100vh-100px)] w-full no-scrollbar relative">



      <div className="p-4 flex items-center gap-7 ">
        {media.length > 0 ? (
          media.map((item) => (
            <div key={item._id}>
              {item.type === "image" ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-48 object-contain cursor-pointer hover:opacity-80 transition"
                  />
                </a>
              ) : item.type === "video" ? (
                <video src={item.url} controls className="w-full h-48 object-cover" />
              ) : (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 text-center"
                >
                  📄 {item.name}
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="col-span-full text-center mx-auto text-gray-400">No {section}s uploaded yet.</p>
        )}
      </div>





      {/* Floating File Upload Button */}
      <label
        htmlFor="fileUpload"
        className={`fixed right-[5%] bottom-[5%] w-12 h-12 flex items-center justify-center rounded-full 
          ${loading ? "bg-gray-500" : "bg-blue-400 hover:bg-blue-500"} 
          cursor-pointer transition duration-200`}
        title="Upload Media"
      >
        {loading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <img src="/plus.svg" alt="Upload" className="w-6 h-6" />
        )}
      </label>

      <input
        id="fileUpload"
        type="file"
        accept={getAcceptedTypes()}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default Gallery;
