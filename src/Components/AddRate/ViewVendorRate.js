import React, { useState, useEffect } from 'react';
import "./ViewVendorRate.css";
import Sidebar from '../Sidebar/Sidebar';

const ViewVendorRate = () => {
  const [vendorRates, setVendorRates] = useState([]);
  const [filteredVendorRates, setFilteredVendorRates] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchVendorRates = async () => {
      try {
        const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/vender-rate');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVendorRates(data);
        setFilteredVendorRates(data); // Initialize filtered data with all vendor rates
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data: ' + error.message);
      }
    };

    fetchVendorRates();
  }, []);

  const filterVendorRates = () => {
    const filteredData = vendorRates.filter((vendorRate) => {
      const vendorNameMatches = vendorRate.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
      // Add more criteria as needed
      return vendorNameMatches ;
    });

    setFilteredVendorRates(filteredData);
  };

  useEffect(() => {
    filterVendorRates();
  }, [searchQuery]);

  // Function to edit a vendor rate (example implementation)
  const editVendorRate = (vendorRateId) => {
    // Implement your edit logic here
    console.log(`Edit vendor rate with ID: ${vendorRateId}`);
  };

  // Function to save a vendor rate (example implementation)
  const saveVendorRate = (vendorRateId) => {
    // Implement your save logic here
    console.log(`Save vendor rate with ID: ${vendorRateId}`);
  };

  // Function to delete a vendor rate (example implementation)
  const deleteVendorRate = (vendorRateId) => {
    // Implement your delete logic here
    console.log(`Delete vendor rate with ID: ${vendorRateId}`);
  };

  return (
    <>
      <Sidebar />
      <div className="vendor-rate-container">
        <div className="vendor-rate-main-container">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>View Vendor Rate</h2>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Vendor Name / Vehicle Type"
              className="w-full p-2 rounded border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid-view">
            {filteredVendorRates.length === 0 ? (
              <p>No results found.</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {filteredVendorRates.map((vendorRate) => (
                  <div key={vendorRate._id} className="custom-card bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="custom-card-body p-4">
                    <h5 className="font-semibold">company_Name: {vendorRate.company_Name}</h5>
                      <p className="custom-card-subtitle mb-2">GST_No: {vendorRate.GST_No}</p>
                      <p className="font-semibold">Customer Name: {vendorRate.vendorName}</p>
                      <p className="custom-card-subtitle mb-2">mobile_Number: {vendorRate.mobile_Number}</p>
                      <p className="custom-card-subtitle mb-2">rate_per_km: {vendorRate.rate_per_km}</p>
                      <p className="custom-card-subtitle mb-2">title: {vendorRate.title}</p>
                      <p className="custom-card-subtitle mb-2">rate: {vendorRate.rate}</p>
                      <div className="flex justify-between">
                        <button className='btn btn-info' onClick={() => editVendorRate(vendorRate._id)}>Edit</button>
                        <button className='btn btn-danger' onClick={() => saveVendorRate(vendorRate._id)}>Save</button>
                        <button className='btn btn-success' onClick={() => deleteVendorRate(vendorRate._id)}>Delete</button>
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

export default ViewVendorRate;
