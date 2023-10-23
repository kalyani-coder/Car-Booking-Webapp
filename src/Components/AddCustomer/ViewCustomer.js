import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './ViewCustomer.css'; // Make sure you have a CSS file for this component

const ViewCustomer = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/add-customers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h1>Customers</h1>
          {customers.map(customer => (
            <div key={customer._id} className="custom-card">
              <div className="custom-card-body">
                <h5 className="custom-card-title">Customer Name: {customer.customer_Name}</h5>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Company Name: {customer.company_Name}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  GST No: {customer.GST_No}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Mobile: {customer.customer_Mobile}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Email: {customer.customer_Email}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Address: {customer.address}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewCustomer;
