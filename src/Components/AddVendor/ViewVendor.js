import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './ViewVender.css'; // Make sure you have a CSS file for this component

const ViewVendor = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/add-venders');
        if (!response.ok) {
          throw  Error('Network response was not ok');
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchVendors();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="vendor-Add-container">
        <div className="vendor-main-container">
          <h1 className="text-2xl font-semibold mb-4">Vendors</h1>
          <div className="grid grid-cols-3 gap-4">
            {vendors.map((vendor) => (
              <div key={vendor._id} className="custom-card bg-white shadow-md rounded-lg overflow-hidden">
                <div className="custom-card-body p-4">
                  <h5 className="custom-card-title text-lg font-semibold mb-2">Vendor Name: {vendor.vender_Name}</h5>
                  <p className="custom-card-subtitle mb-2">Company Name: {vendor.company_Name}</p>
                  <p className="custom-card-subtitle mb-2">GST No: {vendor.GST_No}</p>
                  <p className="custom-card-subtitle mb-2">Mobile: {vendor.vender_Mobile}</p>
                  <p className="custom-card-subtitle mb-2">Email: {vendor.Vender_Email}</p>
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