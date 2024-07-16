import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
    <>
      <div className="flex justify-center min-h-screen ">
        <div className="login-screen rounded-4 px-8 py-6 mx-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3 h-3/4 mt-28">
          <div className="flex justify-center">{/* Your SVG code */}</div>
          <h3 className="text-2xl font-bold text-center">
            Login in to your account
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div className="mt-4">
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex">
                <button
                  type="submit"
                  className="w-full px-6 py-2 mt-4 text-white bg-teal-500 rounded-lg hover:bg-teal-700 transition duration-200"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
