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
  const [successMessage, setSuccessMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const [selectedTrip, setSelectedTrip] = useState(null); 

  const [formData, setFormData] = useState({
    members: 1,
    people: [{ name: "", mobile: "" }],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePersonChange = (index, e) => {
    const updatedPeople = [...formData.people];
    updatedPeople[index] = {
      ...updatedPeople[index],
      [e.target.name]: e.target.value,
    };
    setFormData({
      ...formData,
      people: updatedPeople,
    });
  };

  const addPerson = () => {
    if (formData.people.length < 6) {
      setFormData({
        ...formData,
        people: [...formData.people, { name: "", mobile: "" }],
      });
    } else {
      alert("You can add up to 6 people.");
    }
  };

  const handleCancel = () => {
    window.close();

    // If window.close() didn't work, you can try using the following:
    if (window.opener) {
      // If the window has an opener (likely opened with window.open()), close the opener
      window.opener = null;
      window.open("", "_self", "");
      window.close();
    } else {
      // If there is no opener (likely not opened with window.open()), navigate back in history
      window.history.back();
    }

    console.log("Cancel button clicked");
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(
          "http://localhost:8787/api/add-trip"
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
        `http://localhost:8787/api/add-trip/${editedTrip._id}`,
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
          prevTrips.map((trip) => (trip._id === editedTrip._id ? editedTrip : trip))
        );
        setIsEditing(false);
        setSuccessMessage("Data updated successfully.");
        setErrorMessage(""); // Clear any previous error message
      } else {
        console.error("Error updating trip:", response.status);
        setSuccessMessage(""); // Clear any previous success message
        setErrorMessage("Error updating trip. Please try again.");
      }
    } catch (error) {
      console.error("Error updating trip:", error);
      setSuccessMessage(""); // Clear any previous success message
      setErrorMessage("Error updating trip. Please try again.");
    }
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };


  const fetchTripDetails = async (tripId) => {
    try {
      const response = await fetch(`http://localhost:8787/api/add-trip/${tripId}`);
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

  const handleViewMore = (tripId) => {
    fetchTripDetails(tripId);
  };

  const handleCloseModal = () => {
    setSelectedTrip(null);
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
          {/* Other JSX code */}
          {selectedTrip && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded shadow-lg w-96" style={{ width: "50%", maxHeight: "80vh", overflowY: "auto" }}>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Trip Details</h2>
                  <button className="text-black-500" onClick={handleCloseModal}>
                    <FaTimes />
                  </button>
                </div>
                <div className="mt-4">
                <p><strong>Customer Name:</strong> {selectedTrip.customername}</p>
      <p className="mb-2"><strong>Mobile No:</strong> {selectedTrip.mobileno}</p>
      <p className="mb-2"><strong>Email:</strong> {selectedTrip.email}</p>
      <p className="mb-2"><strong>Address:</strong> {selectedTrip.address}</p>
      <p className="mb-2"><strong>Trip Type:</strong> {selectedTrip.triptype}</p>
      <p className="mb-2"><strong>Sub Type:</strong> {selectedTrip.subtype}</p>
      <p className="mb-2"><strong>Pickup:</strong> {selectedTrip.pickup}</p>
      <p className="mb-2"><strong>Date:</strong> {selectedTrip.date}</p>
      <p className="mb-2"><strong>Time:</strong> {selectedTrip.time}</p>
      <p className="mb-2"><strong>Drop Off Location:</strong> {selectedTrip.dropoff}</p>
      <p className="mb-2"><strong>Date:</strong> {selectedTrip.date1}</p>
      <p className="mb-2"><strong>Time:</strong> {selectedTrip.time1}</p>
      <p className="mb-2"><strong>Total Days:</strong> {selectedTrip.totaldays}</p>
      <p className="mb-2"><strong>Total Hour:</strong> {selectedTrip.hours}</p>
      <p className="mb-2"><strong>Type of Vehicle:</strong> {selectedTrip.vehicle}</p>
      <p className="mb-2"><strong>Person 1:</strong> {selectedTrip.Person_1}</p>
      <p className="mb-2"><strong>Mobile Number 1:</strong> {selectedTrip.Mobile_Number_1}</p>
      <p className="mb-2"><strong>Person 2:</strong> {selectedTrip.Person_2}</p>
      <p className="mb-2"><strong>Mobile Number 2:</strong> {selectedTrip.Mobile_Number_2}</p>
      <p className="mb-2"><strong>Person 3:</strong> {selectedTrip.Person_3}</p>
      <p className="mb-2"><strong>Mobile Number 3:</strong> {selectedTrip.Mobile_Number_3}</p>
      <p className="mb-2"><strong>Person 4:</strong> {selectedTrip.Person_4}</p>
      <p className="mb-2"><strong>Mobile Number 4:</strong> {selectedTrip.Mobile_Number_4}</p>
      <p className="mb-2"><strong>Person 5:</strong> {selectedTrip.Person_5}</p>
      <p className="mb-2"><strong>Mobile Number 5:</strong> {selectedTrip.Mobile_Number_5}</p>
      <p className="mb-2"><strong>Person 6:</strong> {selectedTrip.Person_6}</p>
      <p className="mb-2"><strong>Mobile Number 6:</strong> {selectedTrip.Mobile_Number_6}</p>
    </div>
              </div>
            </div>
          )}
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
                  <th>Sr. No.</th>
                  <th>Customer Name</th>
                  <th>Mobile No</th>
                  {/* <th>Email</th> */}
                  <th>Address</th>
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
                    {/* <td>{trip.email}</td> */}
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
                            <div className="form-container">
                              <div className="flex justify-between items-center mb-2">
                                <h2 className="text-2xl font-bold">
                                  Edit Trip
                                </h2>
                                <button
                                  onClick={handleCancel}
                                  className="cancel-button"
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
                                <option value="One Way Trip">
                                  One Way Trip
                                </option>
                                <option value="Return Trip">Return Trip</option>
                                className="w-full p-2 mb-2 border
                                border-gray-300 rounded"
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
                                className="w-full p-2 mb-2 border
                                border-gray-300 rounded"
                              </select>
                              <div className="trip-form-group">
                                <label
                                  htmlFor="numberOfPeople"
                                  className="trip-form-label"
                                >
                                  Number of People:
                                </label>
                                <select
                                  className="form-control-add-trip-input1"
                                  name="numberof_people"
                                  value={editedTrip.numberof_people}
                                  onChange={(e) =>
                                    setEditedTrip({
                                      ...editedTrip,
                                      numberof_people: e.target.value,
                                    })
                                  }
                                >
                                  {[1, 2, 3, 4, 5, 6].map((number) => (
                                    <option key={number} value={number}>
                                      {number}
                                    </option>
                                  ))}
                                </select>
                              </div>
                             
                              {/* Editable fields for each person */}
                              <div className="d-flex flex-wrap gap-3">
                                {Array.from(
                                  {
                                    length: Math.ceil(
                                      editedTrip.numberof_people / 2
                                    ),
                                  },
                                  (_, rowIndex) => (
                                    <div
                                      key={rowIndex}
                                      className="d-flex gap-3"
                                    >
                                      {Array.from(
                                        { length: 2 },
                                        (_, colIndex) => {
                                          const personIndex =
                                            rowIndex * 2 + colIndex;
                                          return personIndex <
                                            editedTrip.numberof_people ? (
                                            <div
                                              key={personIndex}
                                              className="trip-person-row"
                                            >
                                              <label
                                                htmlFor={`name${
                                                  personIndex + 1
                                                }`}
                                                className="trip-form-label"
                                              >
                                                Name {personIndex + 1}:
                                              </label>
                                              <input
                                                type="text"
                                                id={`name${personIndex + 1}`}
                                                name={`name${personIndex + 1}`}
                                                value={
                                                  editedTrip[
                                                    `name${personIndex + 1}`
                                                  ] || ""
                                                }
                                                onChange={(e) =>
                                                  setEditedTrip({
                                                    ...editedTrip,
                                                    [`name${personIndex + 1}`]:
                                                      e.target.value,
                                                  })
                                                }
                                                className="form-control-add-trip-input1"
                                              />

                                              <label
                                                htmlFor={`mobile${
                                                  personIndex + 1
                                                }`}
                                                className="trip-form-label"
                                              >
                                                Mobile No :
                                              </label>
                                              <input
                                                type="text"
                                                id={`mobile${personIndex + 1}`}
                                                name={`mobile${
                                                  personIndex + 1
                                                }`}
                                                value={
                                                  editedTrip[
                                                    `mobile${personIndex + 1}`
                                                  ] || ""
                                                }
                                                onChange={(e) =>
                                                  setEditedTrip({
                                                    ...editedTrip,
                                                    [`mobile${
                                                      personIndex + 1
                                                    }`]: e.target.value,
                                                  })
                                                }
                                                className="form-control-add-trip-input1"
                                              />

                                            </div>
                                          ) : null;
                                        }
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                              <h5 className="fw-bold my-2">
                                Pickup Location:
                              </h5>
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
                              <h5 className="fw-bold my-2">
                                Drop Off Location:
                              </h5>
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
                            </div>
                            <div className="mt-4">
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
                        </div>
                      ) : (
                        <>
                          <div className="d-flex align-items-center gap-2">
                          <button className="btn btn-primary" onClick={() => handleViewMore(trip._id)}>
                        View More
                      </button>
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
                          </div>
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
