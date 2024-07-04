import React, { useState } from "react";
import "./AddCustomer.css";
import Sidebar from "../Sidebar/Sidebar";
import Alert from "../AddCustomer/Alert";

const AddCustomer = () => {
  const initialFormData = {
    customername: "",
    // companyname: "",
    gstno: "",
    mobileno: "",
    email: "",
    address: "",
    Cus_Type : "",

  };

  const [formData, setFormData] = useState(initialFormData);
  const [mobilenoError, setMobilenoError] = useState(""); 
  const [emailError, setEmailError] = useState(""); 
  const [gstnoError, setGstnoError] = useState(""); 
  const [errorAlert, setErrorAlert] = useState(null);

  const [selectCusType, setSelectCusType] = useState('');

  const handleSelectCustomer = (event) => {
    setSelectCusType(event.target.value);
  };

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Validate customer name to allow only letters and spaces
    if (name === "customername" && !/^[A-Za-z\s]+$/.test(value)) {
      return;
    }

    // For mobile number, limit to 10 digits
    if (name === "mobileno" && value.length > 10) {
      return;
    }

    // For GST number, limit to 15 characters
    if (name === "gstno" && value.length > 15) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate mobile number (10 digits)
    if (name === "mobileno") {
      if (!/^\d{10}$/.test(value)) {
        setMobilenoError("Mobile number must be 10 digits");
      } else {
        setMobilenoError("");
      }
    }

    // Validate GST number (exactly 15 alphanumeric characters)
    if (name === "gstno") {
      if (!/^[A-Za-z0-9]{15}$/.test(value)) {
        setGstnoError("GST number must be exactly 15 alphanumeric characters");
      } else {
        setGstnoError("");
      }
    }

    // Validate email address
    if (name === "email") {
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    // event.preventDefault();

    // Additional validation checks
    if (!/^[A-Za-z\s]+$/.test(formData.customername)) {
      alert("Customer name must contain only letters and spaces.");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobileno)) {
      alert("Mobile number must be 10 digits.");
      return;
    }

    if (!/^[A-Za-z0-9]{15}$/.test(formData.gstno)) {
      alert("GST number must be exactly 15 alphanumeric characters.");
      return;
    }

    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!formData.Cus_Type) {
      alert("Please Select Customer Type.");
      return;
    }

    try {
      const requestBody = {
        cus_name: formData.customername,
        // company_name: formData.companyname,
        gst_no: formData.gstno,
        cus_mobile: formData.mobileno,
        cus_email: formData.email,
        address: formData.address,
        Cus_Type : formData.Cus_Type,
      };

      const response = await fetch("http://localhost:8787/api/add-customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Response:", response);
        alert("Data added successfully!", "success");
        setFormData(initialFormData); // Clear the form fields
      } else {
        alert("Failed to add data. Please try again.", "danger");
      }
    } catch (error) {
      console.error("API request error:", error);
      alert("Failed to add data. Please try again.", "danger");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="addcustomer-main-container">
          <div className="customer-form-container">
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }} className="text-center">Add Customer</h2>

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
              {gstnoError && <p className="error-message">{gstnoError}</p>}
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
              {emailError && <p className="error-message">{emailError}</p>}
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

            <div className="form-group">
              <label htmlFor="Cus_Type" className="form-label">
                Select Customer Type: 
                <span className="required-asterisk">*</span>
              </label>
              <select
                className="form-control-cust-add-input"
                id="Cus_Type"
                name="Cus_Type"
                onChange={handleChange}
                value={formData.Cus_Type}
              >
                <option value="" disabled selected>Select Customer Type</option>
                <option value="Indivisual">Indivisual Customer</option>
                <option value="Corporate">Corporate Customer</option>
              </select>
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
