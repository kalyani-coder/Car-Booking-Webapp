import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
const YourComponent = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('http://localhost:7000/api/corporate-customer')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEditCustomer = (customer) => {
    // Handle edit logic here
    console.log('Edit customer:', customer);
  };

  const deleteCustomer = (customerId) => {
    // Handle delete logic here
    console.log('Delete customer with ID:', customerId);
  };

  return (
    <>  
    <Sidebar />
    <div className="customer-Add-container">
        <div className="customer-main-container">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>View Corporate Customer</h2>

          <div class="dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              Customers List
            </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link class="dropdown-item"
                   to='/viewcompanyrate'>View Company Rate
                  
                  </Link>
                </li>
              <li>
              <Link class="dropdown-item"
                   to='/indivisualcustomers'>Indivisual Customers 
                  
                  </Link>
                </li>
            </ul>
          </div>




      <table className="table">
      <thead>
        <tr>
          <th>Customer Type</th>
          <th>Customer Name</th>
          <th>Company Name</th>
          <th>GST No</th>
          <th>Mobile</th>
          <th>Email</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer._id}>
            <td>{customer.Cus_type}</td>
            <td>{customer.Cus_name}</td>
            <td>{customer.company_name}</td>
            <td>{customer.gst_no}</td>
            <td>{customer.Cus_Mobile}</td>
            <td>{customer.Cus_Email}</td>
            <td>{customer.address}</td>
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

    </div>
    </div>
    </>

  );
};

export default YourComponent;
