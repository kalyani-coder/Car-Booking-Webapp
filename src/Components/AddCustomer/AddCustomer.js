import React, { useState } from "react";
import "./AddCustomer.css";
import Sidebar from "../Sidebar/Sidebar";

const AddCustomer = () => {
  
  const initialFormData = {
    customername: "",
    companyname: "",
    gstno: "",
    mobileno: "",
    email: "",
    address: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const [mobilenoError, setMobilenoError] = useState(""); // State for mobile number validation error

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
      // Validate mobile number (10 digits)
      if (!/^\d{10}$/.test(value)) {
        setMobilenoError("Mobile number must be 10 digits");
      } else {
        setMobilenoError("");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formData.customername.trim() === "" ||
      formData.companyname.trim() === "" ||
      formData.gstno.trim() === "" ||
      formData.mobileno.trim() === "" ||
      formData.email.trim() === "" ||
      formData.address.trim() === ""
    ) {
      alert("All fields are required.");
      return;
    }

    if (mobilenoError) {
      alert("Mobile number is not valid.");
      return;
    }

    try {
      const requestBody = {
        Cus_name: formData.customername,
        company_name: formData.companyname,
        gst_no: formData.gstno,
        Cus_Mobile: formData.mobileno,
        Cus_Email: formData.email,
        address: formData.address,
      };

      const response = await fetch("https://carbooking-backend-fo78.onrender.com/api/add-customers", {
                                     
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

      // ... (API request and success handling)
    } catch (error) {
      console.error("API request error:", error);
      alert("Failed to add data. Please try again.");
    }
  };



  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <div className="customer-form-container">
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>Add Customer</h2>
            <div className="customer-form-group">
              <label htmlFor="customername" className="form-label">
                Customer Name:
              </label>
              <input
                className="form-control-cust-add-input"
                type="text"
                id="customername"
                name="customername"
                placeholder="Customer Name"
                onChange={handleChange}
                value={formData.customername}
              />
            </div>
            <div className="form-group">
              <label htmlFor="companyname" className="form-label">
                Company Name:
              </label>
              <input
                className="form-control-cust-add-input"
                type="text"
                id="companyname"
                name="companyname"
                placeholder="Company Name"
                onChange={handleChange}
                value={formData.companyname}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gstno" className="form-label">
                GST No:
              </label>
              <input
                className="form-control-cust-add-input"
                type="text"
                id="gstno"
                name="gstno"
                placeholder="GST No."
                onChange={handleChange}
                value={formData.gstno}
              />
            </div>
            <div className="form-group">
  <label htmlFor="mobileno" className="form-label">
    Mobile No:
  </label>
  <input
    className="form-control-cust-add-input"
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
              <label htmlFor="email" className="form-label">
                Email Id:
              </label>
              <input
                className="form-control-cust-add-input"
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
                className="form-control-cust-add-input"
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                value={formData.address}
              />
            </div>

            <button type="button" className="customer-btn-submit" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCustomer;
