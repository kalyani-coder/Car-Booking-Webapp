import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
// import "./ViewAllocateTrip.css";

const ViewAllocateTrip = () => {
  const [shareDetails, setShareDetails] = useState([]);
  const [filteredShareDetails, setFilteredShareDetails] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [editedTrip, setEditedTrip] = useState({
    _id: "",
    pickuplocation: "",
    date: "",
    time: "",
    dropofflocation: "",
    date1: "",
    time1: "",
    vehicle: "",
    triptype: "",
    subtype: "",
    drivername: "",
    mail: "",
    mobileno: "",
    address: "",
    vehicleno: "",
  });
  const [vehicleDetails, setVehicleDetails] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:8787/api/add-trip");
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        const data = await response.json();
        setCustomers(data.customers);
        setError(null);
      } catch (error) {
        setError("Error fetching customer names: " + error.message);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchShareDetails = async () => {
      try {
        const response = await fetch("http://localhost:8787/api/trip-details");
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        const data = await response.json();
        setShareDetails(data);
        setFilteredShareDetails(data);
        setError(null);
      } catch (error) {
        setError("Error fetching share details: " + error.message);
      }
    };

    fetchShareDetails();
  }, []);

  useEffect(() => {
    const tripDetailsToFetch = {
      triptype: "One Way Trip",
      subtype: "Outstation Trip",
      pickup: "", // Provide the actual pickup value
      date: "2024-01-24",
      time: "16:19",
      dropoff: "pune",
      date1: "2024-01-09",
      time1: "19:16",
    };

    fetchVehicleDetails(tripDetailsToFetch);
  }, []); // You may adjust the dependency array based on your needs

  const fetchVehicleDetails = async (tripDetails) => {
    try {
      const response = await fetch("http://localhost:8787/api/trip-details", {
        method: "GET", // Assuming the API requires a POST request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripDetails),
      });

      if (!response.ok) {
        throw Error("Network response was not ok");
      }

      const data = await response.json();

      setVehicleDetails(data.vehicleDetails);
      setError(null);
    } catch (error) {
      setError("Error fetching vehicle details: " + error.message);
    }
  };

  const filterShareDetails = () => {
    const filteredData = shareDetails.filter((shareDetail) => {
      const searchTextLower = searchText.toLowerCase();
      return (
        shareDetail.date.includes(searchTextLower) ||
        shareDetail.drivername.toLowerCase().includes(searchTextLower)
      );
    });

    setFilteredShareDetails(filteredData);
  };

  useEffect(() => {
    filterShareDetails();
  }, [searchText]);

  const handleEdit = (_id) => {
    setEditingId(_id);

    fetch(`http://localhost:8787/api/trip-details/${_id}`)
      .then((response) => response.json())
      .then((data) => {
        setEditedTrip(data);
      })
      .catch((error) => {
        setError("Error fetching trip details for editing: " + error.message);
      });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8787/api/trip-details/${editingId._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedTrip),
        }
      );
  
      if (response.ok) {
        const updatedTrip = await response.json();
        setShareDetails((prevDetails) =>
          prevDetails.map((detail) =>
            detail._id === editingId ? updatedTrip : detail
          )
        );
        setFilteredShareDetails((prevDetails) =>
          prevDetails.map((detail) =>
            detail._id === editingId ? updatedTrip : detail
          )
        );
        alert("Trip details successfully updated!");
      } else {
        console.error("Error updating trip details:", response.status);
        alert("Error updating trip details. Please try again.");
      }
    } catch (error) {
      console.error("Error updating trip details:", error);
      alert("Error updating trip details. Please try again.");
    }
  };
  
  
  

  const handleDelete = (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trip?"
    );
    if (confirmed) {
      try {
        fetch(`http://localhost:8787/api/trip-details/${_id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            setShareDetails((prevDetails) =>
              prevDetails.filter((detail) => detail._id !== _id)
            );
            alert("Trip successfully deleted");
          })
          .catch((error) => {
            setError("Error deleting allocate trip: " + error.message);
          });
      } catch (error) {
        setError("Error deleting allocate trip: " + error.message);
      }
    }
  };

  return (
    <>
      <Sidebar />
      <div className="share-details-container h-[100vh]">
        <div className="share-details-main-container">
          <h2
            className="text-center mt-2"
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            View Allocate Trips
          </h2>
          <div className="p-4 space-y-4">
            <input
              type="text"
              placeholder="Search by date or driver name"
              className="w-full p-2 rounded border"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Vehicle</th>
                  <th>Trip Type</th>
                  <th>Subtype</th>
                  <th>Pickup</th>
                  {/* <th>Date</th>
                  <th>Time</th> */}
                  <th>Dropoff</th>
                  {/* <th>Date1</th>
                  <th>Time1</th> */}
                  <th>Driver Name</th>
                  {/* <th>Driver Email</th> */}
                  <th>Mobile No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShareDetails.map((shareDetail) => (
                  <tr key={shareDetail._id}>
                    <td>{shareDetail.customername}</td>
                    <td>{shareDetail.vehicle}</td>
                    <td>{shareDetail.triptype}</td>
                    <td>{shareDetail.subtype}</td>
                    <td>{shareDetail.pickuplocation}</td>
                    {/* <td>{shareDetail.date}</td>
                    <td>{shareDetail.time}</td> */}
                    <td>{shareDetail.dropofflocation}</td>
                    {/* <td>{shareDetail.date1}</td>
                    <td>{shareDetail.time1}</td> */}
                    <td>{shareDetail.drivername}</td>
                    {/* <td>{shareDetail.mail}</td> */}
                    <td>{shareDetail.customermobile}</td>
                    <td>
                      {editingId === shareDetail._id ? (
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
                                  Edit Allocate Trip
                                </h2>
                                <button
                                  onClick={handleCancelEdit}
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
                              /> <h5 className="fw-bold my-2">Customer Mobile No:</h5>
                              <input
                                type="text"
                                value={editedTrip.customermobile}
                                onChange={(e) =>
                                  setEditedTrip({
                                    ...editedTrip,
                                    customermobile: e.target.value,
                                  })
                                }
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                              />
                              <h5 className="fw-bold my-2">Pickup Location:</h5>
                              <input
                                type="text"
                                value={editedTrip.pickuplocation}
                                onChange={(e) =>
                                  setEditedTrip({
                                    ...editedTrip,
                                    pickuplocation: e.target.value,
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
                                Dropoff Location:
                              </h5>
                              <input
                                type="text"
                                value={editedTrip.dropofflocation}
                                onChange={(e) =>
                                  setEditedTrip({
                                    ...editedTrip,
                                    dropofflocation: e.target.value,
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
                                {vehicleDetails.map((vehicle) => (
                                  <option
                                    key={vehicle._id}
                                    value={vehicle.vehicleType}
                                  >
                                    {vehicle.vehicleType}
                                  </option>
                                ))}
                              </select>
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
                              <h5 className="fw-bold my-2">Driver Name:</h5>
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

                              <h5 className="fw-bold my-2">Mail:</h5>
                              <input
                                type="text"
                                value={editedTrip.mail}
                                onChange={(e) =>
                                  setEditedTrip({
                                    ...editedTrip,
                                    mail: e.target.value,
                                  })
                                }
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                              />
                              <h5 className="fw-bold my-2">Mobile No:</h5>
                              <input
                                type="number"
                                value={editedTrip.mobileno}
                                onChange={(e) =>
                                  setEditedTrip({
                                    ...editedTrip,
                                    mobileno: e.target.value,
                                  })
                                }
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                              />
                              <h5 className="fw-bold my-2">Driver Address:</h5>
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
                              <h5 className="fw-bold my-2">Vehicle Number:</h5>
                              <input
                                type="text"
                                value={editedTrip.vehicleno}
                                onChange={(e) =>
                                  setEditedTrip({
                                    ...editedTrip,
                                    vehicleno: e.target.value,
                                  })
                                }
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                              />
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
                            <button
                              className="btn btn-info"
                              onClick={() => handleEdit(shareDetail._id)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(shareDetail._id)}
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

export default ViewAllocateTrip;
