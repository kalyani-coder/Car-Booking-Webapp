import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const ViewUpdateDuty = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/update-duty');
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
          <div className="grid grid-cols-2 gap-4">
            {error ? (
              <p>Error: {error}</p>
            ) : (
              <>
                {filteredCustomers.map((customer) => (
                  <div key={customer._id} className="custom-card bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="custom-card-body p-4">
                      <h5 className="custom-card font-semibold ">Company Name: {customer.companyname}</h5>
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
                      <div className="flex justify-between">
                        

                        <button className='btn btn-info'>Edit</button>
                        <button className='btn btn-danger'>Save</button>
                        <button className='btn btn-success'>Delete</button>
                     
                      </div>
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
