import React, { useState } from "react";
import "./AddDriver.css";
import Sidebar from "../Sidebar/Sidebar";

const AddDriver = () => {
  const initialFormData = {
    drivername: "",
    email: "",
    address: "",
    mobileno: "",
    mobileno1: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const [mobilenoError, setMobilenoError] = useState(""); // State for mobile number validation error
  const [mobileno1Error, setMobileno1Error] = useState(""); // State for alternate mobile number validation error

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "mobileno" && value.length > 10) {
      // Prevent further input if more than 10 digits
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "mobileno") {
      // Validate mobile number (exactly 10 digits)
      if (!/^\d{10}$/.test(value)) {
        setMobilenoError("Mobile number must be 10 digits");
      } else {
        setMobilenoError("");
      }
    }
  };

  const handleChange2 = (event) => {
    const { name, value } = event.target;

    if (name === "mobileno1" && value.length > 10) {
      // Prevent further input if more than 10 digits
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "mobileno1") {
      // Validate alternate mobile number (exactly 10 digits)
      if (!/^\d{10}$/.test(value)) {
        setMobileno1Error("Alternate mobile number must be 10 digits");
      } else {
        setMobileno1Error("");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formData.drivername.trim() === "" ||
      formData.address.trim() === "" ||
      formData.mobileno.trim() === "" ||
      formData.mobileno1.trim() === ""
    ) {
      alert("All fields are required.");
      return;
    }

    if (mobilenoError || mobileno1Error) {
      alert("Mobile number or alternate mobile number is not valid.");
      return;
    }

    try {
      const requestBody = {
        driver_Name: formData.drivername,
        driver_Email: formData.email,
        address: formData.address,
        driver_Mo1: formData.mobileno,
        driver_Mo2: formData.mobileno1,
      };

      const response = await fetch("https://carbooking-backend-fo78.onrender.com/api/add-drivers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert("Data added successfully!");
        setFormData(initialFormData); // Clear the form fields
      } else {
        alert("Failed to add data. Please try again.");
      }
    } catch (error) {
      console.error("API request error:", error);
      alert("Failed to add data. Please try again.");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="driver-Add-container">
        <div className="driver-main-container">
          <div className="driver-form-container">
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>Add Driver</h2>
            <div className="driver-form-group">
              <label htmlFor="drivername" className="form-label">
                Driver Name:
              </label>
              <input
                className="form-control-dri-add-input"
                type="text"
                id="drivername"
                name="drivername"
                placeholder="Driver Name"
                onChange={handleChange}
                value={formData.drivername}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Id:
              </label>
              <input
                className="form-control-dri-add-input"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Address:
              </label>
              <input
                className="form-control-dri-add-input"
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                value={formData.address}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobileno" className="form-label">
                Mobile No:
              </label>
              <input
                className="form-control-dri-add-input"
                type="tel"
                id="mobileno"
                name="mobileno"
                placeholder="Mobile No."
                onChange={handleChange}
                value={formData.mobileno}
              />
              {mobilenoError && <p className="error-message">{mobilenoError}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="mobileno1" className="form-label">
                Alternate Mobile No:
              </label>
              <input
                className="form-control-dri-add-input"
                type="tel" 
                id="mobileno1"
                name="mobileno1"
                placeholder="Alternate Mobile No."
                onChange={handleChange2}
                value={formData.mobileno1}
              />
              {mobileno1Error && <p className="error-message">{mobileno1Error}</p>}
            </div>

            <button type="button" className="driver-btn-submit" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDriver;
