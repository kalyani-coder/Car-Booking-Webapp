import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const ViewIndivisualCustomer = () => {
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
          "http://localhost:8787/api/indivisual-customer"
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

  const handleEditClick = (item) => {
    setEditedData(item);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8787/api/indivisual-customer/${editedItem._id}`,
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
        alert("Indivisual Cutomer rate updated successfully");
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
      "Are you sure you want to delete this Indivisual Customer rate?"
    );
    if (!confirmed) return;
    try {
      const response = await fetch(
        `http://localhost:8787/api/indivisual-customer/${id}`,
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
  const ViewCorporateCustomer = () => {
    return <div>Corporate Customer View</div>;
  };

  const ViewIndivisualCustomer = () => {
    return <div>Individual Customer View</div>;
  };

  return (
    <>
      <div className="customer-Add-container">
        <div className="customer-main-container h-[98vh]">
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            View Indivisual Customer Rate
          </h2>

          <div className="flex items-center space-x-4">
            <div className="flex-grow-0 flex-shrink-0 w-10/12 search-bar">
              <input
                type="text"
                placeholder="Search by Indivisual  Customer Name"
                className="w-full p-2 rounded border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-grow-0 flex-shrink-0 w-2/12">
              <button className="btn btn-primary w-full">
                <Link
                  to="/viewcorporatecustomer"
                  className="text-white text-decoration-none"
                >
                  Corporate Customer
                </Link>
              </button>
            </div>
          </div>

          {isEditing && editedItem && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded shadow-lg w-full max-w-2xl overflow-y-auto max-h-[80vh]">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold">
                    Edit Indivisual Customer
                  </h2>
                  <button
                    onClick={handleCancelEdit}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium">Customer Name</h5>
                    <input
                      type="text"
                      value={editedItem.Cus_name}
                      onChange={(e) =>
                        setEditedItem({
                          ...editedItem,
                          Cus_name: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <h5 className="font-medium">GST No</h5>
                    <input
                      type="text"
                      value={editedItem.gst_no}
                      onChange={(e) =>
                        setEditedItem({ ...editedItem, gst_no: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium">Mobile Number</h5>
                    <input
                      type="text"
                      value={editedItem.Cus_Mobile}
                      onChange={(e) =>
                        setEditedItem({
                          ...editedItem,
                          Cus_Mobile: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium">From</h5>
                    <input
                      type="text"
                      value={editedItem.from || ""}
                      onChange={(e) =>
                        setEditedItem({ ...editedItem, from: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium">To</h5>
                    <input
                      type="text"
                      value={editedItem.to || ""}
                      onChange={(e) =>
                        setEditedItem({ ...editedItem, from: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium">Duty Type</h5>
                    <input
                      type="text"
                      value={editedItem.duty_type || ""}
                      onChange={(e) =>
                        setEditedItem({
                          ...editedItem,
                          duty_type: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium">Rate</h5>
                    <input
                      type="text"
                      value={editedItem.rate}
                      onChange={(e) =>
                        setEditedItem({ ...editedItem, rate: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium">KM</h5>
                    <input
                      type="number"
                      value={editedItem.km || ""}
                      onChange={(e) =>
                        setEditedItem({ ...editedItem, km: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium">Extra KM</h5>
                    <input
                      type="number"
                      value={editedItem.extra_km || ""}
                      onChange={(e) =>
                        setEditedItem({
                          ...editedItem,
                          extra_km: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium">Hour</h5>
                    <input
                      type="number"
                      value={editedItem.hours || ""}
                      onChange={(e) =>
                        setEditedItem({ ...editedItem, hours: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium">Extra Hour</h5>
                    <input
                      type="number"
                      value={editedItem.extra_hours || ""}
                      onChange={(e) =>
                        setEditedItem({
                          ...editedItem,
                          extra_hours: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="flex justify-start mt-4">
                  <button
                    onClick={handleSave}
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

export default ViewIndivisualCustomer;
