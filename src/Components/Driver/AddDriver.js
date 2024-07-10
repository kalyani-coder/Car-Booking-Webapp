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
  const [validationMessages, setValidationMessages] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "mobileno" || name === "mobileno1") {
      // Allow only numeric values
      const cleanedValue = value.replace(/\D/g, "");

      if (cleanedValue.length > 10) {
        // Prevent further input if more than 10 digits
        return;
      }

      // Validate mobile numbers (exactly 10 digits)
      if (!/^\d{10}$/.test(cleanedValue)) {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          [name]: "Mobile number must be exactly 10 digits",
        }));
      } else {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          [name]: "",
        }));
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: cleanedValue,
      }));
    } else if (name === "email") {
      // Validate email
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          email: "Please enter a valid email address",
        }));
      } else {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          email: "",
        }));
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDriverNameChange = (event) => {
    const { value } = event.target;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        drivername: value,
      }));
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        drivername: "",
      }));
    } else {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        drivername: "Driver name must contain only letters and spaces",
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const { drivername, email, address, mobileno, mobileno1 } = formData;
  
    // Required fields validation (excluding email)
    const requiredFields = [
      { value: drivername, field: "drivername", label: "Driver Name" },
      { value: address, field: "address", label: "Address" },
      { value: mobileno, field: "mobileno", label: "Mobile No" },
      { value: mobileno1, field: "mobileno1", label: "Alternate Mobile No" },
    ];
  
    let newValidationMessages = {};
  
    requiredFields.forEach(({ value, field, label }) => {
      if (!value) {
        newValidationMessages[field] = `Please fill out the ${label}.`;
      }
    });
  
    if (!newValidationMessages.mobileno && !/^\d{10}$/.test(mobileno)) {
      newValidationMessages.mobileno = "Mobile number must be exactly 10 digits.";
    }
  
    if (!newValidationMessages.mobileno1 && !/^\d{10}$/.test(mobileno1)) {
      newValidationMessages.mobileno1 = "Alternate mobile number must be exactly 10 digits.";
    }
  
    if (email && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      newValidationMessages.email = "Please enter a valid email address.";
    }
  
    if (Object.keys(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      window.scrollTo(0, 0);
      return;
    }
  
    setValidationMessages({});
  
    try {
      const requestBody = {
        driver_Name: drivername,
        driver_Email: email,
        address: address,
        driver_Mo1: mobileno,
        driver_Mo2: mobileno1,
      };
  
      const response = await fetch("http://localhost:8787/api/add-drivers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        alert("Driver added successfully!");
        setFormData(initialFormData);
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
      <div className="driver-Add-container">
        <div className="driver-main-container">
          <div className="driver-form-container">
            <h2
              className="text-center"
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Add Driver
            </h2>
            <div className="driver-form-group">
              <label htmlFor="drivername" className="form-label">
                Driver Name:
                <span className="required-asterisk">*</span>
              </label>
              <input
                className={`form-control-dri-add-input ${
                  validationMessages.drivername ? "is-invalid" : ""
                }`}
                type="text"
                id="drivername"
                name="drivername"
                placeholder="Driver Name"
                onChange={handleDriverNameChange}
                value={formData.drivername}
              />
              {validationMessages.drivername && (
                <div className="invalid-feedback">
                  {validationMessages.drivername}
                </div>
              )}
            </div>
            <div className="driver-form-group">
              <label htmlFor="email" className="form-label">
                Email Id:
              </label>
              <input
                className={`form-control-dri-add-input }`}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="driver-form-group">
              <label htmlFor="address" className="form-label">
                Address:
                <span className="required-asterisk">*</span>
              </label>
              <input
                className={`form-control-dri-add-input ${
                  validationMessages.address ? "is-invalid" : ""
                }`}
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                value={formData.address}
              />
              {validationMessages.address && (
                <div className="invalid-feedback">
                  {validationMessages.address}
                </div>
              )}
            </div>
            <div className="driver-form-group">
              <label htmlFor="mobileno" className="form-label">
                Mobile No:
                <span className="required-asterisk">*</span>
              </label>
              <input
                className={`form-control-dri-add-input ${
                  validationMessages.mobileno ? "is-invalid" : ""
                }`}
                type="tel"
                id="mobileno"
                name="mobileno"
                placeholder="Mobile No."
                onChange={handleChange}
                value={formData.mobileno}
              />
              {validationMessages.mobileno && (
                <div className="invalid-feedback">
                  {validationMessages.mobileno}
                </div>
              )}
            </div>
            <div className="driver-form-group">
              <label htmlFor="mobileno1" className="form-label">
                Alternate Mobile No:
                <span className="required-asterisk">*</span>
              </label>
              <input
                className={`form-control-dri-add-input ${
                  validationMessages.mobileno1 ? "is-invalid" : ""
                }`}
                type="tel"
                id="mobileno1"
                name="mobileno1"
                placeholder="Alternate Mobile No."
                onChange={handleChange}
                value={formData.mobileno1}
              />
              {validationMessages.mobileno1 && (
                <div className="invalid-feedback">
                  {validationMessages.mobileno1}
                </div>
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
