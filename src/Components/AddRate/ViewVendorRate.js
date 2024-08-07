import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import "./ViewCustomerRate.css";

const ViewVenderRate = () => {
  const [customerRates, setCustomerRates] = useState([]);
  const [filteredCustomerRates, setFilteredCustomerRates] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCustomerRates = async () => {
      try {
        const response = await fetch("http://localhost:8787/api/vender-rate");
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
        customerRate.vender_Name &&
        customerRate.vender_Name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

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
        `http://localhost:8787/api/vender-rate/${editedItem._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedItem),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setCustomerRates((prevRates) =>
          prevRates.map((customerRate) =>
            customerRate._id === editedItem._id ? editedItem : customerRate
          )
        );
        setIsEditing(false);

        // Remove the edited item from localStorage
        localStorage.removeItem("editedItem");
        alert(responseData.message || "Vendor rate updated successfully");
      } else {
        console.error("Error updating vendor rate:", response.status);
        alert(
          responseData.message ||
            "Error updating vendor rate. Please try again."
        );
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
      "Are you sure you want to delete this vendor rate?"
    );
    if (!confirmed) return;
    try {
      const response = await fetch(
        `http://localhost:8787/api/vender-rate/${id}`,
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
      alert("Vendor rate deleted successfully");
    } catch (error) {
      console.error("Error deleting vendor rate:", error);
      setError("Error deleting vendor rate: " + error.message);
    }
  };

  return (
    <>
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h2 className="View-Corporate-Customer-Rate font-bold py-4">
            View Vendor Rate
          </h2>
          <div className="search-bar py-2">
            <input
              type="text"
              placeholder="Search by Vendor Name "
              className="w-full p-2 rounded border width-set-for-all-view-pages-carbooking-search-box"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {isEditing && editedItem && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 modal-main-container-section-z-index">
              <div className="bg-white p-4 rounded shadow-lg w-96 overflow-y-auto max-h-[80vh] main-div-for-modal-container-for-all-inputs-cc">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold">Edit Vendor Rate</h2>
                  <button onClick={handleCancelEdit} className="close-icon">
                    <FaTimes />
                  </button>
                </div>
                <h5 className="fw-bold my-2">Vendor Name</h5>
                <input
                  type="text"
                  value={editedItem.vender_Name}
                  onChange={(e) =>
                    setEditedItem({
                      ...editedItem,
                      vender_Name: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <h5 className="fw-bold my-2">Company Name</h5>
                <input
                  type="text"
                  value={editedItem.company_Name}
                  onChange={(e) =>
                    setEditedItem({
                      ...editedItem,
                      company_Name: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <h5 className="fw-bold my-2">GST No</h5>
                <input
                  type="text"
                  value={editedItem.GST_No}
                  onChange={(e) =>
                    setEditedItem({ ...editedItem, GST_No: e.target.value })
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />

                <h5 className="fw-bold my-2">Mobile Number</h5>
                <input
                  type="text"
                  value={editedItem.mobile_Number}
                  onChange={(e) =>
                    setEditedItem({
                      ...editedItem,
                      mobile_Number: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />

                <h5 className="fw-bold my-2">Duty Type</h5>
                <input
                  type="text"
                  id="title"
                  value={editedItem.title || ""}
                  onChange={(e) =>
                    setEditedItem({ ...editedItem, title: e.target.value })
                  }
                  className="form-control"
                />

                <h5 className="fw-bold my-2">From</h5>
                <input
                  type="text"
                  id="from"
                  value={editedItem.from || ""}
                  onChange={(e) =>
                    setEditedItem({ ...editedItem, from: e.target.value })
                  }
                  className="form-control"
                />
                <h5 className="fw-bold my-2">To</h5>
                <input
                  type="text"
                  id="to"
                  value={editedItem.to || ""}
                  onChange={(e) =>
                    setEditedItem({ ...editedItem, to: e.target.value })
                  }
                  className="form-control"
                />
                <h5 className="fw-bold my-2">Rate</h5>
                <input
                  type="text"
                  value={editedItem.rate}
                  onChange={(e) =>
                    setEditedItem({ ...editedItem, rate: e.target.value })
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />

                <h5 className="fw-bold my-2">KM</h5>
                <input
                  className="rate-form-control"
                  type="number"
                  id="km"
                  name="km"
                  placeholder="km"
                  value={editedItem.km || ""}
                  onChange={(e) =>
                    setEditedItem({ ...editedItem, km: e.target.value })
                  }
                  required
                />

                <h5 className="fw-bold my-2">Extra KM</h5>
                <input
                  className="rate-form-control"
                  type="number"
                  id="extra_km"
                  name="extra_km"
                  placeholder="extra km"
                  value={editedItem.extra_km || ""}
                  onChange={(e) =>
                    setEditedItem({ ...editedItem, extra_km: e.target.value })
                  }
                />

                <h5 className="fw-bold my-2">Hour</h5>
                <input
                  className="rate-form-control"
                  type="number"
                  id="hour"
                  name="hour"
                  placeholder="hour"
                  value={editedItem.hour || ""}
                  onChange={(e) =>
                    setEditedItem({ ...editedItem, hour: e.target.value })
                  }
                  required
                />

                <h5 className="fw-bold my-2">Extra Hour</h5>
                <input
                  className="rate-form-control"
                  type="number"
                  id="extra_hour"
                  name="extra_hour"
                  placeholder="Extra Hour"
                  value={editedItem.extra_hour || ""}
                  onChange={(e) =>
                    setEditedItem({ ...editedItem, extra_hour: e.target.value })
                  }
                />

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
          )}

          <div className="table-view">
            {filteredCustomerRates.length === 0 ? (
              <p>No results found.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Vendor Name</th>
                    <th>Company Name</th>
                    <th>GST No</th>
                    <th>Mobile Number</th>
                    {/* <th>Rate Per KM</th> */}
                    <th>Title</th>
                    <th>Rate</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomerRates.map((customerRate, index) => (
                    <tr key={customerRate._id}>
                      <td>{index + 1}</td>
                      <td>{customerRate.vender_Name}</td>
                      <td>{customerRate.company_Name}</td>
                      <td>{customerRate.GST_No}</td>
                      <td>{customerRate.mobile_Number}</td>
                      {/* <td>{customerRate.rate_per_Km}</td> */}
                      <td>{customerRate.title}</td>
                      <td>{customerRate.rate}</td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
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
                        </div>
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

export default ViewVenderRate;
