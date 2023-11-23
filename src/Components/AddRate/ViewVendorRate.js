import React, { useState, useEffect } from 'react';
import "./ViewCustomerRate.css";
import Sidebar from '../Sidebar/Sidebar';

const ViewVenderRate = () => {
  const [customerRates, setCustomerRates] = useState([]);
  const [filteredCustomerRates, setFilteredCustomerRates] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCustomerRates = async () => {
      try {
        const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/vender-rate');
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



  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>View Vendor Rate</h2>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Vender Name "
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
                      <p className="font-semibold">Vender Name: {customerRate.vender_Name}</p>
                      <p className="custom-card-subtitle mb-2">GST_No: {customerRate.GST_No}</p>
                      <p className="custom-card-subtitle mb-2">Mobile Number: {customerRate.mobile_Number}</p>
                      <p className="custom-card-subtitle mb-2">Rate Per KM: {customerRate.rate_per_km}</p>
                      <p className="custom-card-subtitle mb-2">Title: {customerRate.title}</p>
                      <p className="custom-card-subtitle mb-2">Rate: {customerRate.rate}</p>
                      {/* Add more fields as needed */}
                      <div className="flex justify-between">
                        <button className='btn btn-info' >Edit</button>
                        <button className='btn btn-danger' >Save</button>
                        <button className='btn btn-success'>Delete</button>
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

export default ViewVenderRate;

