import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const ViewCustomerInquiry = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [searchCustomerName, setSearchCustomerName] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/customer-enquiry');
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
        <h2 style={{fontSize:"2rem",fontWeight:"bold",marginBottom:"8px"}}>View Customer Inquries</h2>
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
                      <h5 className="custom-card-title text-lg font-semibold mb-2">Customer Name: {customer.customer_name}</h5>
                      <p className="custom-card-subtitle mb-2">Mobile: {customer.mobileno}</p>
                      <p className="custom-card-subtitle mb-2">Email: {customer.email}</p>
                      <p className="custom-card-subtitle mb-2">Trip Type: {customer.tripe_type}</p>
                      <p className="custom-card-subtitle mb-2">Sub Type: {customer.sub_type}</p>
                      <p className="custom-card-subtitle mb-2">Pickup Location: {customer.pic_up}</p>
                      <p className="custom-card-subtitle mb-2">Date: {customer.date}</p>
                      <p className="custom-card-subtitle mb-2">Time: {customer.time}</p>
                      <p className="custom-card-subtitle mb-2">Drop Off Location: {customer.drop_of}</p>
                      <p className="custom-card-subtitle mb-2">Date: {customer.date1}</p>
                      <p className="custom-card-subtitle mb-2">Days: {customer.days}</p>
                      <p className="custom-card-subtitle mb-2">Hours: {customer.hours}</p>
                      <p className="custom-card-subtitle mb-2">Vehicle: {customer.vehicle}</p>
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

export default ViewCustomerInquiry;
