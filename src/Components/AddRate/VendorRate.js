import React, { useState } from "react";
import "./AddRate.css";
import Sidebar from "../Sidebar/Sidebar";
import Alert from "../AddCustomer/Alert";

const VendorRate = () => {
  const initialFormData = {
    company_Name: "",
    GST_No: "",
    vender_Name: "",
    mobile_Number: "",
    vehicle: "",
    title: "",
    rate: "",
    rate_per_Km: "",
    hour: "",
    km: "",
    // extra_km: "",
    extra_hour: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [mobilenoError, setMobilenoError] = useState(""); 
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile_Number" && value.length > 10) {
      // Prevent further input if more than 10 digits
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "mobile_Number") {
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


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting and causing a page reload

    // Validate form fields
    for (const key in formData) {
      if (formData[key] === "") {
        window.alert("All fields are required");
        return;
      }
    }
  
    // Check if mobile number validation error exists
    if (mobilenoError) {
      window.alert(mobilenoError);
      return;
    }

    try {
      const response = await fetch(
        "https://carbookingbackend.onrender.com/api/vender-rate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Sending the updated formData instead of initialFormData
        });

      if (response.ok) {
        showAlert("Vender added successfully!" , "success");
        setFormData(initialFormData); // Reset the form fields to their initial values
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
      <div className="rate-Add-container">
        <div className="rate-main-container">
          <div className="rate-form-container">
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Vendor Rate
            </h2>
            
            {successAlert && <Alert alert={successAlert} />}
      {errorAlert && <Alert alert={errorAlert} />}
            
            <form onSubmit={handleSubmit}>
            
              <div className="rate-form-group">
                <label htmlFor="company_Name" className="form-label">
                  Company Name:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="company_Name"
                  name="company_Name"
                  placeholder="Company Name"
                  value={formData.company_Name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="GST_No" className="form-label">
                  GST No:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="GST_No"
                  name="GST_No"
                  placeholder="GST No."
                  value={formData.GST_No}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="vender_Name" className="form-label">
                  Vendor Name:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="vender_Name"
                  name="vender_Name"
                  placeholder="Vendor Name"
                  value={formData.vender_Name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile_Number" className="form-label">
                  Mobile No:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="mobile_Number"
                  name="mobile_Number"
                  placeholder="Mobile No."
                  value={formData.mobile_Number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="trip-form-group">
            <label htmlFor="vehicle" className="trip-form-label">
              Type Of Vehicle:
            </label>
            <select
              className="form-control-add-trip-input"
              name="vehicle"
              id="vehicle"
              onChange={handleChange}
              value={formData.vehicle}
            >
              <option value="">Vehicle</option>
              <option value="Sedan Car">Sedan Car</option>
              <option value="Mini Car">Mini Car</option>
              <option value="SUV Car">SUV Car</option>
              <option value="AC Bus 13-Seater">AC Bus 13-Seater</option>
              <option value="AC Bus 17-Seater">AC Bus 17-Seater</option>
              <option value="AC Bus 20-Seater">AC Bus 20-Seater</option>
              <option value="AC Bus 32-Seater">AC Bus 32-Seater</option>
              <option value="AC Bus 35-Seater">AC Bus 35-Seater</option>
              <option value="AC Bus 40-Seater">AC Bus 40-Seater</option>
              <option value="AC Bus 45-Seater">AC Bus 45-Seater</option>
              <option value="Non-AC Bus 17-Seater">Non-AC Bus 17-Seater</option>
              <option value="Non-AC Bus 20-Seater">Non-AC Bus 20-Seater</option>
              <option value="Non-AC Bus 32-Seater">Non-AC Bus 32-Seater</option>
              <option value="Non-AC Bus 40-Seater">Non-AC Bus 40-Seater</option>
              <option value="Non-AC Bus 45-Seater">Non-AC Bus 45-Seater</option>
              <option value="Non-AC Bus 49-Seater">Non-AC Bus 49-Seater</option>
            </select>
          </div>
              {/* <div className="form-group">
                <label htmlFor="rate_per_Km" className="form-label">
                  Rate Per KM (Extra Km):
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="rate_per_Km"
                  name="rate_per_Km"
                  placeholder="Rate Per KM"
                  value={formData.rate_per_Km}
                  onChange={handleChange}
                  required
                />
              </div> */}


              <div className="d-flex gap-3">
                <div>
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">
                      Duty Type:
                      <span className="required-asterisk">*</span>
                    </label>
                    <select
                      className="rate-form-control"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleChange}
                    >
                      <option value="">Duty Type</option>
                      <option value="One Day / 80km">One Day /80km-Local Duty</option>
                      <option value="One Day / 300km">One Day /300km-Outstation Duty</option>
                      <option value="440km- Local Airport Transfer">440km-Local Airport Transfer </option>
                      <option value="Pune-Mumbai Pickup Drop">Pune-Mumbai Pickup Dropoff</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="rate" className="form-label">
                      Rate:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="rate"
                      name="rate"
                      placeholder="rate"
                      value={formData.rate}
                      onChange={handleChange}
                      required
                    />
                  </div>    
                </div>
              </div>
            
              <div className="d-flex gap-3">
                <div>
                  <div className="form-group">
                    <label htmlFor="km" className="form-label">
                    KM:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="km"
                      name="km"
                      placeholder="km"
                      value={formData.km}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="rate_per_Km" className="form-label">
                      Rate Per KM(Extra KM):
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="rate_per_Km"
                      name="rate_per_Km"
                      placeholder="Extra KM"
                      value={formData.rate_per_Km}
                      onChange={handleChange}
                      required
                    />
                  </div>    
                </div>
              </div>
              <div className="d-flex gap-3">
                <div>
                  <div className="form-group">
                    <label htmlFor="hour" className="form-label">
                      Hour:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="hour"
                      name="hour"
                      placeholder="hour"
                      value={formData.hour}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="extra_hour" className="form-label">
                      Rate Per Hour(Extra Hour):
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="extra_hour"
                      name="extra_hour"
                      placeholder="Extra Hour"
                      value={formData.extra_hour}
                      onChange={handleChange}
                      required
                    />
                  </div>    
                </div>
              </div>

              <button type="submit" className="rate-btn-submit" onClick={handleSubmit}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorRate;
