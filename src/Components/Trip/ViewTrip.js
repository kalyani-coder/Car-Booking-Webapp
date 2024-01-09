import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const ViewTrip = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [error, setError] = useState(null);
  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTrip, setEditedTrip] = useState({}); // Initialize with an empty object

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(
          "https://carbooking-backend-fo78.onrender.com/api/add-trip"
        );
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

  const filterTrips = () => {
    const filteredData = trips.filter((trip) => {
      if (trip.customername) {
        return trip.customername
          .toLowerCase()
          .includes(searchCustomerName.toLowerCase());
      } else {
        return false;
      }
    });

    setFilteredTrips(filteredData);
  };

  useEffect(() => {
    filterTrips();
  }, [searchCustomerName]);

  const handleEditTrip = (tripId) => {
    const tripToEdit = trips.find((trip) => trip._id === tripId);
    setEditedTrip({ ...tripToEdit });
    setIsEditing(true);
  };

  const handleDeleteTrip = async (tripId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trip?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `https://carbooking-backend-fo78.onrender.com/api/add-trip/${tripId}`,
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
        alert("Trip deleted successfully");
      } catch (error) {
        console.error("Error deleting trip:", error);
        setError("Error deleting trip: " + error.message);
      }
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `https://carbooking-backend-fo78.onrender.com/api/add-trip/${editedTrip._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedTrip),
        }
      );

      if (response.ok) {
        setTrips((prevTrips) =>
          prevTrips.map((trip) =>
            trip._id === editedTrip._id ? editedTrip : trip
          )
        );
        setIsEditing(false);
      } else {
        console.error("Error updating trip:", response.status);
      }
    } catch (error) {
      console.error("Error updating trip:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
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
            View Trips
          </h2>
          <div className="p-4 space-y-4">
            <input
              type="text"
              placeholder="Search by Customer Name"
              className="w-full p-2 rounded border"
              value={searchCustomerName}
              onChange={(e) => setSearchCustomerName(e.target.value)}
            />
          </div>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Mobile No</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Trip Type</th>
                  <th>Sub Type</th>
                  <th>Pickup</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrips.map((trip) => (
                  <tr key={trip._id}>
                    <td>{trip.customername}</td>
                    <td>{trip.mobileno}</td>
                    <td>{trip.email}</td>
                    <td>{trip.address}</td>
                    <td>{trip.triptype}</td>
                    <td>{trip.subtype}</td>
                    <td>{trip.pickup}</td>
                    <td>
                      {editedTrip && editedTrip._id === trip._id ? (
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
                              <h2 className="text-2xl font-bold">Edit Trip</h2>
                              <button
                                onClick={() => setIsEditing(false)}
                                className="close-icon"
                              >
                                <FaTimes />
                              </button>
                            </div>

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
                              className="w-full p-2 mb-2 border border-gray-300
                              rounded"
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
                              <option value="Outstation Trip">
                                Outstation Trip
                              </option>
                              <option value="Outstation Local Trip">
                                Outstation Local Trip
                              </option>
                              <option value="Outstation Outstation Trip">
                                Outstation Outstation Trip
                              </option>
                              className="w-full p-2 mb-2 border border-gray-300
                              rounded"
                            </select>
                            <h5 className="fw-bold my-2">pickup:</h5>
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
                                  address: e.target.value,
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
                                  email: e.target.value,
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
                                  address: e.target.value,
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
                                  address: e.target.value,
                                })
                              }
                              className="w-full p-2 mb-2 border border-gray-300 rounded"
                            />
                            <h5 className="fw-bold my-2">Total Days:</h5>
                            <input
                              type="date"
                              value={editedTrip.totaldays}
                              onChange={(e) =>
                                setEditedTrip({
                                  ...editedTrip,
                                  address: e.target.value,
                                })
                              }
                              className="w-full p-2 mb-2 border border-gray-300 rounded"
                            />
                            <h5 className="fw-bold my-2">Total Hour:</h5>
                            <input
                              type="time"
                              value={editedTrip.hours}
                              onChange={(e) =>
                                setEditedTrip({
                                  ...editedTrip,
                                  address: e.target.value,
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
                              <option value="AC Bus 13-Seater">
                                AC Bus 13-Seater
                              </option>
                              <option value="AC Bus 17-Seater">
                                AC Bus 17-Seater
                              </option>
                              <option value="AC Bus 20-Seater">
                                AC Bus 20-Seater
                              </option>
                              <option value="AC Bus 32-Seater">
                                AC Bus 32-Seater
                              </option>
                              <option value="AC Bus 35-Seater">
                                AC Bus 35-Seater
                              </option>
                              <option value="AC Bus 40-Seater">
                                AC Bus 40-Seater
                              </option>
                              <option value="AC Bus 45-Seater">
                                AC Bus 45-Seater
                              </option>
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
                            <button
                              onClick={handleSaveEdit}
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
                      ) : (
                        <>
                          <button
                            className="btn btn-info"
                            onClick={() => handleEditTrip(trip._id)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteTrip(trip._id)}
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewTrip;
