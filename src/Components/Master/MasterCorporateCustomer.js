import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Alert from "../AddCustomer/Alert";

const initialFormData = {
  add_vehicle: "",
  add_duty_type: "",
  add_rate: "",
};

const MasterCorporateCustomer = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [successMessage, setSuccessMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);



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
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8787/api/masterrate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Data added successfully!", "success");
        setFormData(initialFormData);
      } else {
        showAlert("Failed to add data. Please try again.", "danger");
        console.error("Error posting data:", response.statusText);
      }
    } catch (error) {
      console.error("API request error:", error);
      showAlert("Failed to add data. Please try again.", "danger");
    }
  };


  return (
    <>
      <Sidebar />
      <div className="rate-Add-container pt-4">
        <div className="rate-main-container h-[98vh]">
          <div className="rate-form-container">
            <h2 className="text-center"
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                
              }}
            >
              Master
            </h2>

            {successAlert && <Alert alert={successAlert} />}
            {errorAlert && <Alert alert={errorAlert} />}
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="add_vehicle" className="form-label">
                  Add Vehicle:
                </label>
                <input
                  className="form-control-cust-add-input"
                  type="text"
                  id="add_vehicle"
                  name="add_vehicle"
                  placeholder="Add Vehicle"
                  onChange={(e) =>
                    setFormData({ ...formData, add_vehicle: e.target.value })
                  }
                  value={formData.add_vehicle}
                />
              </div>
              <div className="d-flex gap-3">
                <div>
                  <div className="form-group">
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
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="add_rate" className="form-label">
                      Add Rate:
                    </label>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="add_rate"
                      name="add_rate"
                      placeholder="Add Rate"
                      value={formData.add_rate}
                      onChange={(e) =>
                        setFormData({ ...formData, add_rate: e.target.value })
                      }
                    />
                  </div>
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
