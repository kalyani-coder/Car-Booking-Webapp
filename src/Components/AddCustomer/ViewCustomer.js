import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './ViewCustomer.css'; // Make sure you have a CSS file for this component

const ViewCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [searchCustomerName, setSearchCustomerName] = useState('');
  const [searchCompanyName, setSearchCompanyName] = useState('');

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
      const customerNameMatches = customer.Cus_name.toLowerCase().includes(searchCustomerName.toLowerCase());
      const companyNameMatches = customer.company_name.toLowerCase().includes(searchCompanyName.toLowerCase());
      return customerNameMatches && companyNameMatches;
    });

    setFilteredCustomers(filteredData);
  };

  useEffect(() => {
    filterCustomers();
  }, [searchCustomerName, searchCompanyName]);

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h1>Customers</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Customer Name"
              value={searchCustomerName}
              onChange={(e) => setSearchCustomerName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Search by Company Name"
              value={searchCompanyName}
              onChange={(e) => setSearchCompanyName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {error ? (
              <p>Error: {error}</p>
            ) : (
              <>
                {filteredCustomers.map((customer) => (
                  <div key={customer._id} className="custom-card bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="custom-card-body p-4">
                      <h5 className="custom-card-title text-lg font-semibold mb-2">Customer Name: {customer.Cus_name}</h5>
                      <p className="custom-card-subtitle mb-2">Company Name: {customer.company_name}</p>
                      <p className="custom-card-subtitle mb-2">GST No: {customer.gst_no}</p>
                      <p className="custom-card-subtitle mb-2">Mobile: {customer.Cus_Mobile}</p>
                      <p className="custom-card-subtitle mb-2">Email: {customer.Cus_Email}</p>
                      <p className="custom-card-subtitle mb-2">Address: {customer.address}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCustomer;
