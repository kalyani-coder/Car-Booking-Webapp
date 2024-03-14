
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './SharedDetails.css';
import Alert from "../AddCustomer/Alert";

const ShareDetails = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState({
    customermobile: '',
    pickuplocation: '',
    date: '',
    time: '',
    dropofflocation: '',
    date1: '',
    time1: '',
    vehicle: '',
    triptype: '',
    subtype: '',
    drivername: '',
    mail: '',
    drivermobileno: '',
    address: '',
    vehicleno: '',
  });

  

  useEffect(() => {
    // Fetch data from the API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/trip-details');
        const data = await response.json();
        // Update the customers state with the fetched data
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  const handleCustomerChange = (customerName) => {
    // Find the selected customer details based on the customer name
    const customerDetails = customers.find((trip) => trip.customername === customerName);

    // Log selected customer details to the console
    console.log('Selected Customer Details:', customerDetails);

    // Set the selected customer details in the state
    setSelectedCustomerDetails(customerDetails || {});
    setSelectedCustomer(customerName);
  };

  const showAlert = (message, type) => {
    if (type === "success") {
      setSuccessAlert({ msg: message, type: type });
      setTimeout(() => {
        setSuccessAlert(null);
      }, 5000);
    } else if (type === "error") {
      setErrorAlert({ msg: message, type: type });
      setTimeout(() => {
        setErrorAlert(null);
      },);
    }
  };

  const handleSave = async () => {
    try {
      // Make a POST request to the share-details API with the selected customer details
      const response = await fetch('http://localhost:7000/api/share-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Adjust the property names based on your API schema
          customerId: selectedCustomerDetails.customerId,
          customername: selectedCustomerDetails.customername,
          // cus_Name: selectedCustomerDetails.cus_Name,
          customermobile: selectedCustomerDetails.customermobile,
          vehicle: selectedCustomerDetails.vehicle,
          triptype: selectedCustomerDetails.triptype,
          subtype: selectedCustomerDetails.subtype,
          pickup: selectedCustomerDetails.pickuplocation,
          date: selectedCustomerDetails.date,
          time: selectedCustomerDetails.time,
          Dropoff: selectedCustomerDetails.dropofflocation,
          date1: selectedCustomerDetails.date1,
          time1: selectedCustomerDetails.time1,
          drivername: selectedCustomerDetails.drivername,
          mobileno: selectedCustomerDetails.drivermobileno,
          vehicleno: selectedCustomerDetails.vehicleno,
        }),
      });

      if (response.ok) {
        console.log('Details saved successfully!');
        showAlert("Share Details Saved successfully!" , "success");
      } else {
        showAlert("Failed to add data. Please try again.", "danger");
      }
    } catch (error) {
      showAlert("Failed to add data. Please try again.", "danger");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="share-details-container">
        {/* {mobilenoError && <p className="text-red-500">{mobilenoError}</p>} */}
        <div className="share-details-form">
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Share Details
          </h2>

          {successAlert && <Alert alert={successAlert} />}
      {errorAlert && <Alert alert={errorAlert} />}
            
          <div className="share-details-row">
            <div className="share-details-column">
              <div className="share-details-form-group">
              <label htmlFor="vehicle" className="share-details-label">
                  Customer Name:
                </label>
                <select  className="share-details-input" value={selectedCustomer} onChange={(e) => handleCustomerChange(e.target.value)}>
          {/* Default option */}
          <option value="" disabled>Select a customer</option>
          {/* Map over the customers array to populate the dropdown */}
          {customers.map((customer, index) => (
            <option key={index}   value={customer.customername}>
              {customer.customername}
            </option>
          ))}
        </select>
              </div>
            </div>

            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="customermobile" className="share-details-label">
                  Customer Mobile No:
                </label>
                <input
                  type="number"
                  className="share-details-input"
                  name="customermobile"
                  placeholder="Customer Mobile Number"
                  value={selectedCustomerDetails.customermobile} readOnly
                />
              </div>
            </div>
          </div>

          <div className="share-details-row">
            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="vehicle" className="share-details-label">
                  Vehicle:
                </label>
                <select
                  className="share-details-input"
                  value={selectedCustomerDetails.vehicle} readOnly
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
                  <option value="Non-AC Bus 17-Seater">
                    Non-AC Bus 17 Seater
                  </option>
                  <option value="Non-AC Bus 20-Seater">
                    Non-AC Bus 20 Seater
                  </option>
                  <option value="Non-AC Bus 32-Seater">
                    Non-AC Bus 32 Seater
                  </option>
                  <option value="Non-AC Bus 40-Seater">
                    Non-AC Bus 40 Seater
                  </option>
                  <option value="Non-AC Bus 45-Seater">
                    Non-AC Bus 45 Seater
                  </option>
                  <option value="Non-AC Bus 49-Seater">
                    Non-AC Bus 49 Seater
                  </option>
                </select>
              </div>
            </div>

            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="vehicleno" className="share-details-label">
                  Vehicle Number:
                </label>
                <input
                  type="text"
                  className="share-details-input"
                  name="vehicleno"
                  placeholder="Vehicle Number"
                  value={selectedCustomerDetails.vehicleno} readOnly
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
                  value={selectedCustomerDetails.triptype} readOnly
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
                  value={selectedCustomerDetails.subtype} readOnly
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
          <div className="share-details-row">
            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="pickuplocation" className="share-details-label">
                  Pickup Location:
                </label>
                <input
                  type="text"
                  className="share-details-input"
                  name="pickuplocation"
                  placeholder="Pickup Location"
                  value={selectedCustomerDetails.pickuplocation} readOnly
                />
              </div>
            </div>

            <div className="share-details-column">
              <div className="share-details-form-group">
                <label
                  htmlFor="dropofflocation"
                  className="share-details-label"
                >
                  Dropoff Location:
                </label>
                <input
                  type="text"
                  className="share-details-input"
                  placeholder="Enter Dropoff Location"
                  value={selectedCustomerDetails.dropofflocation} readOnly
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
                <input type="date"  className="share-details-input" value={selectedCustomerDetails.date} readOnly />
              </div>
            </div>

            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="date1" className="share-details-label">
                  Dropoff Date:
                </label>
                <input type="date"  className="share-details-input" value={selectedCustomerDetails.date1} readOnly />
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
                  value={selectedCustomerDetails.time}
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
                  value={selectedCustomerDetails.time1} readOnly
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
                  value={selectedCustomerDetails.drivername} readOnly
                />
              </div>
              
          <button
            type="button"
            className="customer-btn-submit"
            onClick={handleSave}
          >
            Save
          </button>
            </div>

            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="mobileno" className="share-details-label">
                  Driver Mobile No:
                </label>
                <input
                  type="number"
                  className="share-details-input"
                  placeholder="Driver Mobile Number"
                  value={selectedCustomerDetails.drivermobileno}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ShareDetails;
