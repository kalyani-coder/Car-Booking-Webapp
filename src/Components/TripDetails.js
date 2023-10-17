import React, { useState } from 'react';
import './CustomerInquiry.css';
import Sidebar from './Sidebar';

function TripDetailsPage() {
  const [tripDetails, setTripDetails] = useState({
    pickuplocation: '',
    date: '',
    time: '',
    dropofflocation: '',
    date1: '',
    time1: '',
    vehicle: '',
    triptype: '',
    subtype: '',
    drivername:'',
    mail:'',
    mobileno:'',
    mobileno1:'',
     
  });

  // // Define state variables for driver details
  // const [driverDetails, setDriverDetails] = useState({
  //   drivername: '',
  //   driveremail: '',
  //   driveraddress: '',
  // });

  // Function to handle trip details form submission
  // const handleTripSubmit = (e) => {
  //   e.preventDefault();
  //   // You can access the entered trip details in the tripDetails state
  //   console.log('Submitted Trip Details:', tripDetails);
  // };

  // // Function to handle driver details form submission
  // const handleDriverSubmit = (e) => {
  //   e.preventDefault();
  //   // You can access the entered driver details in the driverDetails state
  //   console.log('Submitted Driver Details:', driverDetails);
  // };

  return (
    <>
    <Sidebar/>
    <div className="container mt-4">
            <div className="heading">
              <div className="col-6">
            <h2>Trip Details</h2>
            </div>
            <div>
            <h2 >Driver Details</h2>
            </div>
            </div>
            {/* <form onSubmit={handleTripSubmit}> */}
            <div className="form">
              <div className="pt-4  mb-2 grid-gap-2  col-6">
                <label htmlFor='pickuplocation' className="form-label">Pickup Location:</label>
                <input type="text" className="form-control" value={tripDetails.pickuplocation} onChange={(e) => setTripDetails({ ...tripDetails, pickupLocation: e.target.value })}/>
             
                  <label  htmlFor="date" className="form-label"> Pickup Date:</label>
                  <input type="date" className="form-control"
                    value={tripDetails.pickupdate} onChange={(e) => setTripDetails({ ...tripDetails, date: e.target.value })} />
             
                  <label htmlFor='time' className="form-label"> Pickup Time:</label>
                  <input type="time" className="form-control" value={tripDetails.time} onChange={(e) => setTripDetails({ ...tripDetails, time: e.target.value })}/>
         
                <label className="form-label">Drop-off Location:</label>
                <input
                  type="text"
                  className="form-control"
                  value={tripDetails.dropofflocation} onChange={(e) => setTripDetails({ ...tripDetails, dropofflocation: e.target.value })}
                />
            
                
                  <label htmlFor='dropoffdate' className="form-label">Drop-off Date:</label>
                  <input
                    type="date" className="form-control" value={tripDetails.date} onChange={(e) => setTripDetails({ ...tripDetails, date: e.target.value })} />
                
                  <label htmlFor='time' className="form-label">Drop-off Time:</label>
                  <input
                    type="time"
                    className="form-control" value={tripDetails.time} onChange={(e) => setTripDetails({ ...tripDetails, time: e.target.value })} />
           
                <label htmlFor="vehicle" className="form-label">Vehicle Preference:</label>
                <select className="form-control mb-2" name="vehicle" id="vehicle"  >
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
              
                <label htmlFor='triptype' className="form-label">Trip Type:</label>
                <select className="form-control mb-2 my-4 mt-1 " id="Trip type" >
          <option value="">Trip Type</option>
          <option value="One Way Trip">One Way Trip</option>
          <option value="Return Trip">Return Trip</option>
        </select>
                <label htmlFor='subtype' className="custom-label">Sub Type:</label>
                <select className="form-control mb-2 my-4 mt-1" id="subtype"   >
          <option value="">Sub Type</option>
          <option value="Local Trip">Local Trip</option>
          <option value="Outstaion Trip">Outstation Trip</option>
          <option value="Outstaion Local Trip">Outstation Local Trip</option>
          <option value="Outstaion Outstation Trip">Outstation Outstation Trip</option>
        </select>
              </div>
                <div className="pt-4  mb-2 grid-gap-2  col-6">
 <label htmlFor="drivername" className="form-label">Driver Name:</label>
  <input type="text" className="form-control" name="drivername" placeholder="Driver Name" />
  <label htmlFor="drivermail" className="form-label">Mail:</label>
  <input type="text" className="form-control"  name="drivermail" placeholder="Mail Id"  />
  <label htmlFor="mobileno" className="form-label">  Mobile No:</label>
  <input className="form-control" type="text" id="mobileno"/>
  <label htmlFor="mobileno" className="form-label">Mobile No:</label>
  <input className="form-control" type="text" id="email"/>
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
      </div>
      </>
    // </div>
  );
}

export default TripDetailsPage;