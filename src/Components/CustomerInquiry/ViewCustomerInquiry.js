import React,{ useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar';

const ViewCustomerInquiry = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/customer-enquiry');
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
                <h5 className="custom-card-title">Customer Name: {customer.customer_name}</h5>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Mobile: {customer.mobileno}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Email: {customer.email} {/* Corrected field name */}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Trip Type: {customer.tripe_type}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Sub Type: {customer.sub_type}
                </h6>
              
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Pickup Location : {customer.pic_up} {/* Corrected field name */}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Date: {customer.date}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Time: {customer.time} {/* Corrected field name */}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Drop Off Location: {customer.drop_of}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Date: {customer.date1}
                </h6>
              
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Days : {customer.days} {/* Corrected field name */}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Hours: {customer.hours}
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
};

export default ViewCustomerInquiry;
