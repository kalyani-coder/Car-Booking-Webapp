import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
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
            <div className="grid grid-cols-3 gap-4">
              {filteredShareDetails.map((shareDetail) => (
                <div key={shareDetail._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="p-4">
                    <h5 className="font-semibold ">Vehicle: {shareDetail.vehicle}</h5>
                    <p className="mb-2">Trip Type: {shareDetail.triptype}</p>
                    <p className="mb-2">Subtype: {shareDetail.subtype}</p>
                    <p className="mb-2">Pickup: {shareDetail.pickuplocation}</p>
                    <p className="mb-2">Date: {shareDetail.date}</p>
                    <p className="mb-2">Time: {shareDetail.time}</p>
                    <p className="mb-2">Dropoff: {shareDetail.dropofflocation}</p>
                    <p className="mb-2">Date1: {shareDetail.date1}</p>
                    <p className="mb-2">Time1: {shareDetail.time1}</p>
                    <p className="mb-2">Driver Name: {shareDetail.drivername}</p>
                    <p className="mb-2">Driver Email: {shareDetail.mail}</p>
                    <p className="mb-2">Mobile No: {shareDetail.mobileno}</p>
                    {/* <p className="mb-2">Mobile No1: {shareDetail.mobilrno1}</p> */}
                    {/* Add other fields as needed */}
                    <div className="flex justify-between">


                      <button className='btn btn-info'>Edit</button>
                      <button className='btn btn-danger'>Save</button>
                      <button className='btn btn-success' onClick={() => handleDelete(shareDetail._id)}>Delete</button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewAllocateTrip;
