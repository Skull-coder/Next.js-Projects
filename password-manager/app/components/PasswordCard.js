/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react';

import './PasswordCard.css';

const PasswordCard = ({ _id, websiteLink, username, password, website, onDelete, onEdit }) => {


    // Extract domain from website URL
    let domain = '';
    try {
        const url = website.startsWith("http") ? website : `https://${websiteLink}`;
        domain = new URL(url).hostname; // e.g., "www.google.com"
    } catch (error) {
        console.error('Invalid URL:', website);
        domain = website; // fallback
    }

    // Use Google favicon service
    const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
    };

    const handleDelete = async () => {
        const res = await fetch(`/api/passwords/${_id}`, { method: "DELETE" });

        if (res.ok) {
            console.log("Deleted successfully");
            onDelete(_id); // notify Home to remove from state
        } else {
            console.log("Failed to delete");
        }
    };


    return (
        <div className="mypasswordCard">

            <div className="editCard" onClick={() => onEdit({ _id, website, websiteLink, username, password })}>
                <img src="/edit.png" alt="" width={18} />
            </div>

            <div className="deleteCard" onClick={handleDelete}>
                <img src="/trash.png" alt="" width={19} />
            </div>

            <div className="head">
                <div className="headLogo">

                    <img
                        src={faviconUrl}
                        alt={`${domain} logo`}
                        width={45}
                        height={45}
                    />
                </div>
                <a
                    href={website.startsWith("http") ? website : `https://${websiteLink}`}
                    className="web-Link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 id="Website_Name">{website}</h2>
                </a>

            </div>

            <div className="informations">
                <div className="info" onClick={() => handleCopy(username)}>
                    <img src="/copy.png" alt="" width={16} />
                    <p>Username: {username}</p>
                </div>

                <div className="info" onClick={() => handleCopy(password)}>
                    <img src="/copy.png" alt="" width={16} />
                    <p>Password: &#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                </div>

            </div>
        </div>
    );
};

export default PasswordCard;
