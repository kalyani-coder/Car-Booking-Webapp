import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import LoginPopUp from "../LoginPopUp/LoginPopUp";
import Sidebar from "../Sidebar/Sidebar";
import carbookinglogo from "../../../../Assets/images/shivpushpa_logo.png";
import "./Navbar.css";
const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showLoginPopUp, setshowLoginPopUp] = useState(false);

  return (
    <>
      {showLoginPopUp ? (
        <LoginPopUp setshowLoginPopUp={setshowLoginPopUp} />
      ) : (
        <></>
      )}
      {showSidebar ? (
        <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      ) : (
        <></>
      )}

      <div className="navbar-main-container">
        <div className="navbar">
          <div className="navbar-menu-logo">
            <div className="hamburger-menu">
              {/* <RiMenu2Line size={25} onClick={()=>setShowSidebar(!showSidebar)}/> */}
              {showSidebar ? (
                <RxCross2
                  size={25}
                  color={"#01004C"}
                  onClick={() => setShowSidebar(!showSidebar)}
                />
              ) : (
                <RiMenu2Line
                  size={25}
                  color={"#01004C"}
                  onClick={() => setShowSidebar(!showSidebar)}
                />
              )}
            </div>
            <div className="section-logo-for-car-booking-landing-page">
              <img
                src={carbookinglogo}
                alt=""
                className="logo-for-car-booking-landing-page"
              />
            </div>
          </div>
          <ul className="navbar-menu">
            <Link
              to="/landingpage"
              className={menu === "home" ? "active" : ""}
              onClick={() => setMenu("home")}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={menu === "about" ? "active" : ""}
              onClick={() => setMenu("about")}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={menu === "contact" ? "active" : ""}
              onClick={() => setMenu("contact")}
            >
              Contact
            </Link>
            <Link
              to="/blogs"
              className={menu === "Blog" ? "active" : ""}
              onClick={() => setMenu("Blog")}
            >
              Blog
            </Link>
          </ul>
          <div className="navbar-right">
            <button onClick={() => setshowLoginPopUp(true)}>Sign in</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
