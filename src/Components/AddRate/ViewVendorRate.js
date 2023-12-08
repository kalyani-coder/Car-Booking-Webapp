import React, { useState, useEffect } from 'react';
import "./ViewCustomerRate.css";
import Sidebar from '../Sidebar/Sidebar';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const ViewVenderRate = () => {
  const [customerRates, setCustomerRates] = useState([]);
  const [filteredCustomerRates, setFilteredCustomerRates] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
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
    const vendorNameMatches =
      customerRate.vender_Name &&
      customerRate.vender_Name.toLowerCase().includes(searchQuery.toLowerCase());
    // Check if customerRate.vender_Name is defined before using toLowerCase

    // Add more criteria as needed
    return vendorNameMatches;
  });

  setFilteredCustomerRates(filteredData);
};

const handleEdit = (_id) => {
  const itemToEdit = customerRates.find((customerRate) => customerRate._id === _id);
  setEditedItem(itemToEdit);
};

const handleSave = async () => {
  // Implement your save logic here
  console.log('Saving edited item:', editedItem);

  // Assuming you have an endpoint for updating a vendor rate
  const response = await fetch(`https://carbooking-backend-fo78.onrender.com/api/vender-rate/${editedItem._id}`, {
    method: 'PUT', // Use the appropriate HTTP method for updating
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedItem),
  });

  if (response.ok) {
    // Update the state after successful save
    setCustomerRates((prevRates) =>
      prevRates.map((rate) => (rate._id === editedItem._id ? editedItem : rate))
    );
    setEditedItem(null); // Reset edited item state
  } else {
    console.error('Error saving data:', response.statusText);
    setError('Error saving data');
  }
};

const handleDelete = async (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this vendor?");
  try {
    // Assuming you have an endpoint for deleting a vendor rate
    const response = await fetch(`https://carbooking-backend-fo78.onrender.com/api/vender-rate/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Remove the deleted item from the state
    setCustomerRates((prevRates) => prevRates.filter((customerRate) => customerRate._id !== id));
    alert('vendor deleted successfully');
  } catch (error) {
    console.error('Error deleting vendor:', error);
    setError('Error deleting vendor: ' + error.message);
  }
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
          {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-96">
          <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">Edit Vendor Rate</h2>
        <button onClick={() => setIsEditing(false)} className="close-icon">
          <FaTimes />
        </button>
      </div>

           
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 ml-2 bg-red-500 text-white rounded">Cancel</button>
          </div>
        </div>
      )}

          <div className="table-view">
            {filteredCustomerRates.length === 0 ? (
              <p>No results found.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Vender Name</th>
                    <th>GST No</th>
                    <th>Mobile Number</th>
                    <th>Rate Per KM</th>
                    <th>Title</th>
                    <th>Rate</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomerRates.map((customerRate) => (
                    <tr key={customerRate._id}>
                      <td>{customerRate.company_Name}</td>
                      <td>{customerRate.vender_Name}</td>
                      <td>{customerRate.GST_No}</td>
                      <td>{customerRate.mobile_Number}</td>
                      <td>{customerRate.rate_per_km}</td>
                      <td>{customerRate.title}</td>
                      <td>{customerRate.rate}</td>
                      <td>
                        <button className="btn btn-info" onClick={() => handleEdit(customerRate._id)}><FaEdit /></button>
                        <button className="btn btn-danger" onClick={() => handleDelete(customerRate._id)}><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewVenderRate;

