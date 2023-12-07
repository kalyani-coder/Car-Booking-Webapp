import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';


const ViewTrip = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [error, setError] = useState(null);
  const [searchCustomerName, setSearchCustomerName] = useState('');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/add-trip');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTrips(data);
        setFilteredTrips(data); // Initialize filtered data with all trips
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data: ' + error.message);
      }
    };

    fetchTrips();
  }, []);

  // Function to filter trips based on customer name
  const filterTrips = () => {
    const filteredData = trips.filter((trip) => {
      // Check if trip.customername is defined before filtering
      if (trip.customername) {
        return trip.customername.toLowerCase().includes(searchCustomerName.toLowerCase());
      } else {
        return false; // Return false if trip.customername is undefined
      }
    });

    setFilteredTrips(filteredData);
  };

  useEffect(() => {
    filterTrips();
  }, [searchCustomerName]);

  // Handlers for edit and delete
  const handleEditTrip = (tripId) => {
    // Implement your logic for editing the trip with the given ID
    console.log('Edit trip with ID:', tripId);
  };

  const handleDeleteTrip = (tripId) => {
    // Implement your logic for deleting the trip with the given ID
    console.log('Delete trip with ID:', tripId);
  };

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>View Trips</h2>
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
                  <th>Date</th>
                  <th>Time</th>
                  <th>Drop Off</th>
                  <th>Date 1</th>
                  <th>Time 1</th>
                  <th>Total Days</th>
                  <th>Hours</th>
                  <th>Type of Vehicle</th>
                  {/* Add other table headers as needed */}
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
                    <td>{trip.date}</td>
                    <td>{trip.time}</td>
                    <td>{trip.dropoff}</td>
                    <td>{trip.date1}</td>
                    <td>{trip.time1}</td>
                    <td>{trip.totaldays}</td>
                    <td>{trip.hours}</td>
                    <td>{trip.vehicle}</td>
                    {/* Add other table cells as needed */}
                    <td>
                      <button className='btn btn-info' onClick={() => handleEditTrip(trip._id)}>
                        <FaEdit />
                      </button>
                      <button className='btn btn-danger' onClick={() => handleDeleteTrip(trip._id)}>
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
    </>
  );
};

export default ViewTrip;
