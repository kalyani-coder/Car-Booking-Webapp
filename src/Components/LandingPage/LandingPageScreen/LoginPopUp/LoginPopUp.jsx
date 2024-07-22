import React from "react";
import { useState } from "react";
import "./LoginPopUp.css";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPopUp = ({ setshowLoginPopUp }) => {
  const [currState, setCurrState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8787/api/admin/login",
        {
          email,
          password,
        }
      );

      // Store the JWT token in local storage
      localStorage.setItem("token", response.data.token);

      // Navigate to the home page upon successful login
      navigate("/home");
    } catch (error) {
      // Show alert for invalid credentials or other errors
      alert(error.response?.data?.message || "An error occurred during login");
    }
  };
  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <RxCross2
            className="cross-btn"
            size={25}
            onClick={() => setshowLoginPopUp(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              onChange={handleInputChange}
              required
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {/* {currState==='Login'?<p>Create a new account? <span onClick={()=>setCurrState('Sign Up')}>Click here</span></p>:<p>Already have an account? <span onClick={()=>setCurrState('Login')}>Login here</span></p>} */}
      </form>
    </div>
  );
};

export default LoginPopUp;
