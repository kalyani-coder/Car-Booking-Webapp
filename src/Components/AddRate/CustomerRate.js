import React, { useState, useEffect } from "react";

// Importing styles and Sidebar component
import "./AddRate.css";
import Sidebar from "../Sidebar/Sidebar";

// Initial form data
const initialFormData = {
  customer_type: "",
  company_Name: "",
  GST_No: "",
  customer_Name: "",
  mobile_Number: "",
  rate_per_km: "",
  duty_type: "",
  rate: "",
  vehicle_Type: "",
  hour: "",
  km: "",
  extra_km: "",
  extra_hour: "",
};

// Functional component for CustomerRate
const CustomerRate = () => {
  // State variables
  const [formData, setFormData] = useState(initialFormData);
  const [mobilenoError, setMobilenoError] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Fetching customer data from the API on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "https://carbooking-backend-fo78.onrender.com/api/add-customers"
        );

        if (response.ok) {
          const data = await response.json();
          setCustomerList(data);
        } else {
          console.error("Failed to fetch customers");
        }
      } catch (error) {
        console.error("API request error:", error);
      }
    };

    fetchCustomers();
  }, []);

  // Setting form data when a customer is selected
  useEffect(() => {
    if (selectedCustomer) {
      setFormData({
        company_Name: selectedCustomer.company_name || "",
        GST_No: selectedCustomer.gst_no || "",
        customer_Name: selectedCustomer.Cus_name || "",
        mobile_Number: selectedCustomer.Cus_Mobile || "",
        vehicle_Type: selectedCustomer.type_of_vehicle || "",
      });
    }
  }, [selectedCustomer]);

  // Handling form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validating mobile number length
    if (name === "mobile_Number" && value.length > 10) {
      return;
    }

    // Updating form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clearing mobile number error when changed
    if (name === "mobile_Number" && mobilenoError) {
      setMobilenoError("");
    }
  };

  // Validating the form
  const validateForm = () => {
    const errors = {};

    // Checking for empty fields
    for (const key in formData) {
      if (!formData[key] || formData[key].trim() === "") {
        errors[key] = "This field is required";
      }
    }

    // Setting form errors
    setFormErrors(errors);

    // Returning true if no errors, false otherwise
    return Object.keys(errors).length === 0;
  };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Alert if no customer is selected
    if (!selectedCustomer) {
      window.alert("Please select a customer");
      return;
    }

    // Alert if form validation fails
    if (!validateForm()) {
      window.alert("Please fill in all required fields");
      return;
    }

    // Adding customer data to form data
    const formDataWithCustomer = {
      ...formData,
      company_Name: selectedCustomer.company_Name,
      GST_No: selectedCustomer.GST_No,
      customer_Name: selectedCustomer.customer_Name,
      mobile_Number: selectedCustomer.mobile_Number,
    };

    // Setting API endpoint based on vehicle type
    let apiEndpoint = "";
    if (formData.vehicle_Type === "Corporate Customer") {
      apiEndpoint = "http://localhost:7000/api/corporate-customer";
    } else if (formData.vehicle_Type === "Individual Customer") {
      apiEndpoint =
        "https://carbooking-backend-fo78.onrender.com/api/individual-customer-rate";
    } else {
      window.alert("Invalid customer type");
      return;
    }

    // Sending POST request to the API
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataWithCustomer),
    });

    // Handling successful or failed API response
    if (response.ok) {
      setSuccessMessage("Data added successfully!");
      setFormData(initialFormData);
      setSelectedCustomer(null);
    } else {
      console.error("Error posting data:", response.statusText);
    }
  };

  // Rendering the component

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
                  <option value="Indivisual Customer">
                    Indivisual Customer
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="customer_Name" className="form-label">
                  Customer Name:
                  <span className="required-asterisk">*</span>
                </label>
                <select
                  className="form-control-rate-add-input"
                  name="customer_Name"
                  id="customer_Name"
                  onChange={(e) => {
                    const selectedCustomer = customerList.find(
                      (customer) => customer.Cus_name === e.target.value
                    );
                    setSelectedCustomer(selectedCustomer);
                  }}
                  value={selectedCustomer ? selectedCustomer.Cus_name : ""}
                >
                  <option value="">Select Customer</option>
                  {customerList.map((customer) => (
                    <option key={customer._id} value={customer.Cus_name}>
                      {customer.Cus_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="rate-form-group">
                <label htmlFor="company_Name" className="form-label">
                  Company Name:
                  <span className="required-asterisk">*</span>
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
                />
              </div>
             
              <div className="form-group">
                <label htmlFor="mobile_Number" className="form-label">
                  Mobile No:
                  <span className="required-asterisk">*</span>
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
                {mobilenoError && (
                  <p className="error-message">{mobilenoError}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="rate_per_km" className="form-label">
                  Type Of Vehicle:
                  <span className="required-asterisk">*</span>
                </label>
                {/* <input type="text" className="form-control" placeholder="Vehicle" /> */}
                <select
                  className="form-control-cust-add-input"
                  name="vehicle_Type"
                  id="vehicle_Type"
                  onChange={handleChange}
                  value={formData.vehicle_Type}
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
                      {/* Add other options as needed */}
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
                      type="km"
                      id="km"
                      name="km"
                      placeholder="km"
                      value={formData.KM}
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
                    <label htmlFor="hour" className="form-label">
                      Hour:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="hour"
                      id="hour"
                      name="hour"
                      placeholder="hour"
                      value={formData.Hour}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="extra_hour" className="form-label">
                      Extra Hour:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="rate-form-control"
                      type="extra_hour"
                      id="extra_hour"
                      name="extra_hour"
                      placeholder="Extra Hour"
                      value={formData.extra_hour}
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
