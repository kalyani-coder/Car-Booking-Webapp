import React, { useState } from "react";
import "./AddRate.css";
import Sidebar from "../Sidebar/Sidebar";

const VendorRate = () => {
  const initialFormData = {
    company_Name: "",
    GST_No: "",
    vender_Name: "",
    mobile_Number: "",
    rate_per_Km: "",
    title: "",
    rate: "",
    vehicle: "",
    hour: "",
    km: "",
    extra_km: "",
    extra_hour: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting and causing a page reload

    for (const key in formData) {
      if (formData[key] === "") {
        window.alert("All fields are required");
        return;
      }
    }

    const response = await fetch(
      "https://carbooking-backend-fo78.onrender.com/api/vender-rate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      console.log("Data posted successfully!");
      window.alert("Data posted Successfully");
      setFormData(initialFormData); // Reset the form fields to their initial values
    } else {
      console.error("Error posting data:", response.statusText);
      window.alert("Error posting data: " + response.statusText);
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
            <form onSubmit={handleSubmit}>
              <div className="rate-form-group">
                <label htmlFor="companyname" className="form-label">
                  Company Name:
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
                <label htmlFor="gstno" className="form-label">
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
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="vendorname" className="form-label">
                  Vendor Name:
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
                <label htmlFor="mobileno" className="form-label">
                  Mobile No:
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
              <div className="form-group">
                <label htmlFor="rate_per_km" className="form-label">
                <span className="required-asterisk">*</span>
                  Vehicle Type:
                </label>
                {/* <input type="text" className="form-control" placeholder="Vehicle" /> */}
                <select className="form-control-cust-add-input" name="vehicle_Type" id="vehicle_Type" onChange={handleChange} value={formData.vehicle_Type}>
                            <option value="">Vehicle</option>
                            <option value="Sedan Car">Sedan Car</option>
                            <option value="Mini Car">Mini Car</option>
                            <option value="SUV Car">SUV Car</option>
                            <option value="Ac Bus 13-Seater">AC Bus 13-Seater</option>
                            <option value="AC Bus 17-seater">AC Bus 17-seater</option>
                            <option value="AC Bus 20-seater">AC Bus 20-seater</option>
                            <option value="AC Bus 32-seater">AC Bus 32-seater</option>
                            <option value="AC Bus 35-seater">AC Bus 35-seater</option>
                            <option value="AC Bus 40-seater">AC Bus 40-seater</option>
                            <option value="AC Bus 45-seater">AC Bus 45-seater</option>
                            <option value="Non-AC Bus 17-Seater">Non-AC Bus 17 Seater</option>
                            <option value="Non-AC Bus 20-Seater">Non-AC Bus 20 Seater</option>
                            <option value="Non-AC Bus 32-Seater">Non-AC Bus 32 Seater</option>
                            <option value="Non-AC Bus 40-Seater">Non-AC Bus 40 Seater</option>
                            <option value="Non-AC Bus 45-Seater">Non-AC Bus 45 Seater</option>
                            <option value="Non-AC Bus 49-Seater">Non-AC Bus 49 Seater</option>
                          </select>
              </div>
              <div className="form-group">
                <label htmlFor="rateperkm" className="form-label">
                  <span className="required-asterisk">*</span>
                  Rate Per KM:
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
              </div>
              <div className="d-flex gap-3">
                <div>
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">
                      <span className="required-asterisk">*</span>
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
                    </select>
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="rate" className="form-label">
                      <span className="required-asterisk">*</span>
                      Rate:
                    </label>
                    <input
                      className="rate-form-control"
                      type="text"
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
                      <span className="required-asterisk">*</span>
                      KM:
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
                    <label htmlFor="extra_km" className="form-label">
                      <span className="required-asterisk">*</span>
                      Extra KM:
                    </label>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="extra_km"
                      name="extra_kmkm"
                      placeholder="extrakm"
                      value={formData.extra_km}
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
                      <span className="required-asterisk">*</span>
                      Hour:
                    </label>
                    <select
                      className="rate-form-control"
                      name="hour"
                      id="hour"
                      value={formData.Hour}
                      onChange={handleChange}
                    >
                      <option value="">Title</option>
                      <option value="One Day / 80km">One Day /80km</option>
                      <option value="One Day / 300km">One Day /300km</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="extra_hour" className="form-label">
                      <span className="required-asterisk">*</span>
                      Extra Hour:
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

export default VendorRate;
