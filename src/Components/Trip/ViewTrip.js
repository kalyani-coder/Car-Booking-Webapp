import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import axios from "axios";

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
        setSuccessMessage("Trip deleted successfully.");
        setErrorMessage("");
      } catch (error) {
        console.error("Error deleting trip:", error);
        setErrorMessage("Error deleting trip: " + error.message);
      }
    }
  };

  const handleEdit = (trip) => {
    setEditedTrip({ ...trip });
    setIsEditing(true);
  };
  const handleSaveEdit = async (tripId, updatedTripData) => {
    try {
      const response = await axios.patch(
        `http://localhost:8787/api/add-trip/${tripId}`,
        updatedTripData
      );

      // Check for successful response
      if (response.status === 200) {
        console.log("Trip successfully updated", response.data);
        alert("Trip successfully updated");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle validation errors
        console.error("Validation Error:", error.response.data.message);
        alert("Validation Error: " + error.response.data.message);
      } else {
        // Handle other errors
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
  };

  return (
    <>
      <div className="customer-Add-container">
        <div className="customer-main-container mt-4">
          <h2 className="View-Corporate-Customer-Rate font-bold">View Trips</h2>

          {/* Search Bar */}
          <div className="search-bar-view-customer-enquiry">
            <input
              type="text"
              placeholder="Search by Customer Name"
              className=" p-2 rounded border width-set-for-all-view-pages-carbooking-search-box"
              value={searchCustomerName}
              onChange={(e) => setSearchCustomerName(e.target.value)}
            />
          </div>

          {/* Error Handling */}
          {error && <p>Error: {error}</p>}

          {/* Table of Trips */}
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

          {/* Modal for Selected Trip Details */}
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
                    <strong>Mobile Number 1:</strong>{" "}
                    {selectedTrip.Mobile_Number_1}
                  </p>
                  <p className="mb-2">
                    <strong>Person 2:</strong> {selectedTrip.Person_2}
                  </p>
                  <p className="mb-2">
                    <strong>Mobile Number 2:</strong>{" "}
                    {selectedTrip.Mobile_Number_2}
                  </p>
                  <p className="mb-2">
                    <strong>Person 3:</strong> {selectedTrip.Person_3}
                  </p>
                  <p className="mb-2">
                    <strong>Mobile Number 3:</strong>{" "}
                    {selectedTrip.Mobile_Number_3}
                  </p>
                  <p className="mb-2">
                    <strong>Person 4:</strong> {selectedTrip.Person_4}
                  </p>
                  <p className="mb-2">
                    <strong>Mobile Number 4:</strong>{" "}
                    {selectedTrip.Mobile_Number_4}
                  </p>
                  <p className="mb-2">
                    <strong>Person 5:</strong> {selectedTrip.Person_5}
                  </p>
                  <p className="mb-2">
                    <strong>Mobile Number 5:</strong>{" "}
                    {selectedTrip.Mobile_Number_5}
                  </p>
                  <p className="mb-2">
                    <strong>Person 6:</strong> {selectedTrip.Person_6}
                  </p>
                  <p className="mb-2">
                    <strong>Mobile Number 6:</strong>{" "}
                    {selectedTrip.Mobile_Number_6}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Modal for Editing Trip */}
          {isEditing && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 modal-main-container-section-z-index">
              <div
                className="bg-white p-4 rounded shadow-lg w-96 main-div-for-modal-container-for-all-inputs-cc"
                style={{
                  height: "80vh",
                  overflowY: "scroll",
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold">Edit Trip</h2>
                  <button
                    className="text-black-500"
                    onClick={() => setIsEditing(false)}
                  >
                    <FaTimes />
                  </button>
                </div>
                {editedTrip && (
                  <>
                    <h5 className="fw-bold my-2">Customer Name:</h5>
                    <input
                      type="text"
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
                      value={editedTrip.mobileno}
                      onChange={(e) =>
                        setEditedTrip({
                          ...editedTrip,
                          mobileno: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <h5 className="fw-bold my-2">Email:</h5>
                    <input
                      type="text"
                      value={editedTrip.email}
                      onChange={(e) =>
                        setEditedTrip({
                          ...editedTrip,
                          email: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <h5 className="fw-bold my-2">Address:</h5>
                    <input
                      type="text"
                      value={editedTrip.address}
                      onChange={(e) =>
                        setEditedTrip({
                          ...editedTrip,
                          address: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <h5 className="fw-bold my-2">Trip Type:</h5>
                    <select
                      className="share-details-input"
                      name="triptype"
                      id="triptype"
                      onChange={(e) =>
                        setEditedTrip({
                          ...editedTrip,
                          triptype: e.target.value,
                        })
                      }
                      value={editedTrip.triptype}
                    >
                      <option value="">Trip Type</option>
                      <option value="One Way Trip">One Way Trip</option>
                      <option value="Return Trip">Return Trip</option>
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    </select>
                    <h5 className="fw-bold my-2">Sub Type:</h5>
                    <select
                      className="share-details-input"
                      name="subtype"
                      id="subtype"
                      onChange={(e) =>
                        setEditedTrip({
                          ...editedTrip,
                          subtype: e.target.value,
                        })
                      }
                      value={editedTrip.subtype}
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
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    </select>
                    <h5 className="fw-bold my-2">Number of People:</h5>
                    <div>
                      {Array.from({ length: 6 }, (_, index) => (
                        <div key={index} className="flex flex-wrap mb-4">
                          <div className="w-1/2 pr-2">
                            <h5 className="fw-bold my-2">
                              Person {index + 1}:
                            </h5>
                            <input
                              type="text"
                              value={editedTrip[`Person_${index + 1}`]}
                              onChange={(e) =>
                                setEditedTrip({
                                  ...editedTrip,
                                  [`Person_${index + 1}`]: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                          <div className="w-1/2 pl-2">
                            <h5 className="fw-bold my-2">
                              Mobile Number {index + 1}:
                            </h5>
                            <input
                              type="text"
                              value={editedTrip[`Mobile_Number_${index + 1}`]}
                              onChange={(e) =>
                                setEditedTrip({
                                  ...editedTrip,
                                  [`Mobile_Number_${index + 1}`]:
                                    e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <h5 className="fw-bold my-2">Pickup Location:</h5>
                    <input
                      type="text"
                      value={editedTrip.pickup}
                      onChange={(e) =>
                        setEditedTrip({
                          ...editedTrip,
                          pickup: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <h5 className="fw-bold my-2">Date:</h5>
                    <input
                      type="date"
                      value={editedTrip.date}
                      onChange={(e) =>
                        setEditedTrip({
                          ...editedTrip,
                          date: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <h5 className="fw-bold my-2">Time:</h5>
                    <input
                      type="time"
                      value={editedTrip.time}
                      onChange={(e) =>
                        setEditedTrip({
                          ...editedTrip,
                          time: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <h5 className="fw-bold my-2">Drop Off Location:</h5>
                    <input
                      type="text"
                      value={editedTrip.dropoff}
                      onChange={(e) =>
                        setEditedTrip({
                          ...editedTrip,
                          dropoff: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <h5 className="fw-bold my-2">Date:</h5>
                    <input
                      type="date"
                      value={editedTrip.date1}
                      onChange={(e) =>
                        setEditedTrip({
                          ...editedTrip,
                          date1: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <h5 className="fw-bold my-2">Time:</h5>
                    <input
                      type="time"
                      value={editedTrip.time1}
                      onChange={(e) =>
                        setEditedTrip({
                          ...editedTrip,
                          time1: e.target.value,
                        })
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
                    <h5 className="fw-bold my-2">Total Hour:</h5>
                    <input
                      type="text"
                      value={editedTrip.hours}
                      onChange={(e) =>
                        setEditedTrip({
                          ...editedTrip,
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
                        setEditedTrip({
                          ...editedTrip,
                          vehicle: e.target.value,
                        })
                      }
                      value={editedTrip.vehicle}
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
                    <div className="mt-4">
                      <button
                        onClick={handleSaveEdit}
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
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewTrip;
