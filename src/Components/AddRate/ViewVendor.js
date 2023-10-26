import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './ViewVender.css';

const ViewVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
      }
    };

    fetchVendors();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="vendor-Add-container">
        <div className="vendor-main-container">
          <h1>Vendors</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Vendor Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {vendors
            .filter((vendor) =>
              vendor.vender_Name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((vendor) => (
              <div key={vendor._id} className="custom-card">
                <div className="custom-card-body">
                  <h5 className="custom-card-title">Vendor Name: {vendor.vender_Name}</h5>
                  <h6 className="custom-card-subtitle mb-2 text-muted">
                    Company Name: {vendor.company_Name}
                  </h6>
                  <h6 className="custom-card-subtitle mb-2 text-muted">
                    GST No: {vendor.GST_No}
                  </h6>
                  <h6 className="custom-card-subtitle mb-2 text-muted">
                    Mobile: {vendor.vender_Mobile}
                  </h6>
                  <h6 className="custom-card-subtitle mb-2 text-muted">
                    Email: {vendor.Vender_Email}
                  </h6>
                  <h6 className="custom-card-subtitle mb-2 text-muted">
                    Address: {vendor.address}
                  </h6>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ViewVendor;
