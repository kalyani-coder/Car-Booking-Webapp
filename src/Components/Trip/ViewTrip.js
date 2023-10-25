import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar';

const ViewTrip = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/add-trip');
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
          <h1>View Trip</h1>
          {customers.map((customer) => (
            <div key={customer._id} className="custom-card">
              <div className="custom-card-body">
                <h5 className="custom-card-title">Customer Name: {customer.customername}</h5>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Mobile No: {customer.mobileno}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Email: {customer.email}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Address: {customer.address}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Trip Type: {customer.triptype} {/* Corrected field name */}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Sub Type: {customer.triptype} {/* Corrected field name */}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Pickup Location : {customer.pickup} {/* Corrected field name */}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Date: {customer.date}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Time: {customer.time} {/* Corrected field name */}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Drop Off Location: {customer.dropoff}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Date: {customer.date1}
                </h6>
              
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Time : {customer.time1} {/* Corrected field name */}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Total Days: {customer.totaldays}
                </h6>
              
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Hours : {customer.hours} {/* Corrected field name */}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Vehicle : {customer.vehicle} {/* Corrected field name */}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewTrip;
