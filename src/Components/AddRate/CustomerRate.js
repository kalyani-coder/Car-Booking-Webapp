import React, { useState, useEffect } from "react";
import "./AddRate.css";
import Sidebar from "../Sidebar/Sidebar";

const initialFormData = {
  company_Name: "",
  GST_No: "",
  customer_Name: "",
  mobile_Number: "",
  rate_per_km: "",
  title: "",
  rate: "",
  vehicle:"",
  hour:"",
  km:"",
  extra_km:"",
  extra_hour:""
  
};

const CustomerRate = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [mobilenoError, setMobilenoError] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("https://carbooking-backend-fo78.onrender.com/api/add-customers");

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Customers:", data);
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

  useEffect(() => {
    if (selectedCustomer) {
      setFormData({
        company_Name: selectedCustomer.company_Name || "",
        GST_No: selectedCustomer.GST_No || "",
        customer_Name: selectedCustomer.customer_Name || "",
        mobile_Number: selectedCustomer.mobile_Number || "",
        rate_per_km: "",
        title: "",
        rate: "",
      });
    }
  }, [selectedCustomer]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile_Number" && value.length > 10) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "mobile_Number" && mobilenoError) {
      setMobilenoError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCustomer) {
      window.alert("Please select a customer");
      return;
    }

    for (const key in formData) {
      if (formData[key] === "") {
        window.alert("All fields are required");
        return;
      }
    }

    const formDataWithCustomer = {
      ...formData,
      company_Name: selectedCustomer.company_Name,
      GST_No: selectedCustomer.GST_No,
      customer_Name: selectedCustomer.customer_Name,
      mobile_Number: selectedCustomer.mobile_Number,
    };

    const response = await fetch("https://carbooking-backend-fo78.onrender.com/api/customer-rate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataWithCustomer),
    });

    if (response.ok) {
      console.log("Data posted successfully!");
      window.alert("Data post Successfully");
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
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>Corporate Customer</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="rate_per_km" className="form-label">
                  Customer Type:
                <span className="required-asterisk">*</span>
                </label>
                {/* <input type="text" className="form-control" placeholder="Vehicle" /> */}
                <select className="form-control-cust-add-input" name="vehicle_Type" id="vehicle_Type" onChange={handleChange} value={formData.vehicle_Type}>
                            <option value="">Customer</option>
                            <option value="">Corporate Customer</option>
                            <option value="Sedan Car">Indivisual Customer</option>
                           
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
                      (customer) => customer.customer_Name === e.target.value
                    );
                    setSelectedCustomer(selectedCustomer);
                  }}
                  value={selectedCustomer ? selectedCustomer.customer_Name : ''}
                >
                  <option value="">Select Customer</option>
                  {customerList.map((customer) => (
                    <option key={customer._id} value={customer.customer_Name}>
                      {customer.customer_Name}
                    </option>
                  ))}
                </select>
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
                {mobilenoError && <p className="error-message">{mobilenoError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="rate_per_km" className="form-label">
                  Vehicle Type:
                <span className="required-asterisk">*</span>
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
                      Title:
                    <span className="required-asterisk">*</span>
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
}

export default CustomerRate;
