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
  const [validationMessages, setValidationMessages] = useState({});

  const validateMobileNumber = (value) => {
    if (value.length !== 10) {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        mobileno: "Mobile number must be exactly 10 digits",
      }));
    } else {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        mobileno: "",
      }));
    }
  };

  const handleAlphaInputChange = (setter) => (event) => {
    const { value } = event.target;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setter(value);
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        vendorname: "",
      }));
    } else {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        vendorname: "Vendor name must contain only alphabets.",
      }));
    }
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;

    // Allow only numeric characters and limit to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setFormData({
        ...formData,
        [name]: value,
      });

      if (name === "mobileno") {
        validateMobileNumber(value);
      }
    }
  };

  // Handle form input changes
  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Convert GST number to uppercase
    if (name === "gstno") {
      const upperValue = value.toUpperCase();
      if (upperValue.length > 15) {
        return;
      }
      setFormData((prevData) => ({
        ...prevData,
        gstno: upperValue,
      }));

      // Validate GST number (exactly 15 alphanumeric characters)
      const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d]Z[A-Z\d]$/;
      if (upperValue.length === 15 && gstRegex.test(upperValue)) {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          gstno: "",
        }));
      } else {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          gstno:
            "GST number must be exactly 15 characters, alphanumeric, capital letters",
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    // Validate email address
    if (
      name === "email" &&
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)
    ) {
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
  };

  // handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { vendorname, companyname, gstno, mobileno, email, address } =
      formData;

    // Required fields validation
    const requiredFields = [
      { value: vendorname, field: "vendorname", label: "Vendor Name" },
      { value: companyname, field: "companyname", label: "Company Name" },
      { value: gstno, field: "gstno", label: "GST No" },
      { value: mobileno, field: "mobileno", label: "Mobile No" },
      { value: email, field: "email", label: "Email" },
      { value: address, field: "address", label: "Address" },
    ];

    let newValidationMessages = {};

    requiredFields.forEach(({ value, field, label }) => {
      if (!value) {
        newValidationMessages[field] = `Please fill out the ${label}.`;
      }
    });

    if (!newValidationMessages.mobileno && !/^\d{10}$/.test(mobileno)) {
      newValidationMessages.mobileno = "Mobile number must be 10 digits.";
    }

    const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d]Z[A-Z\d]$/;
    if (!newValidationMessages.gstno) {
      if (gstno.length !== 15) {
        newValidationMessages.gstno =
          "GST number must be exactly 15 characters long.";
      }
    }

    if (
      !newValidationMessages.email &&
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    ) {
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
        console.log("Response:", response);
        alert("Vendor added successfully!");
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
          <div className="vendor-form-container relative pl-[14%]">
            <form>
              <div className="vendor-form-group">
                <label htmlFor="vendorname" className="form-label">
                  Vendor Name:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className={`form-control-ven-add-input ${
                    validationMessages.vendorname ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="vendorname"
                  name="vendorname"
                  placeholder="Vendor Name"
                  onChange={handleAlphaInputChange((value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      vendorname: value,
                    }))
                  )}
                  value={formData.vendorname}
                  pattern="[A-Za-z\s]+"
                />
                {validationMessages.vendorname && (
                  <div className="invalid-feedback">
                    {validationMessages.vendorname}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="companyname" className="form-label">
                  Company Name:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className={`form-control-ven-add-input ${
                    validationMessages.companyname ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="companyname"
                  name="companyname"
                  placeholder="Company Name"
                  onChange={handleAlphaInputChange((value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      companyname: value,
                    }))
                  )}
                  value={formData.companyname}
                  pattern="[A-Za-z\s]+"
                />
                {validationMessages.companyname && (
                  <div className="invalid-feedback">
                    {validationMessages.companyname}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="gstno" className="form-label">
                  GST No:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className={`form-control-ven-add-input ${
                    validationMessages.gstno ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="gstno"
                  name="gstno"
                  placeholder="GST No."
                  onChange={handleChange}
                  value={formData.gstno}
                />
                {validationMessages.gstno && (
                  <div className="invalid-feedback">
                    {validationMessages.gstno}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="mobileno" className="form-label">
                  Mobile No:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className={`form-control-ven-add-input ${
                    validationMessages.mobileno ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="mobileno"
                  name="mobileno"
                  placeholder="Mobile Number"
                  onChange={handleNumericChange}
                  value={formData.mobileno}
                />
                {validationMessages.mobileno && (
                  <div className="invalid-feedback">
                    {validationMessages.mobileno}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className={`form-control-ven-add-input ${
                    validationMessages.email ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={formData.email}
                />
                {validationMessages.email && (
                  <div className="invalid-feedback">
                    {validationMessages.email}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Address:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className={`form-control-ven-add-input ${
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
            </form>
            <Alert validationMessages={validationMessages} />
          </div>
          <button
            className="customer-btn-submit"
            type="button"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddVendor;
