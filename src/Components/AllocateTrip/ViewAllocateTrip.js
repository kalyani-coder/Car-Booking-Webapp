import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ViewAllocateTrip.css';


const ViewAllocateTrip = () => {
  const [shareDetails, setShareDetails] = useState([]);
  const [filteredShareDetails, setFilteredShareDetails] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchShareDetails = async () => {
      try {
        const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/trip-details');
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        const data = await response.json();
        setShareDetails(data);
        setFilteredShareDetails(data);
        setError(null); // Reset the error state
      } catch (error) {
        setError('Error fetching share details: ' + error.message);
      }
    };

    fetchShareDetails();
  }, []);

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

  // Delete Allocate trips 
  const handleDelete = (_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this trip?");
    if (confirmed) {
      try {
        fetch(`https://carbooking-backend-fo78.onrender.com/api/trip-details/${_id}`, {
          method: 'DELETE',
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          setShareDetails((prevDetails) => prevDetails.filter(detail => detail._id !== _id));
          alert('Trip successfully deleted');
        })
        .catch(error => {
          setError('Error deleting allocate trip: ' + error.message);
        });
      } catch (error) {
        setError('Error deleting allocate trip: ' + error.message);
      }
    }
  };

  return (
    <>
      <Sidebar />
      <div className="share-details-container">
        <div className="share-details-main-container">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>View Allocate Trips</h2>
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
                  <th>Vehicle</th>
                  <th>Trip Type</th>
                  <th>Subtype</th>
                  <th>Pickup</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Dropoff</th>
                  <th>Date1</th>
                  <th>Time1</th>
                  <th>Driver Name</th>
                  <th>Driver Email</th>
                  <th>Mobile No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShareDetails.map((shareDetail) => (
                  <tr key={shareDetail._id}>
                    <td>{shareDetail.vehicle}</td>
                    <td>{shareDetail.triptype}</td>
                    <td>{shareDetail.subtype}</td>
                    <td>{shareDetail.pickuplocation}</td>
                    <td>{shareDetail.date}</td>
                    <td>{shareDetail.time}</td>
                    <td>{shareDetail.dropofflocation}</td>
                    <td>{shareDetail.date1}</td>
                    <td>{shareDetail.time1}</td>
                    <td>{shareDetail.drivername}</td>
                    <td>{shareDetail.mail}</td>
                    <td>{shareDetail.mobileno}</td>
                    <td>
                    <button className='btn btn-info'>
                      <FaEdit />
                    </button>
                    <button className='btn btn-danger' onClick={() => handleDelete(shareDetail._id)}>
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

export default ViewAllocateTrip;
