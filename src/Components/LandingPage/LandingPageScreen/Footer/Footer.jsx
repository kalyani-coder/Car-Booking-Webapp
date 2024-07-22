import React from "react";
import "./Footer.css";
import { TiSocialFacebook } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <p>
            Book your next ride effortlessly and embark on your next
            unforgettable journey.
          </p>
          <div className="footer-social-icons">
            <TiSocialFacebook size={25} />
            <SlSocialInstagram size={25} />
            <SlSocialTwitter size={25} />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/blog">Blog</Link>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-222-666-5555</li>
            <li>Contact@CarBooking.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 @ CarBooking.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
