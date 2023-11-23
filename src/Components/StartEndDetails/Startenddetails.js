// StartEndDetails.js

import React, { useState } from 'react';
import "./StartEndDeteails.css"
import Sidebar from '../Sidebar/Sidebar';

const StartEndDetails = () => {
  const initialFormData = {
    pickuplocation: '',
    date: '',
    time: '',
    dropoffLocation: '',
    date1: '',
    time1: '',
    totalDays: '',
    totalHours: '',
    triptype: '',
    tripsubtype: '',
    customername: '',
    mobileno: '',
    drivername: '',
    mobileNumber: '',
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
      formData.pickuplocation.trim() === "" ||
      formData.date.trim() === "" ||
      formData.time.trim() === "" ||
      formData.dropoffLocation.trim() === "" ||
      formData.date1.trim() === "" ||
      formData.time1.trim() === "" ||
      formData.totalDays.trim() === "" ||
      formData.totalHours.trim() === "" ||
      formData.triptype.trim() === "" ||
      formData.tripsubtype.trim() === "" ||
      formData.customername.trim() === "" ||
      formData.mobileno.trim() === "" ||
      formData.drivername.trim() === "" ||
      formData.mobileNumber.trim() === ""
    ) {
      alert("All fields are required.");
      return;
    }
    try {
      const requestBody = {
        // driver_Name: formData.drivername,
        // driver_Email: formData.email,
        // address: formData.address,
        // driver_Mo1: formData.mobileno,
        // driver_Mo2: formData.mobileno,

        pickuplocation: formData.pickuplocation,
        date: formData.date,
        time: formData.time,
        dropoffLocation: formData.dropoffLocation,
        date1: formData.date1,
        time1: formData.time1,
        totalDays: formData.totalDays,
        totalHours: formData.totalHours,
        triptype: formData.triptype,
        tripsubtype: formData.tripsubtype,
        customername: formData.customername,
        mobileno: formData.mobileno,
        drivername: formData.drivername,
        mobileNumber: formData.mobileNumber
      };


      const response = await fetch("https://carbooking-backend-fo78.onrender.com/api/getDetails-fromDriver", {
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
      <div className="start-end-details-container">
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>Get Start And End Details</h2>
        <div className="start-end-details-form">
          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="pickuplocation" className="start-end-details-label">
                  Pickup Location:
                </label>
                <input
                  className="start-end-details-input"
                  type="text"
                  name="pickuplocation" placeholder="Enter Pickup Location"
                  value={formData.pickuplocation}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="date" className="start-end-details-label">
                  Date:
                </label>
                <input
                  className="start-end-details-input"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="time" className="start-end-details-label">
                  Time:
                </label>
                <input
                  className="start-end-details-input"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="dropoffLocation" className="start-end-details-label">
                  Dropoff Location:
                </label>
                <input
                  className="start-end-details-input"
                  type="text"
                  name="dropoffLocation" placeholder='Enter Drop-off Location'
                  value={formData.dropoffLocation}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="date1" className="start-end-details-label">
                  Date:
                </label>
                <input
                  className="start-end-details-input"
                  type="date"
                  name="date1"
                  value={formData.date1}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="time1" className="start-end-details-label">
                  Time:
                </label>
                <input
                  className="start-end-details-input"
                  type="time"
                  name="time1"
                  value={formData.time1}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="totalDays" className="start-end-details-label">
                  Total Days:
                </label>
                <input
                  className="start-end-details-input"
                  type="number"
                  name="totalDays" placeholder='Enter Total Days'
                  value={formData.totalDays}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="totalHours" className="start-end-details-label">
                  Total Hours:
                </label>
                <input
                  className="start-end-details-input"
                  type="number"
                  name="totalHours" placeholder='Enter Total Hours'
                  value={formData.totalHours}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>


          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="triptype" className="start-end-details-label">
                  Trip Type:
                </label>
                <select
                  className="start-end-details-input"
                  name="triptype"
                  onChange={handleChange}
                  value={formData.triptype}
                >
                  <option value="">Trip Type</option>
                  <option value="One Way Trip">One Way Trip</option>
                  <option value="Return Trip">Return Trip</option>
                </select>
              </div>
            </div>

            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="tripsubtype" className="start-end-details-label">
                  Sub Type:
                </label>
                <select
                  className="start-end-details-input"
                  name="tripsubtype"
                  onChange={handleChange}
                  value={formData.tripsubtype}
                >
                  <option value="">Sub Type</option>
                  <option value="Local Trip">Local Trip</option>
                  <option value="Outstation Trip">Outstation Trip</option>
                  <option value="Outstation Local Trip">Outstation Local Trip</option>
                  <option value="Outstation Outstation Trip">Outstation Outstation Trip</option>
                </select>
              </div>
            </div>
          </div>

          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="customerid" className="start-end-details-label">
                  Customer Name:
                </label>
                <input
                  className="start-end-details-input"
                  type="text"
                  name="customername" placeholder='Enter Customer Name'
                  onChange={handleChange}
                  value={formData.customername}
                />
              </div>
            </div>

            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="mobileno" className="start-end-details-label">
                  Mobile No:
                </label>
                <input
                  className="start-end-details-input"
                  type="text"
                  name="mobileno" placeholder='Enter Customer Mobile Number'
                  onChange={handleChange}
                  value={formData.mobileno}
                />
              </div>
            </div>
          </div>

          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="drivername" className="start-end-details-label">
                  Driver Name:
                </label>
                <input
                  className="start-end-details-input"
                  type="text"
                  name="drivername" placeholder='Enter Driver Name'
                  onChange={handleChange}
                  value={formData.drivername}
                />
              </div>
            </div>

            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="mobileNumber" className="start-end-details-label">
                  Mobile No:
                </label>
                <input
                  className="start-end-details-input"
                  type="text"
                  name="mobileNumber" placeholder='Enter Driver Mobile Number'
                  onChange={handleChange}
                  value={formData.mobileNumber}
                />
              </div>
            </div>
          </div>

          <div className="start-end-details-button-row">
            <button type="button" className="start-end-details-button">
              Print
            </button>
            <button type="button" className="start-end-details-button mx-2" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartEndDetails;
