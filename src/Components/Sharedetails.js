// ShareDetails.js

import React, { useState } from 'react';
// import './CustomerInquiry.css'; // Assuming this is your main CSS file
import './SharedDetails.css'; // Your custom CSS file
import Sidebar from './Sidebar';

const ShareDetails = () => {
  const initialFormData = {
    vehicle: '',
    vehiclenumber:'',
    triptype: '',
    subtype: '',
    pickup: '',
    date: '',
    time: '',
    dropoff: '',
    date1: '',
    time1: '',
    drivername: '',
    drivermail: '',
    mobileno: '',
    driveraddress:''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleShare = (event) => {
    event.preventDefault();
    console.log('form data:', formData);
  };

  return (
    <>
      <Sidebar />
      <div className='share-details-container'>
        <div className="share-details-form">
          <div className="share-details-row">
            <div className="share-details-column">
              <div className="share-details-form-group">
              <label htmlFor="vehicle" className="share-details-label">
                  Vehicle:
                </label>
                <select
                  className="share-details-input"
                  name="vehicle"
                  id="vehicle"
                  onChange={handleChange}
                  value={formData.vehicle}
                >
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

            <div className="share-details-column">
              <div className="share-details-form-group">
              <label htmlFor="vehiclenumber" className="share-details-label">
                  Vehicle Number:
                </label>
                <input
                  type="text"
                  className="share-details-input"
                  name="vehiclenumber"
                  placeholder="Vehicle Number"
                  onChange={handleChange}
                  value={formData.vehiclenumber}
                />
              </div>
            </div>
          </div>

          <div className="share-details-row">
            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="triptype" className="share-details-label">
                  Trip Type:
                </label>
                <select
                  className="share-details-input"
                  name="triptype"
                  id="triptype"
                  onChange={handleChange}
                  value={formData.triptype}
                >
                  <option value="">Trip Type</option>
                  <option value="One Way Trip">One Way Trip</option>
                  <option value="Return Trip">Return Trip</option>
                </select>
              </div>
            </div>

            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="subtype" className="share-details-label">
                  Sub Type:
                </label>
                <select
                  className="share-details-input"
                  name="subtype"
                  id="subtype"
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

          <div className="share-details-row">
            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="pickup" className="share-details-label">
                  Pickup Location:
                </label>
                <input
                  type="text"
                  className="share-details-input"
                  name="pickup"
                  placeholder="Pickup Location"
                  onChange={handleChange}
                  value={formData.pickup}
                />
              </div>
            </div>

            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="dropoff" className="share-details-label">
                  Dropoff Location:
                </label>
                <input
                  type="text"
                  className="share-details-input"
                  name="dropoff"
                  placeholder="Enter Dropoff Location"
                  onChange={handleChange}
                  value={formData.dropoff}
                />
              </div>
            </div>
          </div>

          <div className="share-details-row">
            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="date" className="share-details-label">
                  Pickup Date:
                </label>
                <input
                  type="date"
                  className="share-details-input"
                  name="date"
                  onChange={handleChange}
                  value={formData.date}
                />
              </div>
            </div>

            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="date1" className="share-details-label">
                   Dropoff Date:
                </label>
                <input
                  type="date"
                  className="share-details-input"
                  name="date1"
                  onChange={handleChange}
                  value={formData.date1}
                />
              </div>
            </div>
          </div>

          <div className="share-details-row">
            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="time" className="share-details-label">
                  Pickup Time:
                </label>
                <input
                  type="time"
                  className="share-details-input"
                  name="time"
                  onChange={handleChange}
                  value={formData.time}
                />
              </div>
            </div>

            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="time1" className="share-details-label">
                   Dropoff Time:
                </label>
                <input
                  type="time"
                  className="share-details-input"
                  name="time1"
                  onChange={handleChange}
                  value={formData.time1}
                />
              </div>
            </div>
          </div>

          <div className="share-details-row">
            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="drivername" className="share-details-label">
                  Driver Name:
                </label>
                <input
                  type="text"
                  className="share-details-input"
                  name="drivername"
                  placeholder="Driver Name"
                  onChange={handleChange}
                  value={formData.drivername}
                />
              </div>
            </div>

            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="drivermail" className="share-details-label">
                  Mail:
                </label>
                <input
                  type="text"
                  className="share-details-input"
                  name="drivermail"
                  placeholder="Mail Id"
                  onChange={handleChange}
                  value={formData.drivermail}
                />
              </div>
            </div>
          </div>

          <div className="share-details-row">
            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="mobileno" className="share-details-label">
                  Mobile No:
                </label>
                <input
                  type="text"
                  className="share-details-input"
                  name="mobileno"
                  placeholder="Mobile No"
                  onChange={handleChange}
                  value={formData.mobileno}
                />
              </div>
            </div>

            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="driveraddress" className="share-details-label">
                Driver Address:
                </label>
                <input
                  type="text"
                  className="share-details-input"
                  name="driveraddress"
                  placeholder="Driver Address"
                  onChange={handleChange}
                  value={formData.driveraddress}
                />
              </div>
            </div>
          </div>

          <button type="button" className="share-details-button" onClick={handleShare}>
            Share With Customer
          </button>
        </div>
      </div>
    </>
  );
};

export default ShareDetails;
