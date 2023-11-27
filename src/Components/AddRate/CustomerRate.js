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
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>Corporate Client</h2>
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
              </div>              <div className="form-group">
                <label htmlFor="mobile_Number" className="form-label">
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
                <span className="required-asterisk">*</span>
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
                      {/* Add other options as needed */}
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
