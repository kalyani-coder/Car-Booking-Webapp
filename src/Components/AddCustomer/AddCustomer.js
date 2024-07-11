import React, { useState } from "react";
import "./AddCustomer.css";
import Sidebar from "../Sidebar/Sidebar";

const AddCustomer = () => {
  const initialFormData = {
    customername: "",
    gstno: "",
    mobileno: "",
    email: "",
    address: "",
    Cus_Type: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [selectCusType, setSelectCusType] = useState("");
  const [validationMessages, setValidationMessages] = useState({});

  const handleSelectCustomer = (event) => {
    setSelectCusType(event.target.value);
  };

  const validateMobileNumber = (value) => {
    if (value.length > 10) {
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
        customername: "",
      }));
    } else {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        customername: "Customer name must contain only alphabets.",
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
    const { customername, mobileno, gstno, email, address, Cus_Type } =
      formData;

    // Required fields validation
    const requiredFields = [
      { value: customername, field: "customername", label: "Customer Name" },
      { value: mobileno, field: "mobileno", label: "Mobile No" },
      { value: gstno, field: "gstno", label: "GST No" },
      { value: email, field: "email", label: "Email" },
      { value: address, field: "address", label: "Address" },
      { value: Cus_Type, field: "Cus_Type", label: "Customer Type" },
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
      if (gstno.length !== 15 || !gstRegex.test(gstno)) {
        newValidationMessages.gstno =
          "GST number must be exactly 15 characters long and follow the format.";
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
        cus_name: formData.customername,
        gst_no: formData.gstno,
        cus_mobile: formData.mobileno,
        cus_email: formData.email,
        address: formData.address,
        Cus_Type: formData.Cus_Type,
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
        const customerTypeMessage =
          Cus_Type === "Corporate"
            ? "Corporate customer added successfully!"
            : "Individual customer added successfully!";
        alert(customerTypeMessage);
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
      <div className="customer-Add-container">
        <div className="addcustomer-main-container">
          <div className="width-set-for-form-groupt-cc--dd">
            <h2 className="View-Corporate-Customer-Rate font-bold p-4 my-4">
              Add Customer
            </h2>
            <div className="customer-form-group">
              <label htmlFor="customername" className="form-label">
                Customer Name / Company Name:
                <span className="required-asterisk">*</span>
              </label>
              <input
                className={`form-control-cust-add-input ${
                  validationMessages.customername ? "is-invalid" : ""
                }`}
                type="text"
                id="customername"
                name="customername"
                placeholder="Customer Name"
                onChange={handleAlphaInputChange((value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    customername: value,
                  }))
                )}
                value={formData.customername}
                pattern="[A-Za-z\s]+"
              />
              {validationMessages.customername && (
                <div className="invalid-feedback">
                  {validationMessages.customername}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="gstno" className="form-label">
                GST No:
                <span className="required-asterisk">*</span>
              </label>
              <input
                className={`form-control-cust-add-input ${
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
                className={`form-control-cust-add-input ${
                  validationMessages.mobileno ? "is-invalid" : ""
                }`}
                type="tel"
                id="mobileno"
                name="mobileno"
                placeholder="Mobile No."
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
                Email Id:
                <span className="required-asterisk">*</span>
              </label>
              <input
                className={`form-control-cust-add-input ${
                  validationMessages.email ? "is-invalid" : ""
                }`}
                type="email"
                id="email"
                name="email"
                placeholder="Email id"
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
                className={`form-control-cust-add-input ${
                  validationMessages.email ? "is-invalid" : ""
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

            <div className="form-group">
              <label htmlFor="Cus_Type" className="form-label">
                Select Customer Type:
                <span className="required-asterisk">*</span>
              </label>
              <select
                className={`form-control-cust-add-input ${
                  validationMessages.Cus_Type ? "is-invalid" : ""
                }`}
                id="Cus_Type"
                name="Cus_Type"
                onChange={handleChange}
                value={formData.Cus_Type}
              >
                <option value="" disabled selected>
                  Select Customer Type
                </option>
                <option value="Indivisual">Indivisual Customer</option>
                <option value="Corporate">Corporate Customer</option>
              </select>
              {validationMessages.Cus_Type && (
                <div className="invalid-feedback">
                  {validationMessages.Cus_Type}
                </div>
              )}
            </div>

            <button
              type="button"
              className="customer-btn-submit"
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

export default AddCustomer;
