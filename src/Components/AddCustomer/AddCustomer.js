import React, { useState } from "react";
import "./AddCustomer.css";
import Sidebar from "../Sidebar/Sidebar";
import Alert from "../AddCustomer/Alert";

const AddCustomer = () => {
  const initialFormData = {
    // customer_type: "",
    customername: "",
    companyname: "",
    gstno: "",
    mobileno: "",
    email: "",
    address: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const [mobilenoError, setMobilenoError] = useState(""); // State for mobile number validation error
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

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
      },);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any required fields are empty or undefined
    if (
      !formData.customername ||
      // !formData.companyname ||
      !formData.gstno ||
      !formData.mobileno ||
      !formData.email ||
      !formData.address ||
      formData.customername.trim() === "" ||
      // formData.companyname.trim() === "" ||
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
        cus_name: formData.customername,
        company_name: formData.companyname,
        gst_no: formData.gstno,
        cus_mobile: formData.mobileno,
        cus_email: formData.email,
        address: formData.address,
      };

      const response = await fetch("http://localhost:7000/api/add-customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Response:", response);
        showAlert("Data added successfully!" , "success");
        console.log('Trip allocated successfully:', response.data);
        setFormData(initialFormData); // Clear the form fields
      } else {
        showAlert("Failed to add data. Please try again.", "danger");
      }
    } catch (error) {
      console.error("API request error:", error);
      showAlert("Failed to add data. Please try again.", "danger");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <div className="customer-form-container">
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>Add Customer</h2>

            {successAlert && <Alert alert={successAlert} />}
      {errorAlert && <Alert alert={errorAlert} />}
            
            <div className="customer-form-group">
              <label htmlFor="customername" className="form-label">
                Customer Name / Company Name:
                <span className="required-asterisk">*</span>
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
            {/* <div className="form-group">
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
            </div> */}
            <div className="form-group">
              <label htmlFor="gstno" className="form-label">
                GST No:
                <span className="required-asterisk">*</span>
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
                <span className="required-asterisk">*</span>
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
                <span className="required-asterisk">*</span>
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
                <span className="required-asterisk">*</span>
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
