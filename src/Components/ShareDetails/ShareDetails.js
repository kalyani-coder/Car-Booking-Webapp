import React, { useState, useEffect } from 'react';
import './SharedDetails.css'; // Your custom CSS file
import Sidebar from '../Sidebar/Sidebar';

// Functional component for ShareDetails
const ShareDetails = () => {
  // Initial form data state
  const initialFormData = {
    cus_Name: '',
    cus_Mobile: '',
    vehicle: '',
    vehiclenumber: '',
    triptype: '',
    subtype: '',
    pickup: '',
    date: '',
    time: '',
    dropoff: '',
    date1: '',
    time1: '',
    drivername: '',
    mobileno: '',
  };

  // State variables
  const [formData, setFormData] = useState(initialFormData);
  const [mobilenoError, setMobilenoError] = useState('');
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Fetch customers on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/add-customers');

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched Customers:', data); // Log the fetched data
          setCustomerList(data);
        } else {
          console.error('Failed to fetch customers');
        }
      } catch (error) {
        console.error('API request error:', error);
      }
    };

    fetchCustomers();
  }, []);

  // Update form data when a customer is selected
  useEffect(() => {
    if (selectedCustomer) {
      setFormData({
        cus_Name: selectedCustomer.cus_Name || '',
        cus_Mobile: selectedCustomer.cus_Mobile || '',
        // ... (other fields)
      });
    }
  }, [selectedCustomer]);

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleShare = async () => {
    // Map form field names to API field names
    const apiData = {
      cus_Name: formData.cus_Name,
      cus_Mobile: formData.cus_Mobile,
      vehicle: formData.vehicle,
      vehiclenumber: formData.vehiclenumber,
      triptype: formData.triptype,
      subtype: formData.subtype,
      pickup: formData.pickup,
      date: formData.date,
      time: formData.time,
      Dropoff: formData.dropoff,
      date1: formData.date1,
      time1: formData.time1,
      drivername: formData.drivername,
      drivermail: formData.drivermail,
      mobileno: formData.mobileno,
      driveraddress: formData.driveraddress,
    };

    // Check if all fields are filled
    for (const key in apiData) {
      if (apiData[key] === '') {
        setMobilenoError('All fields are required.');
        return;
      }
    }

    // Reset error if all fields are filled
    setMobilenoError('');

    try {
      const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/share-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        alert('Data saved successfully!');
        setFormData(initialFormData); // Reset the form
      } else {
        alert('Failed to save data. Please try again.');
      }
    } catch (error) {
      console.error('API request error:', error);
      alert('Failed to save data. Please try again.');
    }
  };

  return (
    <>
      <Sidebar />
      <div className='share-details-container'>
      {mobilenoError && <p className="text-red-500">{mobilenoError}</p>}
        <div className="share-details-form">
        <h2 style={{fontSize:"2rem",fontWeight:"bold",marginBottom:"8px"}}>Share Details</h2>


        <div className="share-details-row">
            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="cus_Name" className="share-details-label">
                  Customer Name:
                </label>
                {/* Dropdown to select a customer */}
                <select
                  className="share-details-input"
                  name="cus_Name"
                  id="cus_Name"
                  onChange={(e) => {
                    const selectedCustomer = customerList.find((customer) => customer.Cus_name === e.target.value);
                    setSelectedCustomer(selectedCustomer);
                  }}
                  value={selectedCustomer ? selectedCustomer.Cus_name : ''}
                >
                  <option value="">Select Customer</option>
                  {customerList.map((customer) => (
                    <option key={customer._id} value={customer.Cus_name}>
                      {customer.Cus_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="share-details-column">
              <div className="share-details-form-group">
                <label htmlFor="cus_Mobile" className="share-details-label">
                  Mobile No:
                </label>
                <input
                  type="number"
                  className="share-details-input"
                  name="cus_Mobile"
                  placeholder="Enter Mobile Number"
                  onChange={handleChange}
                  value={formData.cus_Mobile}
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
                <label htmlFor="mobileno" className="share-details-label">
                  Mobile No:
                </label>
                <input
                  type="number"
                  className="share-details-input"
                  name="mobileno"
                  placeholder="Mobile Number"
                  onChange={handleChange}
                  value={formData.mobileno}
                />
              </div>
            </div>
          </div>


          <button type="button" className="share-details-button" onClick={handleShare}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default ShareDetails;
