

import React, { useState } from "react";
import "./AddRate.css";
import Sidebar from "../Sidebar/Sidebar";



const CustomerRate = () => {
  const initialFormData = {
    compamy_Name:"",
    GST_No:"",
    customer_Name:"",
    mobile_Number:"",
    rate_per_km:"",
    title:"",
    rate:""
    
  };
  const [formData, setFormData] = useState(initialFormData);
  
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  
  
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if all fields in initialFormData are filled
    if (Object.values(formData).some((value) => value === '')) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const data = { ...formData };
  
    try {
      // Send the data to the API
      const response = await fetch('http://localhost:7000/api/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert('Data added successfully!');
        setFormData(initialFormData); // Reset the form
      } else {
        alert('Failed to add data. Please try again.');
      }
    } catch (error) {
      console.error('API request error:', error);
      alert('Failed to add data. Please try again.');
    }
  };
  

  return (
    <>
      <Sidebar />
      <div className="rate-Add-container">
        <div className="rate-main-container">
          <div className="rate-form-container">
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>Customer Rate</h2>
            <form>
              <div className="rate-form-group">
                <label htmlFor="compamy_Name" className="form-label">
                  Company Name:
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="compamy_Name"
                  name="compamy_Name"
                  placeholder="Company Name"
                  onChange={handleChange}
                  value={formData.compamy_Name}
                />
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
                  onChange={handleChange}
                  value={formData.GST_No}
              
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
                  onChange={handleChange}
                  value={formData.customer_Name}
          
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile_Number" className="form-label">
                  Mobile No:
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="mobile_Number"
                  name="mobile_Number"
                  placeholder="Mobile No."
                  onChange={handleChange}
                  value={formData.mobile_Number}
              
                />
              </div>
              <div className="form-group">
                <label htmlFor="rate_per_km" className="form-label">
                  Rate Per KM:
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="rate_per_km"
                  name="rate_per_km"
                  placeholder="Rate Per KM"
                  onChange={handleChange}
                  value={formData.rate_per_km}
                
                />
              </div>
              <div className="d-flex gap-2">
                <div>
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">
                      Title:
                    </label>
                    <select class="rate-form-control" 
                    name="title" 
                    id="title"
                    onChange={handleChange}
                    value={formData.title}
                    ><option value="">
                      Title</option>
                      <option value="One Day / 80km">One Day /80km</option>
                      <option value="One Day / 300km">One Day /300km</option></select>
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="rate" className="form-label">
                      Rate:
                    </label>
                    <input
                      className="rate-form-control"
                      type="text"
                      id="rate"
                      name="rate"
                      placeholder="rate"
                      onChange={handleChange}
                      value={formData.rate}
                    
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="rate-btn-submit" onClick={handleSubmit}
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

