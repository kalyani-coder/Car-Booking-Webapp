import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./ViewCustomer.css";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const TableView = ({ customers, handleEditCustomer, deleteCustomer }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Sr. No.</th>
        <th>Customer Name</th>
        <th>GST No</th>
        <th>Mobile</th>
        <th>Email</th>
        <th>Address</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {customers.map((customer,index) => (
        <tr key={customer._id}>
          <td>{index + 1}</td>
          <td>{customer.cus_name}</td>
          <td>{customer.gst_no}</td>
          <td>{customer.cus_mobile}</td>
          <td>{customer.cus_email}</td>
          <td>{customer.address}</td>
          <td>
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
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const ViewCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({});
  const [viewType, setViewType] = useState("table");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:8787/api/add-customers");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data: " + error.message);
      }
    };

    fetchCustomers();
  }, []);

  const filterCustomers = () => {
    const filteredData = customers.filter((customer) => {
      const customerNameMatches =
        customer &&
        customer.cus_name &&
        customer.cus_name.toLowerCase().includes(searchQuery.toLowerCase());
      const companyNameMatches =
        customer &&
        customer.company_name &&
        customer.company_name.toLowerCase().includes(searchQuery.toLowerCase());

      return customerNameMatches || companyNameMatches;
    });

    setFilteredCustomers(filteredData);
  };

  useEffect(() => {
    filterCustomers();
  }, [searchQuery, customers]);

  const deleteCustomer = async (customerId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:8787/api/add-customers/${customerId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer._id !== customerId)
        );
        setFilteredCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer._id !== customerId)
        );
        alert("Customer deleted successfully");
      } catch (error) {
        console.error("Error deleting customer:", error);
        setError("Error deleting customer: " + error.message);
      }
    }
  };

  const handleEditCustomer = (customer) => {
    setEditedCustomer(customer);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8787/api/add-customers/${editedCustomer._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedCustomer),
        }
      );

      if (response.ok) {
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer._id === editedCustomer._id ? editedCustomer : customer
          )
        );
        setFilteredCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer._id === editedCustomer._id ? editedCustomer : customer
          )
        );
        setIsEditing(false);
        alert("Customer data updated successfully");
        setErrorMessage("");
      } else {
        console.error("Error updating customer:", response.status);
        alert("Error updating customer. Please try again.");
        setSuccessMessage("");
        setErrorMessage("Error updating customer. Please try again.");
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      setSuccessMessage("");
      setErrorMessage("Error updating customer. Please try again.");
    }
  };

  // Clear success message after a few seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000); // Clear the success message after 3 seconds

      return () => clearTimeout(timer); // Clear timeout if component unmounts
    }
  }, [successMessage]);

  const handleViewTypeChange = (type) => {
    setViewType(type);
  };

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="viewcustomer-main-container">
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
            className="text-center"
          >
            View Customer
          </h2>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Customer Name / Company Name"
              className="w-full p-2 rounded border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {viewType === "table" && (
            <TableView
              customers={filteredCustomers}
              handleEditCustomer={handleEditCustomer}
              deleteCustomer={deleteCustomer}
            />
          )}
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold">Edit Customer</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="close-icon"
              >
                <FaTimes />
              </button>
            </div>
            <h5 className="fw-bold my-2">Customer Name</h5>
            <input
              type="text"
              value={editedCustomer.cus_name}
              onChange={(e) =>
                setEditedCustomer({
                  ...editedCustomer,
                  cus_name: e.target.value,
                })
              }
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <h5 className="fw-bold my-2">GST No </h5>
            <input
              type="text"
              value={editedCustomer.gst_no}
              onChange={(e) =>
                setEditedCustomer({ ...editedCustomer, gst_no: e.target.value })
              }
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <h5 className="fw-bold my-2">Customer Mobile</h5>
            <input
              type="text"
              value={editedCustomer.cus_mobile}
              onChange={(e) =>
                setEditedCustomer({
                  ...editedCustomer,
                  cus_mobile: e.target.value,
                })
              }
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <h5 className="fw-bold my-2">Customer Email</h5>
            <input
              type="text"
              value={editedCustomer.cus_email}
              onChange={(e) =>
                setEditedCustomer({
                  ...editedCustomer,
                  cus_email: e.target.value,
                })
              }
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <h5 className="fw-bold my-2">Address</h5>
            <input
              type="text"
              value={editedCustomer.address}
              onChange={(e) =>
                setEditedCustomer({
                  ...editedCustomer,
                  address: e.target.value,
                })
              }
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 ml-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Display success message */}
      {successMessage && (
        <div className="alert alert-success fixed bottom-4 right-4">
          {successMessage}
        </div>
      )}
    </>
  );
};

export default ViewCustomer;
