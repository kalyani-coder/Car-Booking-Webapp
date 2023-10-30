import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './ViewVender.css'; // Make sure you have a CSS file for this component

const ViewVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/add-venders');
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter((vendor) => {
    const venderName = vendor.vender_Name || '';
    const companyName = vendor.company_Name || '';
    return (
      venderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Sidebar />
      <div className="vendor-Add-container">
        <div className="vendor-main-container">
        <h2 style={{fontSize:"2rem",fontWeight:"bold",marginBottom:"8px"}}>View Vendors</h2>
          <input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 border rounded-lg shadow-md mb-4"
          />
          <div className="grid grid-cols-3 gap-4">
            {filteredVendors.map((vendor) => (
              <div
                key={vendor._id}
                className="custom-card bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="custom-card-body p-4">
                  <p className=" font-semibold ">
                    Vendor Name: {vendor.vender_Name}
                  </p>
                  <p className="custom-card-subtitle mb-2">
                    Company Name: {vendor.company_Name}
                  </p>
                  <p className="custom-card-subtitle mb-2">GST No: {vendor.GST_No}</p>
                  <p className="custom-card-subtitle mb-2">Mobile: {vendor.vender_Mobile}</p>
                  <p className="custom-card-subtitle mb-2">Email: {vendor.Vender_Email}</p>
                  <p className="custom-card-subtitle mb-2">Address: {vendor.address}</p>
                  <div className="flex justify-between">
                        

                        <button className='btn btn-info'>Edit</button>
                        <button className='btn btn-danger'>Save</button>
                        <button className='btn btn-success'>Delete</button>
                     
                      </div>
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
