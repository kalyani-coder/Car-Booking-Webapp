import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';


const ViewCorporateCustomr = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('http://localhost:7000/api/corporate-customer')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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
                {/* <a class="dropdown-item" href="#">Corporate Customers</a> */}
                </li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>



          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>GST No</th>
                {/* Add more table headers based on your API schema */}
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer._id}>
                  <td>{customer.Cus_name}</td>
                  <td>{customer.company_name}</td>
                  <td>{customer.gst_no}</td>
                  {/* Add more table cells based on your API schema */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ViewCorporateCustomr;
