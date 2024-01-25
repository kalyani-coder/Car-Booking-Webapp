import React, { useState, useEffect } from "react";
import "./AddRate.css";
import Sidebar from "../Sidebar/Sidebar";

const initialFormData = {
  Cus_Type: "",
  Cus_name: "",
  company_name: "",
  gst_no: "",
  Cus_Mobile: "",
  type_of_vehicle: "",
  rate_per_km: "",
  duty_type: "",
  rate: "",
  km: "",
  extra_km: "",
  hours: "",
  extra_hours: "",
};

const CustomerRate = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [mobilenoError, setMobilenoError] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [customerListByType, setCustomerListByType] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Fetch data from the appropriate endpoint based on customer type
        const endpoint =
          formData.Cus_Type === "Corporate Customer"
            ? "http://localhost:7000/api/corporate-customer"
            : formData.Cus_Type === "Indivisual Customer"
            ? "http://localhost:7000/api/indivisual-customer"
            : "";

        if (endpoint) {
          const response = await fetch(endpoint);

          if (response.ok) {
            const data = await response.json();
            setCustomerList(data);
          } else {
            console.error("Failed to fetch customers");
          }
        }
      } catch (error) {
        console.error("API request error:", error);
      }
    };

    fetchCustomers();
  }, [formData.Cus_Type]);

  useEffect(() => {
    // Set the customer list based on the selected customer type
    if (formData.Cus_Type === "Corporate Customer") {
      setCustomerListByType(
        customerList.filter(
          (customer) => customer.Cus_Type === "Corporate Customer"
        )
      );
    } else if (formData.Cus_Type === "Indivisual Customer") {
      setCustomerListByType(
        customerList.filter(
          (customer) => customer.Cus_Type === "Indivisual Customer"
        )
      );
    }
  }, [formData.Cus_Type, customerList]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Cus_Mobile" && value.length > 10) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "Cus_Mobile") {
      if (!/^\d{10}$/.test(value)) {
        setMobilenoError("Mobile number must be 10 digits");
      } else {
        setMobilenoError("");
      }
    }
  };

  const validateForm = () => {
    const errors = {};

    for (const key in formData) {
      if (!formData[key] || formData[key].trim() === "") {
        errors[key] = "This field is required";
      }
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCustomer) {
      window.alert("Please select a customer");
      return;
    }

    if (!validateForm()) {
      window.alert("Please fill in all required fields");
      return;
    }

    const formDataWithCustomer = {
      ...formData,
      company_name: selectedCustomer.company_name,
      gst_no: selectedCustomer.gst_no,
      Cus_Mobile: selectedCustomer.Cus_Mobile,
      type_of_vehicle: selectedCustomer.type_of_vehicle,
      rate_per_km: selectedCustomer.rate_per_km,
      duty_type: selectedCustomer.duty_type,
      rate: selectedCustomer.rate,
      km: selectedCustomer.km,
      extra_km: selectedCustomer.extra_km,
      hours: selectedCustomer.hours,
      extra_hours: selectedCustomer.extra_hours,
    };

    let apiEndpoint = "";
    if (formData.Cus_Type === "Corporate Customer") {
      apiEndpoint = "http://localhost:7000/api/corporate-customer";
    } else if (formData.Cus_Type === "Indivisual Customer") {
      apiEndpoint = "http://localhost:7000/api/indivisual-customer";
    } else {
      window.alert("Invalid customer type");
      return;
    }

    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataWithCustomer),
    });

    if (response.ok) {
      setSuccessMessage("Data added successfully!");
      setFormData(initialFormData);
      setSelectedCustomer(null);
      window.alert("Data added successfully!");
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
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Corporate Customer
            </h2>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Customer Type dropdown */}
              <div className="form-group">
                <label htmlFor="Cus_Type" className="form-label">
                  Customer Type:
                  <span className="required-asterisk">*</span>
                </label>
                <select
                  className="form-control-cust-add-input"
                  name="Cus_Type"
                  id="Cus_Type"
                  onChange={handleChange}
                  value={formData.Cus_Type}
                >
                  <option value="">Customer</option>
                  <option value="Corporate Customer">Corporate Customer</option>
                  <option value="Individual Customer">Individual Customer</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="Cus_name" className="form-label">
                  Customer Name:
                  <span className="required-asterisk">*</span>
                </label>
                <select
                  className="form-control-rate-add-input"
                  name="Cus_name"
                  id="Cus_name"
                  onChange={(e) => {
                    const selectedCustomerId = e.target.value;
                    setSelectedCustomer(
                      customerList.find((customer) => customer._id === selectedCustomerId)
                    );
                  }}
                  value={selectedCustomer ? selectedCustomer._id : ""}
                >
                  <option value="">Select Customer</option>
                  {customerListByType.map((customer) => (
                    <option key={customer._id} value={customer._id}>
                      {customer.Cus_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="rate-form-group">
                <label htmlFor="company_name" className="form-label">
                  Company Name:
                  <span className="required-asterisk">*</span>
                </label>
                <div className="form-group">
                  <input
                    className="form-control-rate-add-input"
                    type="text"
                    id="company_name"
                    name="company_name"
                    placeholder="Company Name"
                    value={formData.company_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="gst_no" className="form-label">
                  GST No:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="gst_no"
                  name="gst_no"
                  placeholder="GST No."
                  value={formData.gst_no}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Cus_Mobile" className="form-label">
                  Mobile No:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-cust-add-input"
                  type="tel"
                  id="Cus_Mobile"
                  name="Cus_Mobile"
                  placeholder="Mobile No."
                  onChange={handleChange}
                  value={formData.Cus_Mobile}
                />
                {mobilenoError && (
                  <p className="error-message">{mobilenoError}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="type_of_vehicle" className="form-label">
                  Type Of Vehicle:
                  <span className="required-asterisk">*</span>
                </label>
                <select
                  className="form-control-cust-add-input"
                  name="type_of_vehicle"
                  id="type_of_vehicle"
                  onChange={handleChange}
                  value={formData.type_of_vehicle}
                >
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
                  <option value="Non-AC Bus 17-Seater">
                    Non-AC Bus 17 Seater
                  </option>
                  <option value="Non-AC Bus 20-Seater">
                    Non-AC Bus 20 Seater
                  </option>
                  <option value="Non-AC Bus 32-Seater">
                    Non-AC Bus 32 Seater
                  </option>
                  <option value="Non-AC Bus 40-Seater">
                    Non-AC Bus 40 Seater
                  </option>
                  <option value="Non-AC Bus 45-Seater">
                    Non-AC Bus 45 Seater
                  </option>
                  <option value="Non-AC Bus 49-Seater">
                    Non-AC Bus 49 Seater
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="rate_per_km" className="form-label">
                  Rate Per KM:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-cust-add-input"
                  type="tel"
                  id="rate_per_km"
                  name="rate_per_km"
                  placeholder="Rate per KM"
                  onChange={handleChange}
                  value={formData.rate_per_km}
                />
                {mobilenoError && (
                  <p className="error-message">{mobilenoError}</p>
                )}
              </div>

              <div className="d-flex gap-3">
                <div>
                  <div className="form-group">
                    <label htmlFor="duty_type" className="form-label">
                      Duty Type:
                      <span className="required-asterisk">*</span>
                    </label>
                    <select
                      className="rate-form-control"
                      name="duty_type"
                      id="duty_type"
                      value={formData.duty_type}
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
                        440km-Local Airport Transfer
                        </option>
                      <option value="Pune-Mumbai Pickup Drop">
                        Pune-Mumbai Pickup Dropoff
                        </option>
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

              {/* <div className="form-group">
                <label htmlFor="rateperhour" className="form-label">
                  Rate Per Hour (Extra Hour):
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="rate_per_hour"
                  name="rate_per_hour"
                  placeholder="Rate Per Hour"
                  value={formData.rate_per_hour}
                  onChange={handleChange}
                  required
                />
              </div> */}

              <div className="d-flex gap-3">
                <div>
                  <div className="form-group">
                    <label htmlFor="km" className="form-label">
                      KM:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="km"
                      id="km"
                      name="km"
                      placeholder="km"
                      value={formData.km}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="extra_km" className="form-label">
                      Extra KM:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="extra_km"
                      id="extra_km"
                      name="extra_km"
                      placeholder="Extra km"
                      value={formData.extra_km}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex gap-3">
                <div>
                  <div className="form-group">
                    <label htmlFor="hours" className="form-label">
                      Hour:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="hours"
                      id="hours"
                      name="hours"
                      placeholder="hours"
                      value={formData.hours}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="extra_hours" className="form-label">
                      Extra Hour:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="extra_hours"
                      id="extra_hours"
                      name="extra_hours"
                      placeholder="Extra Hour"
                      value={formData.extra_hours}
                      onChange={handleChange}
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

export default CustomerRate;
