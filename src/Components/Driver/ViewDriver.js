import React, { useState, useEffect } from "react";
import "./ViewDriver.css"; // Make sure you have a CSS file for this component
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa"; // Import icons

const TableView = ({ drivers, handleEditDriver, handleDeleteDriver }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Sr. No.</th>
        <th>Driver Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>Mobile No. 1</th>
        <th>Mobile No. 2</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {drivers.map((driver, index) => (
        <tr key={driver._id}>
          <td>{index + 1}</td>
          <td>{driver.driver_Name}</td>
          <td>{driver.driver_Email}</td>
          <td>{driver.address}</td>
          <td>{driver.driver_Mo1}</td>
          <td>{driver.driver_Mo2}</td>
          <td>
            <div className="d-flex align-items-center gap-1">
              <button
                className="btn btn-info"
                onClick={() => handleEditDriver(driver)}
              >
                <FaEdit />
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteDriver(driver._id)}
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

const ViewDriver = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedDriver, setEditedDriver] = useState({});
  const [validationMessages, setValidationMessages] = useState({});

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch("http://localhost:8787/api/add-Drivers");
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDrivers();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8787/api/add-Drivers/${editedDriver._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedDriver),
        }
      );

      if (response.ok) {
        setDrivers((prevDrivers) =>
          prevDrivers.map((driver) =>
            driver._id === editedDriver._id ? editedDriver : driver
          )
        );
        setIsEditing(false);
        alert("Driver information updated successfully");
      } else {
        console.error("Error updating driver:", response.status);
        alert("Error updating driver. Please try again.");
      }
    } catch (error) {
      console.error("Error updating driver:", error);
      alert("Error updating driver. Please try again.");
    }
  };

  const handleEditDriver = (driver) => {
    setEditedDriver(driver);
    setIsEditing(true);
  };

  const handleDeleteDriver = async (driverId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this driver?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:8787/api/add-Drivers/${driverId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setDrivers((prevDrivers) =>
          prevDrivers.filter((driver) => driver._id !== driverId)
        );
        alert("Driver deleted successfully");
      } catch (error) {
        console.error("Error deleting driver:", error);
        // Handle error state or logging here
      }
    }
  };

  // Validation functions
  const handleAlphaInputChange = (callback) => (event) => {
    const value = event.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      callback(value);
    }
  };

  const handleNumericChange = (callback) => (event) => {
    const value = event.target.value;
    // Validate only numeric characters
    if (/^\d*$/.test(value)) {
      callback(value);
    }
  };

  const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <div className="driver-Add-container">
        <div className="driver-main-container">
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
            className="text-center mr-[4rem] view-driver-text-center-responsive"
          >
            View Drivers
          </h2>
          <input
            type="search"
            placeholder="Search By Driver Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 border rounded-lg shadow-md mb-4"
          />
          <div className="table-responsive">
            <TableView
              drivers={drivers}
              handleEditDriver={handleEditDriver}
              handleDeleteDriver={handleDeleteDriver}
            />
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold">Edit Driver</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="close-icon"
              >
                <FaTimes />
              </button>
            </div>
            <div className="form-container">
              <h5 className="fw-bold">Driver Name</h5>
              <input
                type="text"
                value={editedDriver.driver_Name}
                onChange={handleAlphaInputChange((value) =>
                  setEditedDriver({
                    ...editedDriver,
                    driver_Name: value,
                  })
                )}
                className={`w-full p-2 mb-2 border ${
                  validationMessages.driver_Name
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              {validationMessages.driver_Name && (
                <div className="text-red-500 mt-1">
                  {validationMessages.driver_Name}
                </div>
              )}

              <h5 className="fw-bold">Email</h5>
              <input
                type="text"
                value={editedDriver.driver_Email}
                onChange={(e) => {
                  const { value } = e.target;
                  setEditedDriver({
                    ...editedDriver,
                    driver_Email: value,
                  });

                  // Validate email format
                  if (!validateEmail(value)) {
                    setValidationMessages((prevMessages) => ({
                      ...prevMessages,
                      driver_Email: "Please enter a valid email address",
                    }));
                  } else {
                    setValidationMessages((prevMessages) => ({
                      ...prevMessages,
                      driver_Email: "",
                    }));
                  }
                }}
                className={`w-full p-2 mb-2 border ${
                  validationMessages.driver_Email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              {validationMessages.driver_Email && (
                <div className="text-red-500 mt-1">
                  {validationMessages.driver_Email}
                </div>
              )}

              <h5 className="fw-bold">Address</h5>
              <textarea
                value={editedDriver.address}
                onChange={(e) =>
                  setEditedDriver({
                    ...editedDriver,
                    address: e.target.value,
                  })
                }
                rows="4"
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />

              <h5 className="fw-bold">Mobile No</h5>
              <input
                type="text"
                value={editedDriver.driver_Mo1}
                onChange={handleNumericChange((value) =>
                  setEditedDriver({
                    ...editedDriver,
                    driver_Mo1: value,
                  })
                )}
                maxLength="10"
                className={`w-full p-2 mb-2 border ${
                  validationMessages.driver_Mo1
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              {validationMessages.driver_Mo1 && (
                <div className="text-red-500 mt-1">
                  {validationMessages.driver_Mo1}
                </div>
              )}

              <h5 className="fw-bold">Alternate Mobile No</h5>
              <input
                type="text"
                value={editedDriver.driver_Mo2}
                onChange={handleNumericChange((value) =>
                  setEditedDriver({
                    ...editedDriver,
                    driver_Mo2: value,
                  })
                )}
                maxLength="10"
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
            </div>

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
    </>
  );
};

export default ViewDriver;
