import React, { useState } from "react";
import "./AddCustomer.css";
import Sidebar from "../Sidebar/Sidebar";

const AddCustomer = () => {
  const initialFormData = {
    customername: "",
    companyname:"",
    gstno:"",
    mobileno: "",
    email: "",
    address: "",
    
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <>~
    <Sidebar />
    <div className="customer-Add-container">
    
      <div className="customer-main-container">
        <div className="customer-form-container">
          <h2 style={{fontSize:"2rem",fontWeight:"bold",marginBottom:"8px"}}>Add Customer</h2>
          <div className="customer-form-group">
            <label htmlFor="customername" className="form-label">
              Customer Name:
            </label>
            <input className="form-control-cust-add-input" type="text" id="customername" name="customername" placeholder="Customer Name" onChange={handleChange} value={formData.customername} />
          </div>
          <div className="form-group">
            <label htmlFor="companyname" className="form-label">
              Company Name:
            </label>
            <input className="form-control-cust-add-input" type="text" id="companyname" name="companyname" placeholder="Company Name" onChange={handleChange} value={formData.companyname} />
          </div>
          <div className="form-group">
            <label htmlFor="gstno" className="form-label">
              GST No:
            </label>
            <input className="form-control-cust-add-input" type="text" id="gstno" name="gstno" placeholder="GST No." onChange={handleChange} value={formData.gstno} />
          </div>
          <div className="form-group">
            <label htmlFor="mobileno" className="form-label">
              Mobile No:
            </label>
            <input className="form-control-cust-add-input" type="text" id="mobileno" name="mobileno" placeholder="Mobile No." onChange={handleChange} value={formData.mobileno} />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Id:
            </label>
            <input className="form-control-cust-add-input" type="text" id="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address:
            </label>
            <input className="form-control-cust-add-input" type="text" id="address" name="address" placeholder="Address" onChange={handleChange} value={formData.address} />
          </div>
          
          <button type="button" className="customer-btn-submit" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddCustomer;
