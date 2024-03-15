import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import './IndivisualCustomer.css';

const IndivisualCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [editedCustomer, setEditedCustomer] = useState(null);

  useEffect(() => {
    // Fetch data from the new API endpoint when the component mounts
    fetch('https://carbookingbackend.onrender.com/api/indivisual-customer')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (customerId) => {
    const confirmed = window.confirm('Are you sure you want to delete this individual customer?');
  
    if (confirmed) {
      try {
        // Send a DELETE request to delete the customer
        fetch(`https://carbookingbackend.onrender.com/api/indivisual-customer/${customerId}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log('Customer deleted successfully:', data);
            // Remove the deleted customer from the state
            setCustomers((prevCustomers) =>
              prevCustomers.filter((customer) => customer._id !== customerId)
            );
            alert('Customer deleted successfully');
          })
          .catch((error) => {
            console.error('Error deleting customer:', error);
            alert(`Error deleting customer: ${error.message}`);
          });
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('Error deleting customer:', error);
        alert('Error deleting customer. Please try again.');
      }
    }
  };
  

  const handleEdit = (customer) => {
    // Set the customer to be edited in the state
    setEditedCustomer(customer);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`https://carbookingbackend.onrender.com/api/indivisual-customer/${editedCustomer._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedCustomer),
      });

      if (response.ok) {
        // Update the local state with the edited customer
        setCustomers(prevCustomers =>
          prevCustomers.map(customer =>
            customer._id === editedCustomer._id ? editedCustomer : customer
          )
        );
        // Clear the editedCustomer state
        setEditedCustomer(null);
        alert('Indivisual Customer updated successfully');
      } else {
        console.error('Error updating customer:', response.status);
        alert('Error updating customer. Please try again.');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Error updating customer. Please try again.');
    }
  };

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>View Indivisual Customer</h2>

          <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              Customers List
            </a>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link className="dropdown-item" to='/viewcompanyrate'>
                  View Company Rate
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to='/viewcorporatecustomer'>
                  View Corporate Customers
                </Link>
              </li>
            </ul>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Company Name</th>
                <th>GST No</th>
                <th>Mobile</th>
                {/* <th>Email</th>
                <th>Address</th> */}
                <th>Type of Vehicle</th>
                {/* <th>View More</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer._id}>
                  <td>{customer.Cus_name}</td>
                  <td>{customer.company_name}</td>
                  <td>{customer.gst_no}</td>
                  <td>{customer.Cus_Mobile}</td>
                  {/* <td>{customer.Cus_Email}</td>
                  <td>{customer.address}</td> */}
                  <td>{customer.type_of_vehicle}</td>

                  {/* <td>
                    <button className='btn btn-secondary'>View More</button>
                  </td> */}
                  <td>
                    {editedCustomer && editedCustomer._id === customer._id ? (
                      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded shadow-lg w-96" style={{
                              width: "40%",
                              height: "80vh",
                              overflowY: "scroll",
                            }}>
                          {/* <h1 className='fw-bold text-center'>Indivisual Customers List</h1> */}
                          <div className="form-container">
                          <div className="flex justify-between items-center mb-2">
                          <h2 className="text-2xl font-bold">Edit Indivisual Customer</h2>
                          </div>
                          <h5 className='fw-bold my-2'>Customer Name:</h5>
                          <input
                            type="text"
                            value={editedCustomer.Cus_name}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, Cus_name: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                          <h5 className='fw-bold my-2'>Company Name:</h5>
                          <input
                            type="text"
                            value={editedCustomer.company_name}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, company_name: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                          <h5 className='fw-bold my-2'>GST No:</h5>
                          <input
                            type="text"
                            value={editedCustomer.gst_no}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, gst_no: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                          <h5 className='fw-bold my-2'>Customer Mobile:</h5>
                          <input
                            type="text"
                            value={editedCustomer.Cus_Mobile}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, Cus_Mobile: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                         
                         
                           <h5 className='fw-bold my-2'>Rate Per KM:</h5>
                          <input
                            type="text"
                            value={editedCustomer.rate_per_km}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, rate_per_km: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                           <h5 className='fw-bold my-2'>Duty Type</h5>
                          <input
                            type="text"
                            value={editedCustomer.duty_type}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, duty_type: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                           <h5 className='fw-bold my-2'>Rate:</h5>
                          <input
                            type="text"
                            value={editedCustomer.rate}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, rate: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                           <h5 className='fw-bold my-2'>KM:</h5>
                          <input
                            type="text"
                            value={editedCustomer.km}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, km: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                           <h5 className='fw-bold my-2'>Extra KM:</h5>
                          <input
                            type="text"
                            value={editedCustomer.extra_km}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, extra_km: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                           <h5 className='fw-bold my-2'>Hours</h5>
                          <input
                            type="text"
                            value={editedCustomer.hours}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, hours: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                           <h5 className='fw-bold my-2'>Extra Hours</h5>
                          <input
                            type="text"
                            value={editedCustomer.extra_hours}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, extra_hours: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                         
                          <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                          <button onClick={() => setEditedCustomer(null)} className="px-4 py-2 ml-2 bg-red-500 text-white rounded">Cancel</button>
                        </div>
                      </div>
                      </div>
                    ) : (
                      <>
                        <button className='btn btn-info' onClick={() => handleEdit(customer)}>
                          <FaEdit />
                        </button>
                        <button className='btn btn-danger' onClick={() => handleDelete(customer._id)}>
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default IndivisualCustomers;





