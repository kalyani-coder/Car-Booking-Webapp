import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import "./ViewCustomerRate.css";

const ViewCorporateCustomer = () => {
  const [customerRates, setCustomerRates] = useState([]);
  const [filteredCustomerRates, setFilteredCustomerRates] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editedData, setEditedData] = useState(editedItem);

  useEffect(() => {
    const fetchCustomerRates = async () => {
      try {
        const response = await fetch(
          "http://localhost:8787/api/corporate-customer"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCustomerRates(data);
        setFilteredCustomerRates(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data: " + error.message);
      }
    };

    fetchCustomerRates();
  }, []);

  useEffect(() => {
    // Check if there's an edited item in localStorage and set it to state
    const storedEditedItem = JSON.parse(localStorage.getItem("editedItem"));
    if (storedEditedItem) {
      setEditedItem(storedEditedItem);
      setIsEditing(true);
    }
  }, []);

  useEffect(() => {
    filterCustomerRates();
  }, [searchQuery, customerRates]);

  const filterCustomerRates = () => {
    const filteredData = customerRates.filter((customerRate) => {
      const vendorNameMatches =
        customerRate.Cus_name &&
        customerRate.Cus_name.toLowerCase().includes(searchQuery.toLowerCase());

      return vendorNameMatches;
    });

    setFilteredCustomerRates(filteredData);
  };

  const handleEdit = (id) => {
    const itemToEdit = customerRates.find((rate) => rate._id === id);
    setEditedItem(itemToEdit);
    setIsEditing(true);
    // Store the edited item in localStorage
    localStorage.setItem("editedItem", JSON.stringify(itemToEdit));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8787/api/corporate-customer/${editedItem._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedItem),
        }
      );

      if (response.ok) {
        setCustomerRates((prevRates) =>
          prevRates.map((customerRate) =>
            customerRate._id === editedItem._id ? editedItem : customerRate
          )
        );
        setIsEditing(false);

        // Remove the edited item from localStorage
        localStorage.removeItem("editedItem");
        alert("Corporate Cutomer rate updated successfully");
      } else {
        console.error("Error updating vendor rate:", response.status);
        alert("Error updating vendor rate. Please try again.");
      }
    } catch (error) {
      console.error("Error updating vendor rate:", error);
      setError("Error updating vendor rate: " + error.message);
      alert("Error updating vendor rate. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditedItem(null);
    setIsEditing(false);

    // Remove the edited item from localStorage
    localStorage.removeItem("editedItem");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Corporate Customer rate?"
    );
    if (!confirmed) return;
    try {
      const response = await fetch(
        `http://localhost:8787/api/corporate-customer/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setCustomerRates((prevRates) =>
        prevRates.filter((customerRate) => customerRate._id !== id)
      );
      alert("Corporate Customer rate deleted successfully");
    } catch (error) {
      console.error("Error deleting vendor rate:", error);
      setError("Error deleting vendor rate: " + error.message);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container h-[98vh]">
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            View Corporate Customer Rate
          </h2>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Corporate Customer Name "
              className="w-full p-2 rounded border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {isEditing && editedData && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded shadow-xl w-110 overflow-y-auto max-h-[80vh]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">
                    Edit Corporate Customer
                  </h2>
                  <button
                    onClick={handleCancelEdit}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h5 className="font-medium mb-1">Customer Name</h5>
                    <input
                      type="text"
                      value={editedData.Cus_name}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          Cus_name: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">GST No</h5>
                    <input
                      type="text"
                      value={editedData.gst_no}
                      onChange={(e) =>
                        setEditedData({ ...editedData, gst_no: e.target.value })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Mobile Number</h5>
                    <input
                      type="text"
                      value={editedData.Cus_Mobile}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          Cus_Mobile: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Type of Vehicle</h5>
                    <input
                      type="text"
                      value={editedData.type_of_vehicle}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          type_of_vehicle: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Duty Type</h5>
                    <input
                      type="text"
                      value={editedData.duty_type}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          duty_type: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Rate</h5>
                    <input
                      type="text"
                      value={editedData.rate}
                      onChange={(e) =>
                        setEditedData({ ...editedData, rate: e.target.value })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">KM</h5>
                    <input
                      type="number"
                      value={editedData.km}
                      onChange={(e) =>
                        setEditedData({ ...editedData, km: e.target.value })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Extra KM</h5>
                    <input
                      type="number"
                      value={editedData.extra_km}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          extra_km: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Hour</h5>
                    <input
                      type="number"
                      value={editedData.hours}
                      onChange={(e) =>
                        setEditedData({ ...editedData, hours: e.target.value })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Extra Hour</h5>
                    <input
                      type="number"
                      value={editedData.extra_hours}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          extra_hours: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">From</h5>
                    <input
                      type="text"
                      value={editedData.from}
                      onChange={(e) =>
                        setEditedData({ ...editedData, from: e.target.value })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">To</h5>
                    <input
                      type="text"
                      value={editedData.to}
                      onChange={(e) =>
                        setEditedData({ ...editedData, to: e.target.value })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Date</h5>
                    <input
                      type="date"
                      value={editedData.date}
                      onChange={(e) =>
                        setEditedData({ ...editedData, date: e.target.value })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleSave(editedData)}
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

          <div className="table-view">
            {filteredCustomerRates.length === 0 ? (
              <p>No results found.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Customer Name</th>
                    <th>Type Of vehicle</th>
                    <th>Duty Type</th>
                    <th>Rate</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomerRates.map((customerRate, index) => (
                    <tr key={customerRate._id}>
                      <td>{index + 1}</td>
                      <td>{customerRate.Cus_name}</td>
                      <td>{customerRate.type_of_vehicle}</td>
                      <td>{customerRate.duty_type}</td>
                      <td>{customerRate.rate}</td>
                      <td>{customerRate.from}</td>
                      <td>{customerRate.to}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => handleEdit(customerRate._id)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(customerRate._id)}
                        >
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
    </>
  );
};

export default ViewCorporateCustomer;
