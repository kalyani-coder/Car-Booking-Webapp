import React, { useState, useEffect } from 'react';
import "./ViewCustomerRate.css";
import Sidebar from '../Sidebar/Sidebar';

const ViewCustomerRate = () => {
  const [customerRates, setCustomerRates] = useState([]);
  const [filteredCustomerRates, setFilteredCustomerRates] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCustomerRates = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/vendor-rate');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomerRates(data);
        setFilteredCustomerRates(data); // Initialize filtered data with all customer rates
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data: ' + error.message);
      }
    };

    fetchCustomerRates();
  }, []);

  const filterCustomerRates = () => {
    const filteredData = customerRates.filter((customerRate) => {
      const customerNameMatches = customerRate.customer_Name && customerRate.customer_Name.toLowerCase().includes(searchQuery.toLowerCase());
      // Check if customerRate.customer_Name is defined before using toLowerCase

      // Add more criteria as needed
      return customerNameMatches;
    });

    setFilteredCustomerRates(filteredData);
  };

  useEffect(() => {
    filterCustomerRates();
  }, [searchQuery, customerRates]);

  // Function to edit a customer rate (example implementation)
  const editCustomerRate = (customerRateId) => {
    // Implement your edit logic here
    console.log(`Edit customer rate with ID: ${customerRateId}`);
  };

  // Function to save a customer rate (example implementation)
  const saveCustomerRate = (customerRateId) => {
    // Implement your save logic here
    console.log(`Save customer rate with ID: ${customerRateId}`);
  };

  // Function to delete a customer rate (example implementation)
  const deleteCustomerRate = (customerRateId) => {
    // Implement your delete logic here
    console.log(`Delete customer rate with ID: ${customerRateId}`);
  };

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>View Customer Rate</h2>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Customer Name "
              className="w-full p-2 rounded border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid-view">
            {filteredCustomerRates.length === 0 ? (
              <p>No results found.</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {filteredCustomerRates.map((customerRate) => (
                  <div key={customerRate._id} className="custom-card bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="custom-card-body p-4">
                      <h5 className="font-semibold">Company Name: {customerRate.company_Name}</h5>
                      <p className="font-semibold">Customer Name: {customerRate.customer_Name}</p>
                      <p className="custom-card-subtitle mb-2">GST_No: {customerRate.GST_No}</p>
                      <p className="custom-card-subtitle mb-2">Mobile Number: {customerRate.mobile_Number}</p>
                      <p className="custom-card-subtitle mb-2">Rate Per KM: {customerRate.rate_per_km}</p>
                      <p className="custom-card-subtitle mb-2">Title: {customerRate.title}</p>
                      <p className="custom-card-subtitle mb-2">Rate: {customerRate.rate}</p>
                      {/* Add more fields as needed */}
                      <div className="flex justify-between">
                        <button className='btn btn-info' onClick={() => editCustomerRate(customerRate._id)}>Edit</button>
                        <button className='btn btn-danger' onClick={() => saveCustomerRate(customerRate._id)}>Save</button>
                        <button className='btn btn-success' onClick={() => deleteCustomerRate(customerRate._id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCustomerRate;
