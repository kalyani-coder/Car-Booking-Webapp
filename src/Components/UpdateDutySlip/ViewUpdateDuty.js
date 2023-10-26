import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const ViewUpdateDuty = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [searchCustomerName, setSearchCustomerName] = useState('');

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

  // Function to filter customer inquiries based on search criteria
  const filterCustomerInquiries = () => {
    const filteredData = customers.filter((customer) => {
      // Check if customer.customer_name is defined before calling toLowerCase()
      if (customer.customer_name) {
        return customer.customer_name.toLowerCase().includes(searchCustomerName.toLowerCase());
      } else {
        return false; // Return false if customer.customer_name is undefined
      }
    });

    setFilteredCustomers(filteredData);
  };

  useEffect(() => {
    filterCustomerInquiries();
  }, [searchCustomerName]);

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h1>View Update Duty Slip</h1>
          <div className="search-bar p-4 space-y-4">
            <input
              type="text"
              placeholder="Search by Customer Name"
              className="w-full p-2 rounded border"
              value={searchCustomerName}
              onChange={(e) => setSearchCustomerName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {error ? (
              <p>Error: {error}</p>
            ) : (
              <>
                {filteredCustomers.map((customer) => (
                  <div key={customer._id} className="custom-card bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="custom-card-body p-4">
                      <h5 className="custom-card-title text-lg font-semibold mb-2">Company Name: {customer.companyname}</h5>
                      <p className="custom-card-subtitle mb-2">GST No: {customer.gstno}</p>
                      <p className="custom-card-subtitle mb-2">Reporting Address: {customer.reportingaddress}</p>
                      <p className="custom-card-subtitle mb-2">Date: {customer.date}</p>
                      <p className="custom-card-subtitle mb-2">Name: {customer.name}</p>
                      <p className="custom-card-subtitle mb-2">Vehicle: {customer.vehicle}</p>
                      <p className="custom-card-subtitle mb-2">Vehicle Number: {customer.vehiclenumber}</p>
                      <p className="custom-card-subtitle mb-2">From: {customer.from}</p>
                      <p className="custom-card-subtitle mb-2">To: {customer.to}</p>
                      <p className="custom-card-subtitle mb-2">Starting KM: {customer.startingkm}</p>
                      <p className="custom-card-subtitle mb-2">Starting Time: {customer.startingtime}</p>
                      <p className="custom-card-subtitle mb-2">Closing KM: {customer.closingkm}</p>
                      <p className="custom-card-subtitle mb-2">Closing Time: {customer.closingtime}</p>
                      <p className="custom-card-subtitle mb-2">Total KM: {customer.totalkm}</p>
                      <p className="custom-card-subtitle mb-2">Total Hour: {customer.totalhour}</p>
                      <p className="custom-card-subtitle mb-2">Title: {customer.title}</p>
                      <p className="custom-card-subtitle mb-2">Amount: {customer.amount}</p>
                      <p className="custom-card-subtitle mb-2">Extra KM: {customer.extrakm}</p>
                      <p className="custom-card-subtitle mb-2">Amount: {customer.amount1}</p>
                      <p className="custom-card-subtitle mb-2">Extra Hour: {customer.extrahour}</p>
                      <p className="custom-card-subtitle mb-2">Amount: {customer.amount2}</p>
                      <p className="custom-card-subtitle mb-2">Total Amount: {customer.totalamount}</p>
                      <p className="custom-card-subtitle mb-2">Advance Amount: {customer.advanceamount}</p>
                      <p className="custom-card-subtitle mb-2">Payment Method: {customer.paymentmethod}</p>
                      {/* Add other fields as needed */}
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

export default ViewUpdateDuty;
