import React, { useState } from "react";
import "./AddRate.css";
import Sidebar from "../Sidebar/Sidebar";

const CustomerRate = () => {
  const [mobilenoError, setMobilenoError] = useState('');
  const [formData, setFormData] = useState({
    company_Name: "",
    GST_No: "",
    customer_Name: "",
    mobile_Number: "", // Adjusted field name
    rate_per_km: "",
    title: "",
    rate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent further input if more than 10 digits
    if (name === "mobile_Number" && value.length > 10) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Reset mobile number error when user corrects the input
    if (name === "mobile_Number" && mobilenoError) {
      setMobilenoError('');
    }
  };

  // ... (rest of the code)


  const handleSubmit = async (e) => {
    // e.preventDefault();

    for (const key in formData) {
      if (formData[key] === "") {
        window.alert("All fields are required");
        return;
      }
    }


    const response = await fetch("https://carbooking-backend-fo78.onrender.com/api/customer-rate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      console.log("Data posted successfully!");
      window.alert('Data post Successfully')
    } else {
      console.error("Error posting data:", response.statusText);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="rate-Add-container">
        <div className="rate-main-container">
          <div className="rate-form-container">
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>
              Company Rate
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="rate-form-group">
                <label htmlFor="company_Name" className="form-label">
                  Company Name:
                </label>
                <div className="form-group">
                  <input
                    className="form-control-rate-add-input"
                    type="text"
                    id="company_Name"
                    name="company_Name"
                    placeholder="Company Name"
                    value={formData.company_Name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="GST_No" className="form-label">
                  GST No:
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="GST_No"
                  name="GST_No"
                  placeholder="GST No."
                  value={formData.GST_No}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="customer_Name" className="form-label">
                  Customer Name:
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="customer_Name"
                  name="customer_Name"
                  placeholder="Customer Name"
                  value={formData.customer_Name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
  <label htmlFor="mobileno" className="form-label">
    Mobile No:
  </label>
  <input
    className="form-control-cust-add-input"
    type="tel"
    id="mobile_Number"
    name="mobile_Number"
    placeholder="Mobile No."
    onChange={handleChange}
    value={formData.mobile_Number}
  />
  {mobilenoError && <p className="error-message">{mobilenoError}</p>}
</div>
              <div className="form-group">
                <label htmlFor="rate_per_km" className="form-label">
                  Rate Per KM:
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="number"
                  id="rate_per_km"
                  name="rate_per_km"
                  placeholder="Rate Per KM"
                  value={formData.rate_per_km}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex gap-3">
                <div>
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">
                      Title:
                    </label>
                    <select
                      className="rate-form-control"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleChange}
                    >
                      <option value="">Title</option>
                      <option value="One Day / 80km">One Day /80km</option>
                      <option value="One Day / 300km">One Day /300km</option>
                      {/* Add other options as needed */}
                    </select>
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="rate" className="form-label">
                      Rate:
                    </label>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="rate"
                      name="rate"
                      placeholder="rate"
                      value={formData.rate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="rate-btn-submit"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerRate;
