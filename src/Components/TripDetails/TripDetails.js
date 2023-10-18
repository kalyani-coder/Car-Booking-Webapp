// TripDetailsPage.js

import React, { useState } from 'react';
import './TripDetails.css'; // Import the custom CSS
import Sidebar from '../Sidebar/Sidebar';

function TripDetailsPage() {
  const [tripDetails, setTripDetails] = useState({
    pickupLocation: '',
    date: '',
    time: '',
    dropoffLocation: '',
    date1: '',
    time1: '',
    vehicle: '',
    triptype: '',
    subtype: '',
    drivername: '',
    mail: '',
    mobileno: '',
    mobileno1: '',
  });

  return (
    <>
      <Sidebar />
      <div className="trip-details-container">
        <div className="trip-details-section">
          <h2 className="trip-details-heading">Trip Details</h2>
          <div className="trip-details-form">
            <div className="pt-4 mb-2 grid-gap-2 col-6">
              <label htmlFor='pickuplocation' className="trip-details-label">Pickup Location:</label>
              <input type="text" className="trip-details-input" value={tripDetails.pickupLocation} onChange={(e) => setTripDetails({ ...tripDetails, pickupLocation: e.target.value })} />

              <label htmlFor="date" className="trip-details-label"> Pickup Date:</label>
              <input type="date" className="trip-details-input" value={tripDetails.date} onChange={(e) => setTripDetails({ ...tripDetails, date: e.target.value })} />

              <label htmlFor='time' className="trip-details-label"> Pickup Time:</label>
              <input type="time" className="trip-details-input" value={tripDetails.time} onChange={(e) => setTripDetails({ ...tripDetails, time: e.target.value })} />

              <label className="trip-details-label">Drop-off Location:</label>
              <input
                type="text"
                className="trip-details-input"
                value={tripDetails.dropoffLocation} onChange={(e) => setTripDetails({ ...tripDetails, dropoffLocation: e.target.value })}
              />

              <label htmlFor='dropoffdate' className="trip-details-label">Drop-off Date:</label>
              <input
                type="date" className="trip-details-input" value={tripDetails.date1} onChange={(e) => setTripDetails({ ...tripDetails, date1: e.target.value })}
              />

              <label htmlFor='time' className="trip-details-label">Drop-off Time:</label>
              <input
                type="time"
                className="trip-details-input" value={tripDetails.time1} onChange={(e) => setTripDetails({ ...tripDetails, time1: e.target.value })}
              />

              <label htmlFor="vehicle" className="trip-details-label">Vehicle Preference:</label>
              <select className="trip-details-input" name="vehicle" id="vehicle" >
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

              <label htmlFor='triptype' className="trip-details-label">Trip Type:</label>
              <select className="trip-details-input" id="Trip type" >
                <option value="">Trip Type</option>
                <option value="One Way Trip">One Way Trip</option>
                <option value="Return Trip">Return Trip</option>
              </select>

              <label htmlFor='subtype' className="trip-details-label">Sub Type:</label>
              <select className="trip-details-input" id="subtype"   >
                <option value="">Sub Type</option>
                <option value="Local Trip">Local Trip</option>
                <option value="Outstaion Trip">Outstation Trip</option>
                <option value="Outstaion Local Trip">Outstation Local Trip</option>
                <option value="Outstaion Outstation Trip">Outstation Outstation Trip</option>
              </select>
            </div>
          </div>
        </div>

        <div className="driver-details-section">
          <h2 className="driver-details-heading">Driver Details</h2>
          <div className="driver-details-form">
            <div className="grid-gap-2 col-6">
              <label htmlFor="drivername" className="driver-details-label">Driver Name:</label>
              <input type="text" className="driver-details-input" name="drivername" placeholder="Driver Name" />

              <label htmlFor="drivermail" className="driver-details-label">Mail:</label>
              <input type="text" className="driver-details-input" name="drivermail" placeholder="Mail Id" />

              <label htmlFor="mobileno" className="driver-details-label">Mobile No:</label>
              <input className="driver-details-input" type="text" id="mobileno" />

              <label htmlFor="email" className="driver-details-label">Email:</label>
              <input className="driver-details-input" type="text" id="email" />
            </div>
          </div>
        </div>
      </div>

      <div className="custom-button-container text-center mt-3">
        <button className="custom-btn custom-print-btn" onClick={() => window.print()}>
          Print
        </button>
        <button className="custom-btn custom-allocate-btn" onClick={() => alert('Trip Allocated')}>
          Allocate
        </button>
      </div>
    </>
  );
}

export default TripDetailsPage;
