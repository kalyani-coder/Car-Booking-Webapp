import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { FaEdit, FaTrash,FaTimes  } from 'react-icons/fa'; // Import icons


const TableView = ({ customers, handleEditCustomer, deleteCustomer }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Customer Name</th>
        <th>Mobile No.</th>
        <th>Email</th>
        <th>Address</th>
        <th>Trip Type</th>
        <th>Sub Type</th>
        <th>Pickup Location</th>
        <th>Date 1</th>
        <th>Time 1</th>
        <th>Dropoff Location</th>
        <th>Date</th>
        <th>Time</th>
        <th>Days</th>
        <th>Hours</th>
        <th>Vehicle</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {customers.map((customer) => (
        <tr key={customer._id}>
          <td>{customer.customer_name}</td>
          <td>{customer.mobileno}</td>
          <td>{customer.email}</td>
          <td>{customer.address}</td>
          <td>{customer.tripe_type}</td>
          <td>{customer.sub_type}</td>
          <td>{customer.pic_up}</td>
          <td>{customer.date1}</td>
          <td>{customer.time}</td>
          <td>{customer.drop_of}</td>
          <td>{customer.date}</td>
          <td>{customer.time}</td>
          <td>{customer.days}</td>
          <td>{customer.hours}</td>
          <td>{customer.vehicle}</td>
          <td>
            <button className='btn btn-info' onClick={() => handleEditCustomer(customer)}>
            <FaEdit />
            </button>
            <button className='btn btn-danger' onClick={() => deleteCustomer(customer._id)}>
            <FaTrash />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const ViewCustomerEnquiry = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [searchCustomerName, setSearchCustomerName] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/customer-enquiry');
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

  const handleEdit = (customerId) => {
    console.log(`Editing customer with ID: ${customerId}`);
    // Implement your edit logic here
  };

  const handleDelete = (customerId) => {
    console.log(`Deleting customer with ID: ${customerId}`);
    // Implement your delete logic here
  };
  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>View Customer Enquiry</h2>
          <div className="search-bar p-4 space-y-4">
            <input
              type="text"
              placeholder="Search by Customer Name"
              className="w-full p-2 rounded border"
              value={searchCustomerName}
              onChange={(e) => setSearchCustomerName(e.target.value)}
            />
          </div>
          <div className="table-responsive">
            <TableView customers={filteredCustomers} handleEditCustomer={handleEdit} deleteCustomer={handleDelete} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCustomerEnquiry;