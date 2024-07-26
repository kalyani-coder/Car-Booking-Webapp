import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./ViewCustomer.css";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import axios from "axios"

const TableView = ({ customers, handleEditCustomer, deleteCustomer }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Sr. No.</th>
        <th>Customer Name</th>
        <th>GST No</th>
        <th>Mobile</th>
        <th>Address</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {customers.map((customer, index) => (
        <tr key={customer._id}>
          <td>{index + 1}</td>
          <td>{customer.cus_name}</td>
          <td>{customer.gst_no}</td>
          <td>{customer.cus_mobile}</td>
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
  const [validationMessages, setValidationMessages] = useState({});

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

  //validation
  const handleAlphaInputChange = (callback) => (event) => {
    const value = event.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      callback(value);
    }
  };
  const handleGstInputChange = (callback) => (event) => {
    const value = event.target.value.toUpperCase();
    const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d]Z[A-Z\d]$/;

    if (value.length <= 15) {
      callback(value);
      if (value.length === 15 && gstRegex.test(value)) {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          gst_no: "",
        }));
      } else {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          gst_no:
            "GST number must be exactly 15 characters, alphanumeric, capital letters",
        }));
      }
    }
  };
  const handleNumericChange = (e) => {
    const { name, value } = e.target;

    // Allow only numeric characters and limit to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setEditedCustomer({
        ...editedCustomer,
        [name]: value,
      });

      if (name === "cus_mobile") {
        setValidationMessages(value); // You should define the validateMobileNumber function
      }
    }
  };
  // Define a function to validate email format
  const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };
  const handleEditCustomer = (customer) => {
    setEditedCustomer(customer);
    setIsEditing(true);
  };

  
  
  const handleViewTypeChange = (type) => {
    setViewType(type);
  };

  const handleSave = async () => {
    
    try {
      const response = await axios.patch(`http://localhost:8787/api/add-customers/${editedCustomer._id}`, editedCustomer);
      setIsEditing(false);
      // Optionally refresh customer data here
    } catch (err) {
      if (err.response && err.response.data){
        window.alert(err.response.data.message);
      } else {
        window.alert('An error occurred while updating the customer.');
      }
    } finally {
      console.log("error updating customer")
    }
  };


  return (
    <>
      <div className="customer-Add-container">
        <div className="viewcustomer-main-container">
          <h2 className="View-Corporate-Customer-Rate font-bold ">
            View Customer
          </h2>
          <div className="search-bar py-4">
            <input
              type="text"
              placeholder="Search by Customer Name / Company Name"
              className="w-full p-2 rounded border width-set-for-all-view-pages-carbooking-search-box"
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
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 modal-main-container-section-z-index">
        <div
          className="bg-white p-4 rounded shadow-lg main-div-for-modal-container-for-all-inputs-cc"
          style={{ overflowY: "auto" }}
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">Edit Customer</h2>
            <button onClick={() => setIsEditing(false)} className="close-icon">
              <FaTimes />
            </button>
          </div>

          <h5 className="fw-bold my-2">Customer Name / Company Name</h5>
          <input
            type="text"
            value={editedCustomer.cus_name}
            onChange={(e) =>
              setEditedCustomer({ ...editedCustomer, cus_name: e.target.value })
            }
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            placeholder="Customer Name"
          />

          <h5 className="fw-bold my-2">GST No</h5>
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
              setEditedCustomer({ ...editedCustomer, cus_mobile: e.target.value })
            }
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />

          <h5 className="fw-bold my-2">Customer Email</h5>
          <input
            type="text"
            value={editedCustomer.cus_email}
            onChange={(e) =>
              setEditedCustomer({ ...editedCustomer, cus_email: e.target.value })
            }
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />

          <h5 className="fw-bold my-2">Address</h5>
          <textarea
            value={editedCustomer.address}
            onChange={(e) =>
              setEditedCustomer({ ...editedCustomer, address: e.target.value })
            }
            rows={3}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 ml-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
          
        </div>
      </div>
    )}
    </>
  );
};

export default ViewCustomer;
