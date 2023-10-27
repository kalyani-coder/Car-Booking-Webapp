// StartEndDetails.js

import React, { useState } from 'react';
import "./StartEndDeteails.css"
import Sidebar from '../Sidebar/Sidebar';

const StartEndDetails = () => {
  const initialFormData = {
    pickuplocation: '',
    date: '',
    time: '',
    dropofflocation: '',
    date1: '',
    time1: '',
    totaldays: '',
    totalhours: '',
    triptype: '',
    subtype: '',
    customername:'',
    mobileno:'',
    drivername: '',
    mobileno1: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePrint = (event) => {
    event.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <>
      <Sidebar />
      <div className="start-end-details-container">
      <h2 style={{fontSize:"2rem",fontWeight:"bold",marginBottom:"8px"}}>Get Start And End Details</h2>
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
                  name="pickuplocation"
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
                <label htmlFor="dropofflocation" className="start-end-details-label">
                  Dropoff Location:
                </label>
                <input
                  className="start-end-details-input"
                  type="text"
                  name="dropofflocation"
                  value={formData.dropofflocation}
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
                <label htmlFor="totaldays" className="start-end-details-label">
                  Total Days:
                </label>
                <input
                  className="start-end-details-input"
                  type="number"
                  name="totaldays"
                  value={formData.totaldays}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="totalhours" className="start-end-details-label">
                  Total Hours:
                </label>
                <input
                  className="start-end-details-input"
                  type="text"
                  name="totalHours"
                  value={formData.totalhours}
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
                  name="Trip type"
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
                <label htmlFor="subtype" className="start-end-details-label">
                  Sub Type:
                </label>
                <select
                  className="start-end-details-input"
                  name="subtype"
                  onChange={handleChange}
                  value={formData.subtype}
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
                  name="customername"
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
                  name="mobileno"
                  onChange={handleChange}
                  value={formData.mobileno}
                />
              </div>
            </div>
          </div>

          <div className="start-end-details-row">
            <div className="start-end-details-column">
              <div className="start-end-details-form-group">
                <label htmlFor="customerid" className="start-end-details-label">
                  Driver Name:
                </label>
                <input
                  className="start-end-details-input"
                  type="text"
                  name="customername"
                  onChange={handleChange}
                  value={formData.drivername}
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
                  name="mobileno"
                  onChange={handleChange}
                  value={formData.mobileno}
                />
              </div>
            </div>
          </div>

          <div className="start-end-details-button-row">
            <button type="button" className="start-end-details-button" onClick={handlePrint}>
              Print
            </button>
            <button type="button" className="start-end-details-button mx-2" onClick={() => alert('Add')}>
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartEndDetails;
