import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import axios from "axios";
import "./AddTrip.css";

const ViewTrip = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [error, setError] = useState(null);
  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTrip, setEditedTrip] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch("http://localhost:8787/api/add-trip");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTrips(data);
        setFilteredTrips(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data: " + error.message);
      }
    };

    fetchTrips();
  }, []);

  useEffect(() => {
    const filterTrips = () => {
      const filteredData = trips.filter((trip) =>
        trip.customername
          .toLowerCase()
          .includes(searchCustomerName.toLowerCase())
      );
      setFilteredTrips(filteredData);
    };

    filterTrips();
  }, [searchCustomerName, trips]);

  const handleDelete = async (tripId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trip?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:8787/api/add-trip/${tripId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setFilteredTrips((prevTrips) =>
          prevTrips.filter((trip) => trip._id !== tripId)
        );
        alert("Trip deleted successfully.");
        setErrorMessage("");
      } catch (error) {
        console.error("Error deleting trip:", error);
        alert("Error deleting trip: " + error.message);
      }
    }
  };

  const handleEdit = (trip) => {
    setEditedTrip({ ...trip });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8787/api/add-trip/${editedTrip._id}`,
        editedTrip
      );

      if (response.status === 200) {
        setTrips((prevTrips) =>
          prevTrips.map((trip) =>
            trip._id === editedTrip._id ? editedTrip : trip
          )
        );
        setFilteredTrips((prevTrips) =>
          prevTrips.map((trip) =>
            trip._id === editedTrip._id ? editedTrip : trip
          )
        );
        alert("Trip updated successfully.");
        setIsEditing(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Validation Error:", error.response.data.message);
        alert("Validation Error: " + error.response.data.message);
      } else {
        console.error("Error:", error.message);
        alert("An error occurred while updating the trip");
      }
    }
  };

  const fetchTripDetails = async (tripId) => {
    try {
      const response = await fetch(
        `http://localhost:8787/api/add-trip/${tripId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSelectedTrip(data);
    } catch (error) {
      console.error("Error fetching trip details:", error);
      setErrorMessage("Error fetching trip details: " + error.message);
    }
  };

  const handleCloseModal = () => {
    setSelectedTrip(null);
    setIsEditing(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <>
      <div className="customer-Add-container">
        <div className="customer-main-container mt-4">
          <h2 className="View-Corporate-Customer-Rate font-bold">View Trips</h2>

          <div className="search-bar-view-customer-enquiry">
            <input
              type="text"
              placeholder="Search by Customer Name"
              className=" p-2 rounded border width-set-for-all-view-pages-carbooking-search-box"
              value={searchCustomerName}
              onChange={(e) => setSearchCustomerName(e.target.value)}
            />
          </div>

          {error && <p>Error: {error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="view-trip-table-container-div-cc">
            <table className="table">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Customer Name</th>
                  <th>Mobile No</th>
                  <th>Trip Type</th>
                  <th>Sub Type</th>
                  <th>Pickup</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrips.map((trip, index) => (
                  <tr key={trip._id}>
                    <td>{index + 1}</td>
                    <td>{trip.customername}</td>
                    <td>{trip.mobileno}</td>
                    <td>{trip.triptype}</td>
                    <td>{trip.subtype}</td>
                    <td>{trip.pickup}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-primary"
                          onClick={() => fetchTripDetails(trip._id)}
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          className="btn btn-info"
                          onClick={() => handleEdit(trip)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(trip._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedTrip && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 modal-main-container-section-z-index">
              <div
                className="bg-white p-4 rounded shadow-lg w-96 main-div-for-modal-container-for-all-inputs-cc"
                style={{
                  height: "80vh",
                  overflowY: "scroll",
                }}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Trip Details</h2>
                  <button className="text-black-500" onClick={handleCloseModal}>
                    <FaTimes />
                  </button>
                </div>
                <div className="mt-4">
                  <p>
                    <strong>Customer Name:</strong> {selectedTrip.customername}
                  </p>
                  <p className="mb-2">
                    <strong>Mobile No:</strong> {selectedTrip.mobileno}
                  </p>
                  <p className="mb-2">
                    <strong>Email:</strong> {selectedTrip.email}
                  </p>
                  <p className="mb-2">
                    <strong>Address:</strong> {selectedTrip.address}
                  </p>
                  <p className="mb-2">
                    <strong>Trip Type:</strong> {selectedTrip.triptype}
                  </p>
                  <p className="mb-2">
                    <strong>Sub Type:</strong> {selectedTrip.subtype}
                  </p>
                  <p className="mb-2">
                    <strong>Pickup:</strong> {selectedTrip.pickup}
                  </p>
                  <p className="mb-2">
                    <strong>Date:</strong> {selectedTrip.date}
                  </p>
                  <p className="mb-2">
                    <strong>Time:</strong> {selectedTrip.time}
                  </p>
                  <p className="mb-2">
                    <strong>Drop Off Location:</strong> {selectedTrip.dropoff}
                  </p>
                  <p className="mb-2">
                    <strong>Date:</strong> {selectedTrip.date1}
                  </p>
                  <p className="mb-2">
                    <strong>Time:</strong> {selectedTrip.time1}
                  </p>
                  <p className="mb-2">
                    <strong>Total Days:</strong> {selectedTrip.totaldays}
                  </p>
                  <p className="mb-2">
                    <strong>Total Hour:</strong> {selectedTrip.hours}
                  </p>
                  <p className="mb-2">
                    <strong>Type of Vehicle:</strong> {selectedTrip.vehicle}
                  </p>
                  <p className="mb-2">
                    <strong>Person 1:</strong> {selectedTrip.Person_1}
                  </p>
                  <p className="mb-2">
                    <strong>Mobile Number:</strong>{" "}
                    {selectedTrip.Mobile_Number_1}
                  </p>
                  <p className="mb-2">
                    <strong>Person 2:</strong> {selectedTrip.Person_2}
                  </p>
                  <p className="mb-2">
                    <strong>Mobile Number:</strong>{" "}
                    {selectedTrip.Mobile_Number_2}
                  </p>
                  <p className="mb-2">
                    <strong>Person 3:</strong> {selectedTrip.Person_3}
                  </p>
                  <p className="mb-2">
                    <strong>Mobile Number:</strong>{" "}
                    {selectedTrip.Mobile_Number_3}
                  </p>
                  <p className="mb-2">
                    <strong>Person 4:</strong> {selectedTrip.Person_4}
                  </p>
                  <p className="mb-2">
                    <strong>Mobile Number:</strong>{" "}
                    {selectedTrip.Mobile_Number_4}
                  </p>
                  <p className="mb-2">
                    <strong>Person 5:</strong> {selectedTrip.Person_5}
                  </p>
                  <p className="mb-2">
                    <strong>Mobile Number:</strong>{" "}
                    {selectedTrip.Mobile_Number_5}
                  </p>
                  <p className="mb-2">
                    <strong>Person 6:</strong> {selectedTrip.Person_6}
                  </p>
                  <p className="mb-2">
                    <strong>Mobile Number:</strong>{" "}
                    {selectedTrip.Mobile_Number_6}
                  </p>
                </div>
              </div>
            </div>
          )}

          {isEditing && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 modal-main-container-section-z-index">
              <div
                className="bg-white p-4 rounded shadow-lg w-96 main-div-for-modal-container-for-all-inputs-cc"
                style={{
                  height: "80vh",
                  overflowY: "scroll",
                }}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Edit Trip</h2>
                  <button className="text-black-500" onClick={handleCloseModal}>
                    <FaTimes />
                  </button>
                </div>
                <div className="mt-4">
                  <h5 className="fw-bold my-2">Customer Name:</h5>
                  <input
                    type="text"
                    placeholder="Customer Name"
                    value={editedTrip.customername}
                    onChange={(e) =>
                      setEditedTrip({
                        ...editedTrip,
                        customername: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Mobile No:</h5>
                  <input
                    type="text"
                    placeholder="Mobile No"
                    value={editedTrip.mobileno}
                    onChange={(e) =>
                      setEditedTrip({ ...editedTrip, mobileno: e.target.value })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Email:</h5>
                  <input
                    type="text"
                    placeholder="email"
                    value={editedTrip.email}
                    onChange={(e) =>
                      setEditedTrip({ ...editedTrip, email: e.target.value })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Address:</h5>
                  <input
                    type="text"
                    placeholder="email"
                    value={editedTrip.address}
                    onChange={(e) =>
                      setEditedTrip({ ...editedTrip, address: e.target.value })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Trip Type:</h5>
                  <input
                    type="text"
                    placeholder="email"
                    value={editedTrip.triptype}
                    onChange={(e) =>
                      setEditedTrip({ ...editedTrip, triptype: e.target.value })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Sub Type:</h5>
                  <input
                    type="text"
                    placeholder="email"
                    value={editedTrip.subtype}
                    onChange={(e) =>
                      setEditedTrip({ ...editedTrip, subtype: e.target.value })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Pickup Location:</h5>
                  <input
                    type="text"
                    value={editedTrip.pickup}
                    onChange={(e) =>
                      setEditedTrip({ ...editedTrip, pickup: e.target.value })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Date:</h5>
                  <input
                    type="date"
                    value={editedTrip.date}
                    onChange={(e) =>
                      setEditedTrip({ ...editedTrip, date: e.target.value })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Time:</h5>
                  <input
                    type="time"
                    value={editedTrip.time}
                    onChange={(e) =>
                      setEditedTrip({ ...editedTrip, time: e.target.value })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Dropoff Location:</h5>
                  <input
                    type="text"
                    value={editedTrip.dropoff}
                    onChange={(e) =>
                      setEditedTrip({ ...editedTrip, dropoff: e.target.value })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Date:</h5>
                  <input
                    type="date"
                    value={editedTrip.date1}
                    onChange={(e) =>
                      setEditedTrip({ ...editedTrip, date1: e.target.value })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Time:</h5>
                  <input
                    type="time"
                    value={editedTrip.time1}
                    onChange={(e) =>
                      setEditedTrip({ ...editedTrip, time1: e.target.value })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Total Days:</h5>
                  <input
                    type="text"
                    value={editedTrip.totaldays}
                    onChange={(e) =>
                      setEditedTrip({
                        ...editedTrip,
                        totaldays: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Total Hours:</h5>
                  <input
                    type="text"
                    value={editedTrip.hours}
                    onChange={(e) =>
                      setEditedTrip({ ...editedTrip, hours: e.target.value })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <h5 className="fw-bold my-2">Vehicle:</h5>
                  <input
                    type="text"
                    value={editedTrip.vehicle}
                    onChange={(e) =>
                      setEditedTrip({ ...editedTrip, vehicle: e.target.value })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleSaveEdit}
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
        </div>
      </div>
    </>
  );
};

export default ViewTrip;
