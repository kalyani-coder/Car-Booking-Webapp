import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';

const ViewUpdateDuty = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/update-duty');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data);
        setFilteredCustomers(data); // Initialize filtered data with all customer inquiries
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data: ' + error.message);
      }
    };

    fetchCustomers();
  }, []);

  const handleEdit = (customer) => {
    setEditingCustomer({ ...customer });
  };

  const handleSave = () => {
    // Handle save logic here, for example, make an API request to update the data
    // Once saved, setEditingCustomer to null to exit the editing mode
    setEditingCustomer(null);
  };

  const handleDelete = async (customer) => {
  // Display an alert with customer data before deletion
  const confirmDelete = window.confirm("Do you want to delete the customer?");

  if (confirmDelete) {
    try {
      const response = await fetch(`http://localhost:7000/api/update-duty/${customer._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setFilteredCustomers((prevCustomers) => prevCustomers.filter((c) => c._id !== customer._id));
      alert('Customer deleted successfully');
    } catch (error) {
      console.error('Error deleting customer:', error);
      setError('Error deleting customer: ' + error.message);
    }
  }
};


  // Function to filter customers based on search criteria
  const filterCustomers = () => {
    const filteredData = customers.filter((customer) => {
      const customerNameMatches = customer.name.toLowerCase().includes(searchQuery.toLowerCase());
      const companyNameMatches = customer.companyname.toLowerCase().includes(searchQuery.toLowerCase());
      return customerNameMatches || companyNameMatches;
    });

    setFilteredCustomers(filteredData);
  };

  useEffect(() => {
    filterCustomers();
  }, [searchQuery]);


  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
        <h2 style={{fontSize:"2rem",fontWeight:"bold",marginBottom:"8px"}}>View Duty Slip</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Customer Name / Company Name"
              className="w-full p-2 rounded border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>GST No</th>
                <th>Reporting Address</th>
                <th>Date</th>
                <th>Name</th>
                <th>Vehicle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.companyname}</td>
                  <td>{customer.gstno}</td>
                  <td>{customer.reportingaddress}</td>
                  <td>{customer.date}</td>
                  <td>{customer.name}</td>
                  <td>{customer.vehicle}</td>
                  <td>
                    {editingCustomer && editingCustomer._id === customer._id ? (
                      <>
                        {/* <button className="btn btn-success" onClick={handleSave}>
                          <FaSave />
                        </button> */}
                      </>
                    ) : (
                      <>
                        <button className="btn btn-info" onClick={() => handleEdit(customer)}>
                          <FaEdit />
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(customer)}>
  <FaTrash />
</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* {isEditing && ( */}
          {/* <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"> */}
        {/* <div className="bg-white p-4 rounded shadow-lg w-96"> */}
          {/* <div className="flex justify-between items-center mb-2"> */}
            {/* <h2 className="text-2xl font-bold">Edit Update Duty</h2> */}
            {/* <button onClick={handleFormClose} className="close-icon">
              <FaTimes />
            </button> */}
          {/* </div> */}
          {/* Add input fields for each property in your schema */}
          {/* <h5 className='fw-bold my-2'>Company Name</h5> */}
            {/* <input type="text" name="companyname" value={editingCustomer.companyname} onChange={handleChange} /> */}
          {/* <h5 className='fw-bold my-2'>GST No </h5> */}
            {/* GST No: */}
            {/* <input type="text" name="gstno" value={editingCustomer.gstno} onChange={handleChange} /> */}
          {/* Reporting Address: */}
            {/* <input type="text" name="companyname" value={editingCustomer.reportingaddress} onChange={handleChange} /> */}
          {/* <h5 className='fw-bold my-2'>Date: </h5> */}
            {/* <input type="date" name="date" value={editingCustomer.date} onChange={handleChange} /> */}
            {/* <h5 className='fw-bold my-2'>Name:</h5> */}
            {/* <input type="text" name="companyname" value={editingCustomer.name} onChange={handleChange} /> */}
          {/* Add other input fields as needed */}
          {/* <div className="form-buttons"> */}
            {/* <button type="button" onClick={handleSave}>
              Save
            </button> */}
            {/* <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button> */}
          {/* </div> */}
        {/* </div> */}
      {/* </div> */}
      {/* )} */}
        </div>
      </div>
    </>
  );
};

export default ViewUpdateDuty;
