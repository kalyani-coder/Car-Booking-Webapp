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
          {customers.map((customer) => (
            <div key={customer._id} className="custom-card">
              <div className="custom-card-body">
                <h5 className="custom-card-title">Customer Name: {customer.Cus_name}</h5>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Company Name: {customer.company_name}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  GST No: {customer.gst_no}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Mobile: {customer.Cus_Mobile}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Email: {customer.Cus_Email} {/* Corrected field name */}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Address: {customer.address} {/* Corrected field name */}
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
