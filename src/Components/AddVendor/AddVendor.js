import React, { useState } from "react";
import "./AddVendor.css";
import Sidebar from "../Sidebar/Sidebar";

const AddVendor = () => {
  const initialFormData = {
    vendorname: "",
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
    <>
    <Sidebar />
    <div className="vendor-Add-container">
    
      <div className="vendor-main-container">
        <div className="vendor-form-container">
          <div className="vendor-form-group">
            <label htmlFor="vendorname" className="form-label">
              Vendor Name:
            </label>
            <input className="form-control-ven-add-input" type="text" id="vendorname" name="vendorname" placeholder="Vendor Name" onChange={handleChange} value={formData.vendorname} />
          </div>
          <div className="form-group">
            <label htmlFor="companyname" className="form-label">
              Company Name:
            </label>
            <input className="form-control-ven-add-input" type="text" id="companyname" name="companyname" placeholder="Company Name" onChange={handleChange} value={formData.companyname} />
          </div>
          <div className="form-group">
            <label htmlFor="gstno" className="form-label">
              GST No:
            </label>
            <input className="form-control-ven-add-input" type="text" id="gstno" name="gstno" placeholder="GST No." onChange={handleChange} value={formData.gstno} />
          </div>
          <div className="form-group">
            <label htmlFor="mobileno" className="form-label">
              Mobile No:
            </label>
            <input className="form-control-ven-add-input" type="text" id="mobileno" name="mobileno" placeholder="Mobile No." onChange={handleChange} value={formData.mobileno} />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Id:
            </label>
            <input className="form-control-ven-add-input" type="text" id="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address:
            </label>
            <input className="form-control-ven-add-input" type="text" id="address" name="address" placeholder="Address" onChange={handleChange} value={formData.address} />
          </div>
          
          <button type="button" className="vendor-btn-submit" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddVendor;
