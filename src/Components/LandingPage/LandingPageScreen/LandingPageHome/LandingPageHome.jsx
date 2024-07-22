import React from "react";
import "./LandingPageHome.css";
import heroImg from "../../Images/heroImg.svg";
import Navbar from "./../Navbar/Navbar";
import Footer from "../Footer/Footer";

const LandingPageHome = () => {
  return (
    <>
      <Navbar />
      <div className="landing-page-container">
        <div className="landing-content">
          <h1>Drive Your Dreams: Book Your Ride Today!</h1>
          <p>
            Enjoy hassle-free reservations with our easy-to-use booking system.
            Just a few clicks and you're on your way.
          </p>
        </div>
        <div className="landing-img">
          <img src={heroImg} alt="" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPageHome;
