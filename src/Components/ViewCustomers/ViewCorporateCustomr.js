import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash} from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import './IndivisualCustomer.css';

const CorporateCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [editedCustomer, setEditedCustomer] = useState(null);


  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('http://localhost:7000/api/corporate-customer')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (customerId) => {
    // Send a DELETE request to delete the customer
    fetch(`http://localhost:7000/api/corporate-customer/${customerId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Customer deleted successfully:', data);
        // Remove the deleted customer from the state
        setCustomers(prevCustomers => prevCustomers.filter(customer => customer._id !== customerId));
      })
      .catch(error => console.error('Error deleting customer:', error));
  };

  

  const handleEdit = (customer) => {
    // Set the customer to be edited in the state
    setEditedCustomer(customer);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:7000/api/corporate-customer/${editedCustomer._id}`, {
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
      } else {
        console.error('Error updating customer:', response.status);
      }
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>View Corporate Customer</h2>

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
                <Link className="dropdown-item" to='/indivisualcustomers'>
                  Individual Customers
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
                  <td>{customer.Cus_Type}</td>
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
                      <div className="modal-bg">
                        <div className="modal-content">
                        <h1 className='fw-bold text-center'>Corporate Customers List</h1>
                          <h2>Edit Customer</h2>
                          <h5 className='fw-bold'>Customer Name</h5>
                          <input
                            type="text"
                            value={editedCustomer.Cus_name}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, Cus_name: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                          <h5 className='fw-bold'>Company Name</h5>
                          <input
                            type="text"
                            value={editedCustomer.company_name}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, company_name: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                          <h5 className='fw-bold'>GST No </h5>
                          <input
                            type="text"
                            value={editedCustomer.gst_no}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, gst_no: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                          <h5 className='fw-bold'>Customer Mobile</h5>
                          <input
                            type="text"
                            value={editedCustomer.Cus_Mobile}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, Cus_Mobile: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                          <h5 className='fw-bold'>Type of Vehicle</h5>
                          <input
                            type="text"
                            value={editedCustomer.type_of_vehicle}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, type_of_vehicle: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                          <h5 className='fw-bold'>rate_per_km</h5>
                          <input
                            type="text"
                            value={editedCustomer.rate_per_km}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, rate_per_km: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                           <h5 className='fw-bold'>duty_type</h5>
                          <input
                            type="text"
                            value={editedCustomer.duty_type}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, duty_type: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                           <h5 className='fw-bold'>rate</h5>
                          <input
                            type="text"
                            value={editedCustomer.rate}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, rate: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                           <h5 className='fw-bold'>km</h5>
                          <input
                            type="text"
                            value={editedCustomer.km}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, km: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                           <h5 className='fw-bold'>extra_km</h5>
                          <input
                            type="text"
                            value={editedCustomer.extra_km}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, extra_km: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />
                           <h5 className='fw-bold'>hours</h5>
                          <input
                            type="text"
                            value={editedCustomer.hours}
                            onChange={(e) => setEditedCustomer({ ...editedCustomer, hours: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                          />

                           <h5 className='fw-bold'>extra_hours</h5>
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

export default CorporateCustomers;
