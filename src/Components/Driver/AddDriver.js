import React, { useState } from "react";
import "./AddDriver.css";
import Sidebar from "../Sidebar/Sidebar";

const AddDriver = () => {
  const initialFormData = {
    drivername: "",
    email: "",
    address: "",
    mobileno:'',
    mobileno1:'',
    
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formData.drivername.trim() === "" ||
      formData.email.trim() === "" ||
      formData.address.trim() === ""||
      formData.mobileno.trim() === "" ||
      formData.mobileno.trim() === "" 
    ) {
      alert("All fields are required.");
      return;
    }
    try {
      const requestBody = {
        driver_Name: formData.drivername,
        driver_Email: formData.email,
        address: formData.address,
        driver_Mo1: formData.mobileno,
        driver_Mo2: formData.mobileno,
      };

  
      const response = await fetch("http://localhost:7000/api/add-drivers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert("Data added successfully!");
        setFormData(initialFormData); // Clear the form fields
      } else {
        alert("Failed to add data. Please try again.");
      }
    } catch (error) {
      console.error("API request error:", error);
      alert("Failed to add data. Please try again.");
    }
  };

  return (
    <>
    <Sidebar />
    <div className="driver-Add-container">
    
      <div className="driver-main-container">
        <div className="driver-form-container">
          <h2 style={{fontSize:"2rem",fontWeight:"bold",marginBottom:"8px"}}>Add Driver</h2>
          <div className="driver-form-group">
            <label htmlFor="drivername" className="form-label">
              Driver Name:
            </label>
            <input className="form-control-dri-add-input" type="text" id="drivername" name="drivername" placeholder="Driver Name" onChange={handleChange} value={formData.drivername} />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Id:
            </label>
            <input className="form-control-dri-add-input" type="email" id="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address:
            </label>
            <input className="form-control-dri-add-input" type="text" id="address" name="address" placeholder="Address" onChange={handleChange} value={formData.address} />
          </div>
          <div className="form-group">
            <label htmlFor="mobileno" className="form-label">
              Mobile No:
            </label>
            <input className="form-control-dri-add-input" type="number" id="mobileno" name="mobileno" placeholder="Mobile No." onChange={handleChange} value={formData.mobileno} />
          </div>
          <div className="form-group">
            <label htmlFor="mobileno1" className="form-label">
              Mobile No:
            </label>
            <input className="form-control-dri-add-input" type="number" id="mobileno1" name="mobileno1" placeholder="Alternate Mobile No." onChange={handleChange} value={formData.mobileno1} />
          </div>
          
          <button type="button" className="driver-btn-submit" onClick={handleSubmit} >
            Add
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddDriver;
