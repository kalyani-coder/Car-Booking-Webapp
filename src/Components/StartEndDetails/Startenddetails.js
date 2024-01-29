// StartEndDetails.js

import React, { useState } from "react";
import "./StartEndDeteails.css";
import Sidebar from "../Sidebar/Sidebar";

const StartEndDetails = () => {
  const initialFormData = {
    pickuplocation: "",
    date: "",
    time: "",
    dropoffLocation: "",
    date1: "",
    time1: "",
    totalDays: "",
    totalHours: "",
    triptype: "",
    tripsubtype: "",
    customername: "",
    mobileno: "",
    drivername: "",
    mobileNumber: "",
    toll: "",
    allowance: "",
    nightstay: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);

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
        mobileNumber: formData.mobileNumber,
        allowance: formData.allowance,
        toll: formData.toll,
        nightstay: formData.nightstay,
      };

      const response = await fetch(
        "http://localhost:7000/api/getDetails-fromDriver",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

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
        <h2
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}
        >
          Get Start And End Details
        </h2>
        <div className="start-end-details-form">
          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label
                  htmlFor="pickuplocation"
                  className="start-end-details-label"
                >
                  Customer Name:
                  <span className="required-asterisk">*</span>
                </label>
                {/* Dropdown to select a customer */}
                <select
                  className="trip-details-input"
                  id="customerId"
                  name="customerId"
                  onChange={(e) => {
                    const selectedCustomer = customers.find(
                      (customer) => customer.customername === e.target.value
                    );
                    setSelectedCustomer(selectedCustomer);
                  }}
                  value={selectedCustomer ? selectedCustomer.customername : ""}
                >
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.cus_Id} value={customer.customername}>
                      {customer.customername}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="mobileno" className="start-end-details-label">
                  Mobile No:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="start-end-details-input"
                  type="text"
                  name="mobileno"
                  placeholder="Enter Customer Mobile Number"
                  onChange={handleChange}
                  value={formData.mobileno}
                />
              </div>
            </div>
          </div>
          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="d-flex gap-3">
                <div>
                  <div className="form-group">
                    <label htmlFor="pickup" className="form-label">
                      Pickup Location:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control cust-inq-input"
                      name="pickup"
                      placeholder="Pickup Location"
                      onChange={handleChange}
                      value={formData.pickup}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="date1" className="form-label">
                      Pickup Date :<span className="required-asterisk">*</span>
                    </label>

                    <input
                      type="date"
                      className="form-control add-trip-input"
                      name="date"
                      onChange={handleChange}
                      value={formData.date}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="time1" className="form-label">
                      Pickup Time :<span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="time"
                      className="form-control cust-inq-input"
                      name="time"
                      onChange={handleChange}
                      value={formData.time}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="start-end-details-column">
              <div className="d-flex gap-2">
                <div>
                  <div className="form-group">
                    <label htmlFor="totalDays" className="form-label">
                      Total Days:
                    </label>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="totalDays"
                      name="totalDays"
                      placeholder="Total Days"
                      value={formData.totalDays}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="totalHours" className="form-label">
                      Total Hours:
                    </label>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="totalHours"
                      name="totalHours"
                      placeholder="Total Hours"
                      value={formData.totalHours}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="d-flex gap-3">
                <div>
                  <div className="form-group">
                    <label htmlFor="pickup" className="form-label">
                    Dropoff Location:
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control cust-inq-input"
                      name="pickup"
                      placeholder="Pickup Location"
                      onChange={handleChange}
                      value={formData.pickup}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="date1" className="form-label">
                    Dropoff Date :<span className="required-asterisk">*</span>
                    </label>

                    <input
                      type="date"
                      className="form-control add-trip-input"
                      name="date"
                      onChange={handleChange}
                      value={formData.date}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="time1" className="form-label">
                      Dropoff Time :<span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="time"
                      className="form-control cust-inq-input"
                      name="time"
                      onChange={handleChange}
                      value={formData.time}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="start-end-details-column">
            <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Type Of Vehicle:
                  <span className="required-asterisk">*</span>
                </label>
                {/* <input type="text" className="form-control" placeholder="Vehicle" /> */}
                <select className="start-end-details-input" name="vehicle_Type" id="vehicle_Type" onChange={handleChange} value={formData.vehicle_Type}>
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
            </div>
          </div>

          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="triptype" className="start-end-details-label">
                  Trip Type:
                  <span className="required-asterisk">*</span>
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
                <label
                  htmlFor="tripsubtype"
                  className="start-end-details-label"
                >
                  Sub Type:
                  <span className="required-asterisk">*</span>
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
                  <option value="Outstation Local Trip">
                    Outstation Local Trip
                  </option>
                  <option value="Outstation Outstation Trip">
                    Outstation Outstation Trip
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="drivername" className="start-end-details-label">
                  Driver Name:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="start-end-details-input"
                  type="text"
                  name="drivername"
                  placeholder="Enter Driver Name"
                  onChange={handleChange}
                  value={formData.drivername}
                />
              </div>
            </div>
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label
                  htmlFor="mobileNumber"
                  className="start-end-details-label"
                >
                  Mobile No:
                </label>
                <input
                  className="start-end-details-input"
                  type="text"
                  name="mobileNumber"
                  placeholder="Enter Driver Mobile Number"
                  onChange={handleChange}
                  value={formData.mobileNumber}
                />
              </div>
            </div>
          </div>

          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="allowance" className="start-end-details-label">
                  Allowance:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  className="start-end-details-input"
                  type="text"
                  name="allowance"
                  placeholder="Enter Driver Allowance"
                  onChange={handleChange}
                  value={formData.allowance}
                />
              </div>
            </div>
            <div className="start-end-details-column">
            <div className="d-flex gap-2">
                <div>
                  <div className="form-group">
                    <label htmlFor="toll" className="form-label">
                    Toll Parking:
                      {/* <span className="required-asterisk">*</span> */}
                    </label>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="toll"
                      name="toll"
                      placeholder="Toll Parking"
                      value={formData.toll}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="nightstay" className="form-label">
                      Night Stay:
                      {/* <span className="required-asterisk">*</span> */}
                    </label>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="nightstay"
                      name="nightstay"
                      placeholder="nightstay"
                      value={formData.nightstay}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          

          <div className="start-end-details-button-row">
            <button type="button" className="start-end-details-button">
              Print
            </button>
            <button
              type="button"
              className="start-end-details-button mx-2"
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartEndDetails;
