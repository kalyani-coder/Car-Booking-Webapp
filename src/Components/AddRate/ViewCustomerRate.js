import React, { useState, useEffect } from 'react';
import "./ViewCustomerRate.css";
import Sidebar from '../Sidebar/Sidebar';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const ViewCustomerRate = () => {
  const [customerRates, setCustomerRates] = useState([]);
  const [filteredCustomerRates, setFilteredCustomerRates] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomerRate, setEditedCustomerRate] = useState({});

  useEffect(() => {
    const fetchCustomerRates = async () => {
      try {
        const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/customer-rate');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomerRates(data);
        setFilteredCustomerRates(data); // Initialize filtered data with all customer rates
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data: ' + error.message);
      }
    };

    fetchCustomerRates();
  }, []);

  const filterCustomerRates = () => {
    const filteredData = customerRates.filter((customerRate) => {
      const customerNameMatches = customerRate.customer_Name && customerRate.customer_Name.toLowerCase().includes(searchQuery.toLowerCase());
      // Check if customerRate.customer_Name is defined before using toLowerCase

      // Add more criteria as needed
      return customerNameMatches;
    });

    setFilteredCustomerRates(filteredData);
  };

  useEffect(() => {
    filterCustomerRates();
  }, [searchQuery, customerRates]);

  const handleEditCustomerRate = (customerRate) => {
    setEditedCustomerRate(customerRate);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://carbooking-backend-fo78.onrender.com/api/customer-rate/${editedCustomerRate._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedCustomerRate),
      });

      if (response.ok) {
        setCustomerRates(prevCustomerRates =>
          prevCustomerRates.map(customerRate =>
            customerRate._id === editedCustomerRate._id ? editedCustomerRate : customerRate
          )
        );
        setIsEditing(false);
      } else {
        console.error('Error updating customer rate:', response.status);
      }
    } catch (error) {
      console.error('Error updating customer rate:', error);
    }
  };

  const deleteCustomerRate = async (customerRateId) => {
    const confirmed = window.confirm("Are you sure you want to delete this corporate customer?");
    try {
      const response = await fetch(`https://carbooking-backend-fo78.onrender.com/api/customer-rate/${customerRateId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setCustomerRates((prevCustomerRates) => prevCustomerRates.filter((customerRate) => customerRate._id !== customerRateId));
      alert('Corporate customer deleted successfully');
    } catch (error) {
      console.error('Error deleting corporate customer:', error);
      setError('Error deleting corporate customer: ' + error.message);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>View Customer List</h2>


          <div class="dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              Customers List
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link class="dropdown-item"
                   to='/viewcorporatecustomer'>Corporate Customers
                  
                  </Link>
                </li>
              <li>
              <Link class="dropdown-item"
                   to='/indivisualcustomers'>Indivisual Customers 
                  
                  </Link>
                {/* <a class="dropdown-item" href="#">Another action</a> */}
                </li>
              {/* <li><a class="dropdown-item" href="#">Something else here</a></li> */}
            </ul>
          </div>

        

          <div className="table-view">
            {filteredCustomerRates.length === 0 ? (
              <p></p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Customer Name</th>
                    <th>GST No</th>
                    <th>Mobile Number</th>
                    <th>Rate Per KM</th>
                    <th>Title</th>
                    <th>Type Of Vehicle</th>
                    <th>Duty Type</th>
                    <th>Rate</th>
                    <th>KM</th>
                    <th>Extra KM</th>
                    <th>Hour</th>
                    <th>Extra Hour</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomerRates.map((customerRate) => (
                    <tr key={customerRate._id}>
                      <td>{customerRate.company_Name}</td>
                      <td>{customerRate.customer_Name}</td>
                      <td>{customerRate.GST_No}</td>
                      <td>{customerRate.mobile_Number}</td>
                      <td>{customerRate.rate_per_km}</td>
                      <td>{customerRate.type_of_vehicle}</td>
                      <td>{customerRate.rate_per_km}</td>
                      <td>{customerRate.duty_type}</td>
                      <td>{customerRate.rate}</td>
                      <td>{customerRate.km}</td>
                      <td>{customerRate.extra_km}</td>
                      <td>{customerRate.hours}</td>
                      <td>{customerRate.extra_hours}</td>
                      <td>
                        <button className='btn btn-info' onClick={() => handleEditCustomerRate(customerRate)}>
                          <FaEdit />
                        </button>
                        <button className='btn btn-danger' onClick={() => deleteCustomerRate(customerRate._id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold">Edit Corporate Customer Rate</h2>
              <button onClick={() => setIsEditing(false)} className="close-icon">
                <FaTimes />
              </button>
            </div>
            <h5 className='fw-bold'>Company Name</h5>
            <input
              type="text"
              value={editedCustomerRate.company_Name}
              onChange={(e) => setEditedCustomerRate({ ...editedCustomerRate, company_Name: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <h5 className='fw-bold'>Customer Name</h5>
            <input
              type="text"
              value={editedCustomerRate.customer_Name}
              onChange={(e) => setEditedCustomerRate({ ...editedCustomerRate, customer_Name: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <h5 className='fw-bold'>GST No</h5>
            <input
              type="text"
              value={editedCustomerRate.GST_No}
              onChange={(e) => setEditedCustomerRate({ ...editedCustomerRate, GST_No: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <h5 className='fw-bold'>Mobile Namer</h5>
            <input
              type="text"
              value={editedCustomerRate.mobile_Number}
              onChange={(e) => setEditedCustomerRate({ ...editedCustomerRate, mobile_Number: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <h5 className='fw-bold'>Rate Per Km</h5>
            <input
              type="text"
              value={editedCustomerRate.rate_per_km}
              onChange={(e) => setEditedCustomerRate({ ...editedCustomerRate, rate_per_km: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <h5 className='fw-bold'>Duty Type</h5>
            <input
              type="text"
              value={editedCustomerRate.title}
              onChange={(e) => setEditedCustomerRate({ ...editedCustomerRate, title: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <h5 className='fw-bold'>Rate</h5>
            <input
              type="text"
              value={editedCustomerRate.rate}
              onChange={(e) => setEditedCustomerRate({ ...editedCustomerRate, rate: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 ml-2 bg-red-500 text-white rounded">Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewCustomerRate;
