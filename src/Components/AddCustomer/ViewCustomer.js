import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar'; // Make sure the path is correct
import './ViewCustomer.css'; // Make sure you have a CSS file for this component

const ViewCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({});

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/add-customers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data);
        setFilteredCustomers(data); // Initialize filtered data with all customers
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data: ' + error.message);
      }
    };

    fetchCustomers();
  }, []);

  const filterCustomers = () => {
    const filteredData = customers.filter((customer) => {
      const customerNameMatches = customer.Cus_name.toLowerCase().includes(searchQuery.toLowerCase());
      const companyNameMatches = customer.company_name.toLowerCase().includes(searchQuery.toLowerCase());
      return customerNameMatches || companyNameMatches;
    });

    setFilteredCustomers(filteredData);
  };

  useEffect(() => {
    filterCustomers();
  }, [searchQuery]);

  const deleteCustomer = async (customerId) => {
    const confirmed = window.confirm("Are you sure you want to delete this customer?");
    if (confirmed) {
      try {
        const response = await fetch(`https://carbooking-backend-fo78.onrender.com/api/add-customers/${customerId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setFilteredCustomers((prevCustomers) => prevCustomers.filter((customer) => customer._id !== customerId));
        alert('Customer deleted successfully');
      } catch (error) {
        console.error('Error deleting customer:', error);
        setError('Error deleting customer: ' + error.message);
      }
    }
  };

  const handleEditCustomer = (customer) => {
    setEditedCustomer(customer);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://carbooking-backend-fo78.onrender.com/api/add-customers/${editedCustomer._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedCustomer),
      });

      if (response.ok) {
        setCustomers(prevCustomers =>
          prevCustomers.map(customer =>
            customer._id === editedCustomer._id ? editedCustomer : customer
          )
        );
        setIsEditing(false);
      } else {
        console.error('Error updating customer:', response.status);
      }
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>View Customer</h2>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Customer Name / Company Name"
              className="w-full p-2 rounded border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid-view">
            {filteredCustomers.length === 0 ? (
              <p>No results found.</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {filteredCustomers.map((customer) => (
                  <div key={customer._id} className="custom-card bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="custom-card-body p-4">
                      <h5 className="font-semibold ">Customer Name: {customer.Cus_name}</h5>
                      <p className="custom-card-subtitle mb-2">Company Name: {customer.company_name}</p>
                      <p className="custom-card-subtitle mb-2">GST No: {customer.gst_no}</p>
                      <p className="custom-card-subtitle mb-2">Mobile: {customer.Cus_Mobile}</p>
                      <p className="custom-card-subtitle mb-2">Email: {customer.Cus_Email}</p>
                      <p className="custom-card-subtitle mb-2">Address: {customer.address}</p>
                      <div className="flex justify-between">
                        <button className='btn btn-info' onClick={() => handleEditCustomer(customer)}>Edit</button>
                        {/* <button className='btn btn-danger'>Save</button> */}
                        <button className='btn btn-danger' onClick={() => deleteCustomer(customer._id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Edit Customer</h2>
            <h5 className='fw-bold'>Customer Name</h5>
            <input
              type="text"
              value={editedCustomer.Cus_name}
              onChange={(e) => setEditedCustomer({ ...editedCustomer, Cus_name: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <h5 className='fw-bold'>Company Name</h5>
            <input
              type="text"
              value={editedCustomer.company_name}
              onChange={(e) => setEditedCustomer({ ...editedCustomer, company_name: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <h5 className='fw-bold'>GST No </h5>
            <input
              type="text"
              value={editedCustomer.gst_no}
              onChange={(e) => setEditedCustomer({ ...editedCustomer, gst_no: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <h5 className='fw-bold'>Customer Mobile</h5>
             <input
              type="text"
              value={editedCustomer.Cus_Mobile}
              onChange={(e) => setEditedCustomer({ ...editedCustomer, Cus_Mobile: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <h5 className='fw-bold'>Customer Email</h5>
             <input
              type="text"
              value={editedCustomer.Cus_Email}
              onChange={(e) => setEditedCustomer({ ...editedCustomer, Cus_Email: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <h5 className='fw-bold'>Address</h5>
             <input
              type="text"
              value={editedCustomer.address}
              onChange={(e) => setEditedCustomer({ ...editedCustomer, address: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            {/* <textarea
              value={editedCustomer.company_name}
              onChange={(e) => setEditedCustomer({ ...editedCustomer, company_name: e.target.value })}
              rows="4"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            /> */}
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 ml-2 bg-red-500 text-white rounded">Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewCustomer;
