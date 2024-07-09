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
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);
  const [drivernameError, setDrivernameError] = useState(""); // State for driver name validation error
  const [emailError, setEmailError] = useState("");

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

    if (name === "email") {
      // Validate email
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }

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
  const handleDriverNameChange = (e) => {
    const inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/[0-9]/g, ""); // Replace any numeric characters with an empty string
    setFormData((prevData) => ({
      ...prevData,
      drivername: cleanedValue,
    }));

    // Validate driver name (only text)
    if (!/^[A-Za-z\s]*$/.test(cleanedValue)) {
      setDrivernameError("Driver name must contain only letters and spaces");
    } else {
      setDrivernameError("");
    }
  };

  const showAlert = (message, type) => {
    if (type === "success") {
      setSuccessAlert({ msg: message, type: type });
      setTimeout(() => {
        setSuccessAlert(null);
      }, 5000);
    } else if (type === "error") {
      setErrorAlert({ msg: message, type: type });
      setTimeout(() => {
        setErrorAlert(null);
      }, 5000);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation checks
    if (
      formData.drivername.trim() === "" ||
      formData.address.trim() === "" ||
      formData.mobileno.trim() === "" ||
      formData.mobileno1.trim() === ""
    ) {
      alert("All fields are required.");
      return;
    }
    if (!/^[A-Za-z\s]+$/.test(formData.drivername)) {
      alert("Driver name must contain only letters and spaces.");
      return;
    }
    if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
    ) {
      alert("Please enter a valid email address.");
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

      const response = await fetch("http://localhost:8787/api/add-drivers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert("Driver added successfully!", "success");
        setFormData(initialFormData); // Clear the form fields
      } else {
        // Display backend error message if available
        alert(
          responseData.message || "Failed to add data. Please try again.",
          "danger"
        );
      }
    } catch (error) {
      console.error("API request error:", error);
      alert("Failed to add data. Please try again.", "danger");
    }
  };

  return (
    <>
      <div className="driver-Add-container">
        <div className="driver-main-container relative mt-7 ">
          <div className="driver-form-container">
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
              className="text-center"
            >
              Add Driver
            </h2>
            <div className="driver-form-group">
              <label htmlFor="drivername" className="form-label">
                Driver Name:
                <span className="required-asterisk">*</span>
              </label>
              <input
                className="form-control-dri-add-input"
                type="text"
                id="drivername"
                name="drivername"
                placeholder="Driver Name"
                onChange={handleDriverNameChange}
                value={formData.drivername}
              />
              {drivernameError && (
                <p className="error-message">{drivernameError}</p>
              )}
            </div>

            <div className="driver-form-group">
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
              {emailError && <p className="error-message">{emailError}</p>}
            </div>

            <div className="driver-form-group">
              <label htmlFor="address" className="form-label">
                Address:
                <span className="required-asterisk">*</span>
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

            <div className="driver-form-group">
              <label htmlFor="mobileno" className="form-label">
                Mobile No:
                <span className="required-asterisk">*</span>
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
              {mobilenoError && (
                <p className="error-message">{mobilenoError}</p>
              )}
            </div>

            <div className="driver-form-group">
              <label htmlFor="mobileno1" className="form-label">
                Alternate Mobile No:
                <span className="required-asterisk">*</span>
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
              {mobileno1Error && (
                <p className="error-message">{mobileno1Error}</p>
              )}
            </div>

            <button
              type="button"
              className="driver-btn-submit"
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDriver;
