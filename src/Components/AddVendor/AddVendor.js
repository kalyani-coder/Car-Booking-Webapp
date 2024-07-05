import React, { useState } from "react";
import "./AddVendor.css";
import Sidebar from "../Sidebar/Sidebar";
import Alert from "../AddCustomer/Alert";

const AddVendor = () => {
  const initialFormData = {
    vendorname: "",
    companyname: "",
    gstno: "",
    mobileno: "",
    email: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [mobilenoError, setMobilenoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [gstnoError, setGstnoError] = useState("");
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "vendorname" && !/^[A-Za-z\s]+$/.test(value)) {
      return;
    }
    if (
      name === "companyname" &&
      !/^[A-Za-z\s]*[A-Za-z][A-Za-z\s]*$/.test(value)
    ) {
      return;
    }

    if (name === "mobileno" && value.length > 10) {
      return;
    }

    if (name === "gstno" && value.length > 15) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "mobileno") {
      if (!/^\d{10}$/.test(value)) {
        setMobilenoError("Mobile number must be 10 digits");
      } else {
        setMobilenoError("");
      }
    }

    if (name === "gstno") {
      if (!/^[A-Za-z0-9]{15}$/.test(value)) {
        setGstnoError("GST number must be exactly 15 alphanumeric characters");
      } else {
        setGstnoError("");
      }
    }

    if (name === "email") {
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
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
      }, 5000);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!/^[A-Za-z\s]+$/.test(formData.vendorname)) {
      alert("Vendor name must contain only letters and spaces.");
      return;
    }
    if (!/^[A-Za-z\s]*[A-Za-z][A-Za-z\s]*$/.test(formData.companyname)) {
      alert(
        "Company name must contain letters and spaces, but not only numbers."
      );
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

    if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
    ) {
      alert("Please enter a valid email address.");
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

      const response = await fetch("http://localhost:8787/api/add-venders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert("Vendor added successfully!", "success");
        setFormData(initialFormData);
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
      <div className="vendor-Add-container">
        <div className="vendor-main-container">
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
            className="text-center mb-4 mt-4"
          >
            Add Vendor
          </h2>

          {successAlert && <Alert alert={successAlert} />}
          {errorAlert && <Alert alert={errorAlert} />}

          <div className="vendor-form-container relative pl-[14%]">
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
                />
                {gstnoError && <p className="error-message">{gstnoError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="mobileno" className="form-label">
                  Mobile No:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-ven-add-input"
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
                />
                {emailError && <p className="error-message">{emailError}</p>}
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
                />
              </div>

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
