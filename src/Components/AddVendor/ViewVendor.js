import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './ViewVender.css';

const ViewVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/add-vendors');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error here, e.g., show an error message to the user
      }
    };

    fetchVendors();
  }, []);

  // Filter vendors based on search term
  const filteredVendors = vendors.filter((vendor) =>
    vendor.vendor_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Sidebar />
      <div className="vendor-Add-container">
        <div className="vendor-main-container">
          <h1 className="text-2xl font-semibold mb-4">Vendors</h1>

          {/* Search bar with Tailwind CSS classes */}
          <input
            type="text"
            placeholder="Search by Vendor Name"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full py-2 px-4 border rounded-lg shadow-md mb-4"
          />

          <div className="grid grid-cols-3 gap-4">
            {filteredVendors.map((vendor) => (
              <div key={vendor._id} className="custom-card bg-white shadow-md rounded-lg overflow-hidden">
                <div className="custom-card-body p-4">
                  <h5 className="custom-card-title text-lg font-semibold mb-2">Vendor Name: {vendor.vendor_Name}</h5>
                  <p className="custom-card-subtitle mb-2">Company Name: {vendor.company_Name}</p>
                  <p className="custom-card-subtitle mb-2">GST No: {vendor.GST_No}</p>
                  <p className="custom-card-subtitle mb-2">Mobile: {vendor.vendor_Mobile}</p>
                  <p className="custom-card-subtitle mb-2">Email: {vendor.Vendor_Email}</p>
                  <p className="custom-card-subtitle mb-2">Address: {vendor.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewVendor;
