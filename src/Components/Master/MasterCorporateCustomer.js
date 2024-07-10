import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Alert from "../AddCustomer/Alert";
import "./MasterCorporateCustomer.css";
const initialFormData = {
  add_vehicle: "",
  add_duty_type: "",
  add_rate: "",
};

const MasterCorporateCustomer = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [validationMessages, setValidationMessages] = useState({});

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

  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let newValidationMessages = {};
  
    if (formData.add_vehicle.trim() === "") {
      newValidationMessages.add_vehicle = "Add Vehicle is required.";
    }
    if (formData.add_rate.trim() === "") {
      newValidationMessages.add_rate = "Add Rate is required.";
    }
  
    if (Object.keys(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      window.scrollTo(0, 0); // Scroll to the top if there are validation errors
      return;
    } else {
      setValidationMessages({});
    }
  
    try {
      const response = await fetch("http://localhost:8787/api/masterrate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Master added successfully!", "success");
        setFormData(initialFormData);
      } else {
        alert("Failed to add data. Please try again.", "error");
        console.error("Error posting data:", response.statusText);
      }
    } catch (error) {
      console.error("API request error:", error);
      alert("Failed to add data. Please try again.", "error");
    }
  };
  

  return (
    <>
      <div className="rate-Add-container pt-4">
        <div className="rate-main-container h-[98vh]">
          <div className="rate-form-container">
            <h2
              className="text-center"
              style={{fontSize: "2rem",fontWeight: "bold",marginBottom: "1rem",}}>Master</h2>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="add_vehicle" className="form-label">
                  Add Vehicle:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className={`form-control-cust-add-input ${
                  validationMessages.add_vehicle ? "is-invalid" : ""
                }`}
                  type="text"
                  id="add_vehicle"
                  name="add_vehicle"
                  placeholder="Add Vehicle"
                  onChange={handleAlphaInputChange((value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    add_vehicle: value,
                  }))
                )}
                value={formData.add_vehicle}
                pattern="[A-Za-z\s]+"
                />
                {validationMessages.add_vehicle && (
                <div className="invalid-feedback">
                  {validationMessages.add_vehicle}
                </div>
              )}
              </div>
              <div className="add-duty-type-and-add-rate-inputs">
                <div className="w-full">
                  <label htmlFor="add_duty_type" className="form-label">
                    Add Duty Type:
                  </label>
                  <input
                    className="rate-form-control"
                    type="text"
                    id="add_duty_type"
                    name="add_duty_type"
                    placeholder="Add Duty Type"
                    value={formData.add_duty_type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        add_duty_type: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="add_rate" className="form-label">
                    Add Rate:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    className={`rate-form-control ${
                  validationMessages.add_rate ? "is-invalid" : ""
                }`}
                    type="number"
                    id="add_rate"
                    name="add_rate"
                    placeholder="Add Rate"
                    value={formData.add_rate}
                    onChange={(e) =>
                      setFormData({ ...formData, add_rate: e.target.value })
                    }
                  />
                  {validationMessages.add_rate && (
                <div className="invalid-feedback">
                  {validationMessages.add_rate}
                </div>
              )}
                </div>
              </div>

              <button type="submit" className="rate-btn-submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterCorporateCustomer;
