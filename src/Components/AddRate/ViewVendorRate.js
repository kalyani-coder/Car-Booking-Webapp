import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import './ViewCustomerRate.css';

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
        const response = await fetch('https://carbookingbackend.onrender.com/api/vender-rate');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomerRates(data);
        setFilteredCustomerRates(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data: ' + error.message);
      }
    };

    fetchCustomerRates();
  }, []);

  useEffect(() => {
    // Check if there's an edited item in localStorage and set it to state
    const storedEditedItem = JSON.parse(localStorage.getItem('editedItem'));
    if (storedEditedItem) {
      setEditedItem(storedEditedItem);
      setIsEditing(true);
    }
  }, []);

  const filterCustomerRates = () => {
    const filteredData = customerRates.filter((customerRate) => {
      const vendorNameMatches =
        customerRate.vender_Name &&
        customerRate.vender_Name.toLowerCase().includes(searchQuery.toLowerCase());

      return vendorNameMatches;
    });

    setFilteredCustomerRates(filteredData);
  };

  const handleEdit = (editedItem) => {
    setEditedItem(editedItem);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://carbookingbackend.onrender.com/api/vender-rate/${editedItem._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedItem),
      });
  
      if (response.ok) {
        setCustomerRates((prevRates) =>
          prevRates.map((customerRate) => (customerRate._id === editedItem._id ? editedItem : customerRate))
        );
        setIsEditing(false);
  
        // Remove the edited item from localStorage
        localStorage.removeItem('editedItem');
        alert('Vendor rate updated successfully');
      } else {
        console.error('Error updating vendor rate:', response.status);
        alert('Error updating vendor rate. Please try again.');
      }
    } catch (error) {
      console.error('Error updating vendor rate:', error);
      setError('Error updating vendor rate: ' + error.message);
      alert('Error updating vendor rate. Please try again.');
    }
  };
  

  const handleCancelEdit = () => {
    setEditedItem(null);
    setIsEditing(false);

    // Remove the edited item from localStorage
    localStorage.removeItem('editedItem');
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this vendor rate?');
    try {
      const response = await fetch(`https://carbookingbackend.onrender.com/api/vender-rate/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setCustomerRates((prevRates) => prevRates.filter((customerRate) => customerRate._id !== id));
      alert('Vendor rate deleted successfully');
    } catch (error) {
      console.error('Error deleting vendor rate:', error);
      setError('Error deleting vendor rate: ' + error.message);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px' }}>View Vendor Rate</h2>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Vendor Name "
              className="w-full p-2 rounded border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {isEditing && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded shadow-lg w-96 overflow-y-auto max-h-[80vh]">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold">Edit Vendor Rate</h2>
                  <button onClick={handleCancelEdit} className="close-icon">
                    <FaTimes />
                  </button>
                </div>
                
                <h5>Company Name</h5>
                <input
                  type="text"
                  value={editedItem.company_Name}
                  onChange={(e) => setEditedItem({ ...editedItem, company_Name: e.target.company_Name })}
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />


                <h5>Vender Name</h5>
                <input
                  type="text"
                  value={editedItem.vender_Name}
                  onChange={(e) => setEditedItem({ ...editedItem, vender_Name: e.target.vender_Name })}
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <h5>GST_No</h5>
                <input
                  type="text"
                  value={editedItem.GST_No}
                  onChange={(e) => setEditedItem({ ...editedItem, GST_No: e.target.GST_No })}
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />

                <h5>Mobile Number</h5>
                <input
                  type="text"
                  value={editedItem.mobile_Number}
                  onChange={(e) => setEditedItem({ ...editedItem, mobile_Number: e.target.mobile_Number })}
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />

                <h5>rate_per_Km</h5>
                <input
                  type="text"
                  value={editedItem.rate_per_Km}
                  onChange={(e) => setEditedItem({ ...editedItem, rate_per_Km: e.target.rate_per_Km })}
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />

                
              <h5>Duty Type</h5>
                <input
                  type="text"
                  id="title"
                  value={editedItem?.title || ''}
                  onChange={(e) => setEditedItem((prev) => ({ ...prev, title: e.target.title }))}
                  className="form-control"
                />
             

                <h5>rate</h5>
                <input
                  type="text"
                  value={editedItem.rate}
                  onChange={(e) => setEditedItem({ ...editedItem, rate: e.target.rate })}
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <h5>KM</h5>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="km"
                      name="km"
                      placeholder="km"
                      value={editedItem?.km || ''}
                  onChange={(e) => setEditedItem((prev) => ({ ...prev, km: e.target.km }))}
                      required
                    />
                    <h5>Extra KM</h5>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="extra_km"
                      name="extra_km"
                      placeholder="extrakm"
                      value={editedItem?.extra_km || ''}
                      onChange={(e) => setEditedItem((prev) => ({ ...prev, extra_km: e.target.extra_km }))}
                      required
                    />
                    <h5> Hour</h5>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="hour"
                      name="hour"
                      placeholder="hour"
                      value={editedItem?.hour || ''}
                      onChange={(e) => setEditedItem((prev) => ({ ...prev, hour: e.target.hour }))}
                      required
                    />

                     <h5>Extra Hour</h5>
                    <input
                      className="rate-form-control"
                      type="number"
                      id="extra_hour"
                      name="extra_hour"
                      placeholder="Extra Hour"
                      value={editedItem?.extra_hour || ''}
                      onChange={(e) => setEditedItem((prev) => ({ ...prev, extra_hour: e.target.extra_hour }))}
                      required
                    />

                <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 ml-2 bg-red-500 text-white rounded"
                >
                  Cancel
                </button>
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
                    <th>Vendor Name</th>
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
                      <td>{customerRate.rate_per_Km}</td>
                      <td>{customerRate.title}</td>
                      <td>{customerRate.rate}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => handleEdit(customerRate._id)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(customerRate._id)}
                        >
                          <FaTrash />
                        </button>
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
