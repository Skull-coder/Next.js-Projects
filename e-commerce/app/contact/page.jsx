import React from 'react';
import Image from 'next/image';
import { assets } from '../assets/frontend_assets/assets';
import TitleText from '@/components/TitleText';
import './page.css';

const Contact = () => {
  return (
    <div className="contact-section">

      <div className="contact-header">
        <TitleText text1={'Contact'} text2={'Us'} />
      </div>

      <div className="contact-content">

        <div className="contact-image">
          <Image src={assets.contact_img} alt="Contact" style={{ width: '90%', height: 'auto' }}  />
        </div>

        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>We’d love to hear from you! Reach out to us using the information below or send us a message.</p>

          <div className="info-item">
            <strong>Address:</strong>
            <span>123 Forever Lane, Fashion Street, Mumbai, Maharashtra, India</span>
          </div>

          <div className="info-item">
            <strong>Email:</strong>
            <span>support@forever.com</span>
          </div>

          <div className="info-item">
            <strong>Phone:</strong>
            <span>+91 98765 43210</span>
          </div>

          <div className="info-item">
            <strong>Working Hours:</strong>
            <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Contact;
