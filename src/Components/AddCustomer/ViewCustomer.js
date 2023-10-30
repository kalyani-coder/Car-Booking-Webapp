import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar'; // Make sure the path is correct
import './ViewCustomer.css'; // Make sure you have a CSS file for this component

const ViewCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/add-customers');
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

  // Function to filter customers based on search criteria
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

  // Function to edit a customer (example implementation)
  const editCustomer = (customerId) => {
    // Implement your edit logic here
    console.log(`Edit customer with ID: ${customerId}`);
  };

  // Function to save a customer (example implementation)
  const saveCustomer = (customerId) => {
    // Implement your save logic here
    console.log(`Save customer with ID: ${customerId}`);
  };

  // Function to delete a customer (example implementation)
  const deleteCustomer = (customerId) => {
    // Implement your delete logic here
    console.log(`Delete customer with ID: ${customerId}`);
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
                        {/* <button
                          className="viewcus-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"
                          onClick={() => editCustomer(customer._id)}
                        >
                          Edit
                        </button> */}
                        {/* <button
                          className="viewcus-btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-10 "
                          onClick={() => saveCustomer(customer._id)}
                        >
                          Save
                        </button> */}
                        {/* <button
                          className="viewcus-btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-10"
                          onClick={() => deleteCustomer(customer._id)}
                        >
                          Delete
                        </button> */}
                        {/* <div className='customer-btn mt-5 '> */}

                        <button className='btn btn-info'>Edit</button>
                        <button className='btn btn-danger'>Save</button>
                        <button className='btn btn-success'>Delete</button>
                        {/* </div> */}
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

export default ViewCustomer;
