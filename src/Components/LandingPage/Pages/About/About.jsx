import React from "react";
import "./About.css";
import aboutImg from "../../Images/aboutImg.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../LandingPageScreen/Navbar/Navbar";
import Footer from "../../LandingPageScreen/Footer/Footer";

const About = () => {
  const [isExtended, setExtended] = useState(false);

  return (
    <>
      <Navbar />
      <div className="about-main-container ">
        <div className="about-container">
          <div className="about-content">
            <h1>
              Car Rent, <br />
              <span className="colored-content">For You</span>{" "}
            </h1>
            <p>
              Enjoy hassle-free reservations with our easy-to-use booking
              system. Just a few clicks and you're on your way.
            </p>
            <div className="about-buttons">
              <a href="#extended-about-us">
                <button onClick={() => setExtended(true)}>Read More</button>
              </a>
              <Link to="/contact">
                {" "}
                <button className="contact-btn">Contact Us</button>
              </Link>
            </div>
          </div>
          <div className="about-img">
            <img src={aboutImg} alt="" />
          </div>
        </div>
        {isExtended ? (
          <div className="extended-about-us" id="extended-about-us">
            <h2>We reimagine the way the world moves for the better</h2>
            <p>
              Movement is what we power. It’s our lifeblood. It runs through our
              veins. It’s what gets us out of bed each morning. It pushes us to
              constantly reimagine how we can move better. For you. For all the
              places you want to go. For all the things you want to get. For all
              the ways you want to earn. Across the entire world. In real time.
              At the incredible speed of now.
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </>
  );
};

export default About;
