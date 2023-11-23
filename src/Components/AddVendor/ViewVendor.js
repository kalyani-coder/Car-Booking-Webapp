import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './ViewVender.css'; // Make sure you have a CSS file for this component

const ViewVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedVendor, setEditedVendor] = useState({});

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/add-venders');
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
    return venderName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDelete = async (vendorId) => {
    const confirmed = window.confirm("Are you sure you want to delete this vendor?");
    if (confirmed) {
      try {
        const response = await fetch(`https://carbooking-backend-fo78.onrender.com/api/add-venders/${vendorId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setVendors((prevVendors) => prevVendors.filter((vendor) => vendor._id !== vendorId));
        alert('Vendor deleted successfully');
      } catch (error) {
        console.error('Error deleting vendor:', error);
      }
    }
  };

  const handleEditVendor = (vendor) => {
    setEditedVendor(vendor);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://carbooking-backend-fo78.onrender.com/api/add-venders/${editedVendor._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedVendor),
      });

      if (response.ok) {
        setVendors(prevVendors =>
          prevVendors.map(vendor =>
            vendor._id === editedVendor._id ? editedVendor : vendor
          )
        );
        setIsEditing(false);
      } else {
        console.error('Error updating vendor:', response.status);
      }
    } catch (error) {
      console.error('Error updating vendor:', error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="vendor-Add-container">
        <div className="vendor-main-container">
          <h2 style={{fontSize:"2rem",fontWeight:"bold",marginBottom:"8px"}}>View Vendors</h2>
          <input
            type="search"
            placeholder="Search By Vendor Name"
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
                    <button className='btn btn-info' onClick={() => handleEditVendor(vendor)}>Edit</button>
                    {/* <button className='btn btn-danger'>Save</button> */}
                    <button className='btn btn-success' onClick={() => handleDelete(vendor._id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Edit Vendor</h2>
            <input
              type="text"
              value={editedVendor.vender_Name}
              onChange={(e) => setEditedVendor({ ...editedVendor, vender_Name: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={editedVendor.company_Name}
              onChange={(e) => setEditedVendor({ ...editedVendor, company_Name: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <textarea
              value={editedVendor.GST_No}
              onChange={(e) => setEditedVendor({ ...editedVendor, GST_No: e.target.value })}
              rows="4"
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={editedVendor.vender_Mobile}
              onChange={(e) => setEditedVendor({ ...editedVendor, vender_Mobile: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={editedVendor.Vender_Email}
              onChange={(e) => setEditedVendor({ ...editedVendor, Vender_Email: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={editedVendor.address}
              onChange={(e) => setEditedVendor({ ...editedVendor, address: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 ml-2 bg-red-500 text-white rounded">Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewVendor;
