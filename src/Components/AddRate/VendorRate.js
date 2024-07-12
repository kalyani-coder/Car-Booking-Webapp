import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddRate.css";
import Sidebar from "../Sidebar/Sidebar";
import Alert from "../AddCustomer/Alert";

const VendorRate = () => {
  const initialFormData = {
    vender_id: "",
    company_Name: "",
    GST_No: "",
    vender_Name: "",
    mobile_Number: "",
    vehicle: "",
    title: "",
    rate: "",
    hour: "",
    km: "",
    extra_km: "",
    extra_hour: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [mobilenoError, setMobilenoError] = useState("");
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);
  const [vendorList, setVendorList] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8787/api/add-venders"
        );
        setVendorList(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  const handleVendorChange = (e) => {
    const vendorId = e.target.value;
    const selectedVendor = vendorList.find((vendor) => vendor._id === vendorId);
    setSelectedVendor(selectedVendor);
    if (selectedVendor) {
      setFormData({
        vender_id: selectedVendor._id,
        company_Name: selectedVendor.company_Name,
        GST_No: selectedVendor.GST_No,
        vender_Name: selectedVendor.vender_Name,
        mobile_Number: selectedVendor.vender_Mobile,
        address: selectedVendor.address,
        vehicle: "",
        title: "",
        rate: "",
        // rate_per_Km: "",
        hour: "",
        km: "",
        extra_km: "",
        extra_hour: "",
      });
    } else {
      setFormData(initialFormData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile_Number" && value.length > 10) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "mobile_Number") {
      if (!/^\d{10}$/.test(value)) {
        setMobilenoError("Mobile number must be 10 digits");
      } else {
        setMobilenoError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    for (const key in formData) {
      if (formData[key] === "") {
        window.alert("All fields are required");
        return;
      }
    }

    if (mobilenoError) {
      window.alert(mobilenoError);
      return;
    }

    try {
      const response = await fetch("http://localhost:8787/api/vender-rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Vender added successfully!", "success");
        setFormData(initialFormData);
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
      <div className="rate-Add-container">
        <div className="rate-main-container relative mt-2">
          <div className="rate-form-container-vender-rate-cc">
            <h2 className="View-Corporate-Customer-Rate font-bold">
              Vendor Rate
            </h2>

            {successAlert && <Alert alert={successAlert} />}
            {errorAlert && <Alert alert={errorAlert} />}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="vender_Name" className="form-label">
                  Vendor Name:
                  <span className="required-asterisk">*</span>
                </label>
                <select
                  className="form-control-add-trip-input-vender-rate-page"
                  id="vender_Name"
                  name="vender_Name"
                  onChange={handleVendorChange}
                  value={selectedVendor ? selectedVendor._id : ""}
                >
                  <option value="">Select Vendor</option>
                  {vendorList.length > 0 ? (
                    vendorList.map((vendor) => (
                      <option key={vendor._id} value={vendor._id}>
                        {vendor.vender_Name}
                      </option>
                    ))
                  ) : (
                    <option value="">No Vendors Available</option>
                  )}
                </select>
              </div>

              <div className="rate-form-group">
                <label htmlFor="company_Name" className="form-label">
                  Company Name:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-add-trip-input-vender-rate-page"
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
                  className="form-control-add-trip-input-vender-rate-page"
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
                <label htmlFor="mobile_Number" className="form-label">
                  Mobile No:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-add-trip-input-vender-rate-page"
                  type="text"
                  id="mobile_Number"
                  name="mobile_Number"
                  placeholder="Mobile No."
                  value={formData.mobile_Number}
                  onChange={handleChange}
                  required
                />
                {mobilenoError && <p className="error-text">{mobilenoError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Address:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-add-trip-input-vender-rate-page"
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="trip-form-group">
                <label htmlFor="vehicle" className="trip-form-label">
                  Type Of Vehicle:
                </label>
                <select
                  className="form-control-add-trip-input-vender-rate-page"
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
                  <option value="Non-AC Bus 17-Seater">
                    Non-AC Bus 17-Seater
                  </option>
                  <option value="Non-AC Bus 20-Seater">
                    Non-AC Bus 20-Seater
                  </option>
                  <option value="Non-AC Bus 32-Seater">
                    Non-AC Bus 32-Seater
                  </option>
                  <option value="Non-AC Bus 40-Seater">
                    Non-AC Bus 40-Seater
                  </option>
                  <option value="Non-AC Bus 45-Seater">
                    Non-AC Bus 45-Seater
                  </option>
                  <option value="Non-AC Bus 49-Seater">
                    Non-AC Bus 49-Seater
                  </option>
                </select>
              </div>

              <div className="d-flex gap-3 responsive-flex-column-required">
                <div className="w-[50%] res-width-100-percent">
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
                      <option value="One Day / 80km">
                        One Day /80km-Local Duty
                      </option>
                      <option value="One Day / 300km">
                        One Day /300km-Outstation Duty
                      </option>
                      <option value="440km- Local Airport Transfer">
                        440km-Local Airport Transfer{" "}
                      </option>
                      <option value="Pune-Mumbai Pickup Drop">
                        Pune-Mumbai Pickup Dropoff
                      </option>
                    </select>
                  </div>
                </div>
                <div className="w-[50%] res-width-100-percent">
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
              <div className="d-flex gap-3 responsive-flex-column-required">
                <div className="w-[50%] res-width-100-percent">
                  <div className="form-group">
                    <label htmlFor="from" className="form-label">
                      From:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="text"
                      id="from"
                      name="from"
                      placeholder="from"
                      value={formData.from}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="w-[50%] res-width-100-percent">
                  <div className="form-group">
                    <label htmlFor="rate" className="form-label">
                      To:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="text"
                      id="to"
                      name="to"
                      placeholder="to"
                      value={formData.to}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex gap-3 responsive-flex-column-required">
                <div className="w-[50%] res-width-100-percent">
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
                <div className="w-[50%] res-width-100-percent">
                  <div className="form-group">
                    <label htmlFor="extra_km" className="form-label">
                      Rate Per KM(Extra KM):
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="extra_km"
                      name="extra_km"
                      placeholder="Extra KM"
                      value={formData.extra_km}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex gap-3 responsive-flex-column-required">
                <div className="w-[50%] res-width-100-percent">
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
                <div className="w-[50%] res-width-100-percent">
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
            </form>
            <div className="flex m-auto justify-center">
              <button type="submit" className="rate-btn-submit">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorRate;
