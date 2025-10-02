import React from "react";
import Image from "next/image";
import './Footer.css';
import { assets } from "@/app/assets/frontend_assets/assets";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerTop">
        <div className="footerLogo">
          <Image src={assets.logo} alt="logo" height={45} />
          <p>Your convenience, our commitment.</p>
        </div>
        <div className="footerLinks">
          <div className="linkColumn">
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="linkColumn">
            <h4>Support</h4>
            <ul>
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Help Center</li>
            </ul>
          </div>
          <div className="linkColumn">
            <h4>Legal</h4>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footerBottom">
        <p>© 2025 Forever. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
