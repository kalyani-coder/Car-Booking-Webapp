
import React, { useState } from "react";
import "./AddVendor.css";
import Sidebar from "../Sidebar/Sidebar";
import Alert from "../AddCustomer/Alert"

const AddVendor = () => {
  const initialFormData = {
    vendorname: "",
    companyname: "",
    gstno: "",
    mobileno: "",
    email: "",
    address: "",
    drivername: "",
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
    if (
      formData.vendorname.trim() === "" ||
      formData.companyname.trim() === "" ||
      formData.gstno.trim() === "" ||
      formData.mobileno.trim() === "" ||
      formData.email.trim() === "" ||
      formData.address.trim() === ""
    ) {
      alert("All fields are required.");
      return;
    }
    try {
      const requestBody = {
        vender_Name: formData.vendorname,
        company_Name: formData.companyname,
        GST_No: formData.gstno,
        vender_Mobile: formData.mobileno,
        Vender_Email: formData.email,
        address: formData.address,
      };

  
      const response = await fetch("http://localhost:7000/api/add-venders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        showAlert("Vendor added successfully!" , "success");
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
      <div className="vendor-Add-container">
        <div className="vendor-main-container">
        <h2 style={{fontSize:"2rem",fontWeight:"bold",marginBottom:"8px"}}>Add Vendor</h2>
        
        {successAlert && <Alert alert={successAlert} />}
      {errorAlert && <Alert alert={errorAlert} />}
            
          <div className="vendor-form-container">
            <form>
              <div className="vendor-form-group">
                <label htmlFor="vendorname" className="form-label">
                  Vendor Name:
                <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-ven-add-input"
                  type="text"
                  id="vendorname"
                  name="vendorname"
                  placeholder="Vendor Name"
                  onChange={handleChange}
                  value={formData.vendorname}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="companyname" className="form-label">
                  Company Name:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-ven-add-input"
                  type="text"
                  id="companyname"
                  name="companyname"
                  placeholder="Company Name"
                  onChange={handleChange}
                  value={formData.companyname}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="gstno" className="form-label">
                  GST No:
                <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-ven-add-input"
                  type="text"
                  id="gstno"
                  name="gstno"
                  placeholder="GST No."
                  onChange={handleChange}
                  value={formData.gstno}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobileno" className="form-label">
                  Mobile No:
                <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-ven-add-input"
                  type="number"
                  id="mobileno"
                  name="mobileno"
                  placeholder="Mobile No."
                  onChange={handleChange}
                  value={formData.mobileno}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Id:
                <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-ven-add-input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Address:
                <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-ven-add-input"
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  value={formData.address}
                  required
                />
              </div>
              {/* <div className="driver-form-group">
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
                onChange={handleChange}
                value={formData.drivername}
              />
            </div> */}

              <button
                type="submit"
                className="vendor-btn-submit"
                onClick={handleSubmit}
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVendor;

