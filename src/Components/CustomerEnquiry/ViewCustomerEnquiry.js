import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa"; // Import icons

const TableView = ({ customers, handleEditCustomer, deleteCustomer }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Sr No</th>
        <th>Customer Name</th>
        <th>Mobile No.</th>
        <th>Email</th>
        <th>Address</th>
        <th>Trip Type</th>
        <th>Sub Type</th>
        <th>Pickup Location</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {customers.map((customer, index) => (
        <tr key={customer._id}>
          <td>{index + 1}</td>
          <td>{customer.customer_name}</td>
          <td>{customer.mobileno}</td>
          <td>{customer.email}</td>
          <td>{customer.address}</td>
          <td>{customer.tripe_type}</td>
          <td>{customer.sub_type}</td>
          <td>{customer.pic_up}</td>
          <td>
            <>
              <div className="d-flex align-items-center gap-1">
                <button
                  className="btn btn-info"
                  onClick={() => handleEditCustomer(customer)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCustomer(customer._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </>
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
  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(null);
  

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8787/api/customer-enquiry"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCustomers(data);
        setFilteredCustomers(data); // Initialize filtered data with all customer inquiries
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data: " + error.message);
      }
    };

    fetchCustomers();
  }, []);

  // Function to filter customer inquiries based on search criteria
  const filterCustomerInquiries = () => {
    const filteredData = customers.filter((customer) => {
      // Check if customer.customer_name is defined before calling toLowerCase()
      if (customer.customer_name) {
        return customer.customer_name
          .toLowerCase()
          .includes(searchCustomerName.toLowerCase());
      } else {
        return false; // Return false if customer.customer_name is undefined
      }
    });

    setFilteredCustomers(filteredData);
  };

  useEffect(() => {
    filterCustomerInquiries();
  }, [searchCustomerName]);

  const handleEdit = (customer) => {
    console.log(`Editing customer with ID: ${customer._id}`);
    setEditedCustomer(customer);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedCustomer(null);
  };
  const handleEditCustomer = (customerId) => {
    const customerToEdit = filteredCustomers.find(
      (customer) => customer._id === customerId
    );
    setEditedCustomer(customerToEdit);
    setIsEditing(true);
  };
  const handleSaveEditCustomer = async () => {
    try {
      const response = await fetch(
        `https://your-backend-api.com/api/customers/${editedCustomer._id}`,
        {
          method: "PUT", // Assuming you are using PUT for updating, adjust if needed
          headers: {
            "Content-Type": "application/json",
            // Add any other headers if needed
          },
          body: JSON.stringify(editedCustomer),
        }
      );
  
      if (response.ok) {
        // Assuming the backend responds with the updated customer data
        const updatedCustomer = await response.json();
  
        // Update the UI with the updated data
        setFilteredCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer._id === updatedCustomer._id ? updatedCustomer : customer
          )
        );
  
        // Close the edit form
        setIsEditing(false);
        alert("Customer information updated successfully");
      } else {
        // Log the actual error response for debugging purposes
        const errorResponse = await response.json();
        console.error("Error updating customer information:", errorResponse);
        alert("Error updating customer information. Please try again.");
      }
    } catch (error) {
      console.error("Error updating customer information:", error);
      alert("Error updating customer information. Please try again.");
    }
  };
  

  const handleDelete = async (customerId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer inquiry?"
    );

    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:8787/api/customer-enquiry/${customerId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setFilteredCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer._id !== customerId)
        );
        alert("Customer inquiry deleted successfully");
      } catch (error) {
        console.error("Error deleting customer inquiry:", error);
        alert("Error deleting customer inquiry. Please try again.");
      }
    }
  };

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            View Customer Enquiry
          </h2>
          <div className="search-bar p-4 space-y-4">
            <input
              type="text"
              placeholder="Search by Customer Name"
              className="w-full p-2 rounded border"
              value={searchCustomerName}
              onChange={(e) => setSearchCustomerName(e.target.value)}
            />
          </div>
          {isEditing && editedCustomer && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div
                className="bg-white p-4 rounded shadow-lg w-96"
                style={{
                  width: "40%",
                  height: "80vh",
                  overflowY: "scroll",
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold">Edit Customer Enquiry</h2>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="close-icon"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="form-container">
                  <h5 className="fw-bold my-2">Customer Name:</h5>
                  <input
                    type="text"
                    value={editedCustomer.customer_name}
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        customer_name: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Mobile No.:</h5>
                  <input
                    type="text"
                    value={editedCustomer.mobileno}
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        mobileno: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Email</h5>
                  <input
                    defaultValue={editedCustomer.email}
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        email: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />

                  <h5 className="fw-bold my-2">Address:</h5>
                  <textarea
                    value={editedCustomer.address}
                    rows={3}
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        address: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <select
                    className="share-details-input"
                    name="triptype"
                    id="triptype"
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        tripe_type: e.target.value,
                      })
                    }
                    value={editedCustomer.tripe_type}
                  >
                    <option value="">Trip Type</option>
                    <option value="One Way Trip">One Way Trip</option>
                    <option value="Return Trip">Return Trip</option>
                  </select>
                  <h5 className="fw-bold my-2">Sub Type:</h5>
                  <select
                    className="share-details-input"
                    name="subtype"
                    id="subtype"
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        sub_type: e.target.value,
                      })
                    }
                    value={editedCustomer.sub_type}
                  >
                    <option value="">Sub Type</option>
                    <option value="Local Trip">Local Trip</option>
                    <option value="Outstation Trip">Outstation Trip</option>
                    <option value="Outstation Local Trip">
                      Outstation Local Trip
                    </option>
                    <option value="Outstation Outstation Trip">
                      Outstation Outstation Trip
                    </option>
                  </select>
                  <h5 className="fw-bold my-2">Pickup Location</h5>
                  <input
                    type="text"
                    value={editedCustomer.pic_up}
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        pic_up: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Date:</h5>
                  <input
                    type="date"
                    value={editedCustomer.date1}
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        date1: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Time:</h5>
                  <input
                    type="date"
                    value={editedCustomer.time1}
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        time1: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">drop of Location:</h5>
                  <input
                    type="text"
                    value={editedCustomer.drop_of}
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        drop_of: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Date:</h5>
                  <input
                    type="date"
                    value={editedCustomer.date2}
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        date2: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Time:</h5>
                  <input
                    type="time"
                    value={editedCustomer.time2}
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        time2: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Total Days:</h5>
                  <input
                    type="text"
                    value={editedCustomer.days}
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        days: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Total Hours:</h5>
                  <input
                    type="text"
                    value={editedCustomer.hours}
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        hours: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Type of Vehicle:</h5>
                  <select
                    className="form-control-add-trip-input"
                    name="vehicle"
                    id="vehicle"
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        vehicle: e.target.value,
                      })
                    }
                    value={editedCustomer.vehicle}
                  >
                    <option value="">Vehicle</option>
                    <option value="Sedan Car">Sedan Car</option>
                    <option value="Mini Car">Mini Car</option>
                    <option value="SUV Car">SUV Car</option>
                    <option value="AC Bus 13-Seater">AC Bus 13-Seater</option>
                    <option value="AC Bus 17-Seater">AC Bus 17-Seater</option>
                    <option value="AC Bus 20-Seater">AC Bus 20-Seater</option>
                    <option value="AC Bus 32-Seater">AC Bus 32-Seater</option>
                    <option value="AC Bus 35-Seater">AC Bus 35-Seater</option>
                    <option value="AC Bus 40-Seater">AC Bus 40-Seater</option>
                    <option value="AC Bus 45-Seater">AC Bus 45-Seater</option>
                    <option value="Non-AC Bus 17-Seater">
                      Non-AC Bus 17-Seater
                    </option>
                    <option value="Non-AC Bus 20-Seater">
                      Non-AC Bus 20-Seater
                    </option>
                    <option value="Non-AC Bus 32-Seater">
                      Non-AC Bus 32-Seater
                    </option>
                    <option value="Non-AC Bus 40-Seater">
                      Non-AC Bus 40-Seater
                    </option>
                    <option value="Non-AC Bus 45-Seater">
                      Non-AC Bus 45-Seater
                    </option>
                    <option value="Non-AC Bus 49-Seater">
                      Non-AC Bus 49-Seater
                    </option>
                  </select>
                </div>
                <div className="mt-4">
                  <button
                    onClick={handleSaveEditCustomer}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 ml-2 bg-red-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="table-responsive">
            <TableView
              customers={filteredCustomers}
              handleEditCustomer={handleEdit}
              deleteCustomer={handleDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCustomerEnquiry;
