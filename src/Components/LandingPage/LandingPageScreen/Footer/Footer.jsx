import React from "react";
import { TiSocialFacebook } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import companylogofooter from "../../../../Assets/images/shivpushpa_logo-footer.png";
import "./Footer.css";

const Footer = () => {
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToTop();
  }, [location]);

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
          <div className="footer-social-logo-section">
            <img src={companylogofooter} alt="company logo footer" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <Link to="/" onClick={scrollToTop}>
              Home
            </Link>
            <Link to="/about" onClick={scrollToTop}>
              About Us
            </Link>
            <Link to="/contact" onClick={scrollToTop}>
              Contact Us
            </Link>
            <Link to="/blogs" onClick={scrollToTop}>
              Blog
            </Link>
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
