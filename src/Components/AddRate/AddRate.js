

import React, { useState } from "react";
import "./AddRate.css";
import Sidebar from "../Sidebar/Sidebar";

const AddRate = () => {
  

  return (
    <>
      <Sidebar />
      <div className="rate-Add-container">
        <div className="rate-main-container">
          <div className="rate-form-container">
          <h2 style={{fontSize:"2rem",fontWeight:"bold",marginBottom:"8px"}}>Add Rate</h2>
            <form>
              <div className="rate-form-group">
                <label htmlFor="companyname" className="form-label">
                  Company Name:
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="companyname"
                  name="companyname"
                  placeholder="Company Name"
                 
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="gstno" className="form-label">
                  GST No.:
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="gstno"
                  name="gstno"
                  placeholder="GST No."
                
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="customername" className="form-label">
                  Customer Name:
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="customername"
                  name="customername"
                  placeholder="Customer Name"
                
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobileno" className="form-label">
                  Mobile No:
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="mobileno"
                  name="mobileno"
                  placeholder="Mobile No."
               
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rateperkm" className="form-label">
                  Rate Per KM:
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="rateperkm"
                  name="rateperkm"
                  placeholder="Rate Per KM"
                
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Title:
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="title"
              
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rate" className="form-label">
                  Rate:
                </label>
                <input
                  className="form-control-rate-add-input"
                  type="text"
                  id="rate"
                  name="rate"
                  placeholder="rate"
               
                  required
                />
              </div>

              <button
                type="submit"
                className="rate-btn-submit"
                
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

export default AddRate;

