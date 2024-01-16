import React, { useState, useEffect  } from 'react';
import './AllocateTrip.css'; // Import the custom CSS
import Sidebar from '../Sidebar/Sidebar';

function AllocateTrip() {
  const initialTripDetails = {
    customerId: '',
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
    address: '',
    vehicleno: ''
  };

  const [tripDetails, setTripDetails] = useState(initialTripDetails);
  const [error, setError] = useState('');
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/add-trip');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data); // Assuming that the data received is an array of customers
      } catch (error) {
        console.error('Error fetching customers:', error);
        setError('Error fetching customers: ' + error.message);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    // Update form data when a customer is selected
    if (selectedCustomer) {
      setTripDetails({
        customerId: selectedCustomer._id,
        pickupLocation: '',
        date: '2024-01-01', // Default date value, modify as needed
        time: '00:00', // Default time value, modify as needed
        dropoffLocation: '',
        date1: '2024-01-13', // Default date value, modify as needed
        time1: '00:00', // Default time value, modify as needed
        vehicle: '',
        triptype: 'One Way Trip', // Default trip type, modify as needed
        subtype: 'Outstation Outstation Trip', // Default subtype, modify as needed
        drivername: '',
        mail: '',
        mobileno: '',
        address: '',
        vehicleno: '',
      });
    }
  }, [selectedCustomer]);

  const handleFieldChange = (fieldName, value) => {
    setTripDetails((prevTripDetails) => ({
      ...prevTripDetails,
      [fieldName]: value,
    }));
  };

  const handleAllocateClick = async () => {
    // Ensure all fields are filled
    for (const fieldName in tripDetails) {
      if (fieldName !== 'customerId' && tripDetails[fieldName] === '') {
        setError('All fields are required.');
        return;
      }
    }

    // Reset error if all fields are filled
    setError('');

    // Prepare the data to send to the API
    const apiData = {
      pickuplocation: tripDetails.pickupLocation,
      date: tripDetails.date,
      time: tripDetails.time,
      dropofflocation: tripDetails.dropoffLocation,
      date1: tripDetails.date1,
      time1: tripDetails.time1,
      vehicle: tripDetails.vehicle,
      triptype: tripDetails.triptype,
      subtype: tripDetails.subtype,
      drivername: tripDetails.drivername,
      mail: tripDetails.mail,
      mobileno: tripDetails.mobileno,
      address: tripDetails.address,
      vehicleno: tripDetails.vehicleno
    };
    console.log("sdfgbn", { apiData })
    try {
      // Make the API request
      const response = await fetch('http://localhost:7000/api/trip-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        // Reset the form on success
        setTripDetails(initialTripDetails);
        alert('Data saved successfully!');
      } else {
        alert('Failed to save data. Please try again.');
      }
    } catch (error) {
      console.error('API request error:', error);
      alert('Failed to save data. Please try again.');
    }
  };
  const handleShareClick = async () => {
    try {
      // Make the API request to share the post data
      const response = await fetch(`http://localhost:7000/api/trip-details/${tripDetails._id}`);
      if (response.ok) {
        const sharedData = await response.json();
        // Display the shared data in the console or alert, you can modify this part based on your requirement
        console.log('Shared Data:', sharedData);
        alert('Trip details shared successfully!');
      } else {
        alert('Failed to share trip details. Please try again.');
      }
    } catch (error) {
      console.error('API request error:', error);
      alert('Failed to share trip details. Please try again.');
    }
  };

  return (
    <>
      <Sidebar />

      <div className="trip-details-container">
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>Allocate Trip Details</h2>
        
             
        <div className='d-flex gap-3'>
          <div className="trip-details-section">
            {error && <p className="text-red-500">{error}</p>}
            <h2 className="trip-details-heading">Trip Details</h2>
            <div className="trip-details-form">
            
              <div className="pt-4 mb-2 grid-gap-2">
              <label htmlFor='triptype' className="trip-details-label">Customer Name:</label>
                <span className="required-asterisk">*</span>
                <select
                className="trip-details-input"
                id="customerId"
                name="customerId"
                onChange={(e) => {
                  const selectedCustomer = customers.find(
                    (customer) => customer.customername === e.target.value
                  );
                  setTripDetails((prevTripDetails) => ({
                    ...prevTripDetails,
                    customerId: selectedCustomer ? selectedCustomer._id : '',
                  }));
                }}
                value={tripDetails.customerId}
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer._id} value={customer.customername}>
                    {customer.customername}
                  </option>
                ))}
              </select>

                <div className="d-flex gap-3">
                  <div>
                    <label htmlFor='pickup' className="trip-details-label">Pickup Location:</label>
                    <span className="required-asterisk">*</span>
                    <input
                      type="text"
                      className="trip-details-input"
                      placeholder="Pickup Location"
                      value={tripDetails.pickup}
                      onChange={(e) => handleFieldChange('pickup', e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="trip-details-label">Pickup Date:</label>
                    <span className="required-asterisk">*</span>
                    <input
                      type="date"
                      className="trip-details-input"
                      value={tripDetails.date}
                      onChange={(e) => handleFieldChange('date', e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor='time' className="trip-details-label">Time:</label>
                    <span className="required-asterisk">*</span>
                    <input
                      type="time"
                      className="trip-details-input"
                      value={tripDetails.time}
                      onChange={(e) => handleFieldChange('time', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="d-flex gap-3">
                  <div>
                    <label className="trip-details-label">Dropoff Location:</label>
                    <span className="required-asterisk">*</span>
                    <input
                      type="text"
                      className="trip-details-input"
                      placeholder="Drop-off Location"
                      value={tripDetails.dropoffLocation}
                      onChange={(e) => handleFieldChange('dropoffLocation', e.target.value)}
                    />
                  </div>
                  <div className="drop-off">
                    <label htmlFor='dropoffDate' className="trip-details-label">Drop-off Date:</label>
                    <span className="required-asterisk">*</span>
                    <input
                      type="date"
                      className="trip-details-input"
                      value={tripDetails.date1}
                      onChange={(e) => handleFieldChange('date1', e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor='time1' className="trip-details-label"> Time:</label>
                    <span className="required-asterisk">*</span>
                    <input
                      type="time"
                      className="trip-details-input"
                      value={tripDetails.time1}
                      onChange={(e) => handleFieldChange('time1', e.target.value)}
                    />
                  </div>
                </div>
                <label htmlFor="vehicle" className="trip-details-label">Type Of Vehicle:</label>
                <span className="required-asterisk">*</span>
                <select
                  className="trip-details-input"
                  name="vehicle"
                  id="vehicle"
                  value={tripDetails.vehicle}
                  onChange={(e) => handleFieldChange('vehicle', e.target.value)}
                >
                  <option value="">Vehicle</option>
                  <option value="Sedan Car">Sedan Car</option>
                  <option value="Mini Car">Mini Car</option>
                  <option value="SUV Car">SUV Car</option>
                  <option value="Ac Bus 13-Seater">AC Bus 13-Seater</option>
                  <option value="AC Bus 17-Seater">AC Bus 17-Seater</option>
                  <option value="AC Bus 20-Seater">AC Bus 20-Seater</option>
                  <option value="AC Bus 32-Seater">AC Bus 32-Seater</option>
                  <option value="AC Bus 35-Seater">AC Bus 35-Seater</option>
                  <option value="AC Bus 40-Seater">AC Bus 40-Seater</option>
                  <option value="AC Bus 45-Seater">AC Bus 45-Seater</option>
                  <option value="Non-AC Bus 17-Seater">Non-AC Bus 17 Seater</option>
                  <option value="Non-AC Bus 20-Seater">Non-AC Bus 20 Seater</option>
                  <option value="Non-AC Bus 32-Seater">Non-AC Bus 32 Seater</option>
                  <option value="Non-AC Bus 40-Seater">Non-AC Bus 40 Seater</option>
                  <option value="Non-AC Bus 45-Seater">Non-AC Bus 45 Seater</option>
                  <option value="Non-AC Bus 49-Seater">Non-AC Bus 49 Seater</option>
                </select>

                <label htmlFor='triptype' className="trip-details-label">Trip Type:</label>
                <span className="required-asterisk">*</span>
                <select
                  className="trip-details-input"
                  id="triptype"
                  value={tripDetails.triptype}
                  onChange={(e) => handleFieldChange('triptype', e.target.value)}
                >
                  <option value="">Trip Type</option>
                  <option value="One Way Trip">One Way Trip</option>
                  <option value="Return Trip">Return Trip</option>
                </select>

                <label htmlFor='subtype' className="trip-details-label">Sub Type:</label>
                <span className="required-asterisk">*</span>
                <select
                  className="trip-details-input"
                  id="subtype"
                  value={tripDetails.subtype}
                  onChange={(e) => handleFieldChange('subtype', e.target.value)}
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

          <div className="driver-details-section">
            <h2 className="driver-details-heading">Driver Details</h2>
            <div className="driver-details-form">
              <div className="pt-4 mb-2 grid-gap-2">
                <label htmlFor="drivername" className="driver-details-label">Driver Name:</label>
                <span className="required-asterisk">*</span>
                <input
                  type="text"
                  className="driver-details-input"
                  name="drivername"
                  placeholder="Driver Name"
                  value={tripDetails.drivername}
                  onChange={(e) => handleFieldChange('drivername', e.target.value)}
                />

                <label htmlFor="drivermail" className="driver-details-label">Mail:</label>
                <input
                  type="email"
                  className="driver-details-input"
                  name="drivermail"
                  placeholder="Mail Id"
                  value={tripDetails.mail}
                  onChange={(e) => handleFieldChange('mail', e.target.value)}
                />

                <label htmlFor="mobileno" className="driver-details-label">Mobile No:</label>
                <span className="required-asterisk">*</span>
                <input
                  type="number"
                  className="driver-details-input"
                  name="mobileno"
                  placeholder="Mobile No."
                  value={tripDetails.mobileno}
                  onChange={(e) => handleFieldChange('mobileno', e.target.value)}
                />

                <label htmlFor="address" className="driver-details-label">Driver Address:</label>
                <input
                  type="text"
                  className="driver-details-input"
                  name="address"
                  placeholder="Driver Address"
                  value={tripDetails.address}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                />
                 <label htmlFor="vehicle_number" className="driver-details-label">Vehicle Number:</label>
                <input
                  type="text"
                  className="driver-details-input"
                  name="vehicle_number"
                  placeholder="Vehicle Number"
                  value={tripDetails.vehicleno}
                  onChange={(e) => handleFieldChange('vehicleno', e.target.value)}
                />
              </div>
            </div>

          </div>
        </div>

        <div className="custom-button-container text-center mt-3">
          <button className="custom-btn custom-allocate-btn" onClick={handleAllocateClick}>
            Allocate
          </button>
          <button className="custom-btn custom-generate-btn" onClick={handleShareClick}>
            Share
          </button>
        </div>
      </div>

    </>
  );
}

export default AllocateTrip;