import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './ViewShareDetails.css'; // You can create a CSS file for this component

const ViewShareDetails = () => {
  const [shareDetails, setShareDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShareDetails = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/share-details');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setShareDetails(data);
      } catch (error) {
        setError('Error fetching share details: ' + error.message);
      }
    };

    fetchShareDetails();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="share-details-container">
        <div className="share-details-main-container">
          <h1>Share Details</h1>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="row">
              {shareDetails.map((shareDetail) => (
                <div key={shareDetail._id} className="col-4">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Vehicle: {shareDetail.vehicle}</h5>
                      <p className="card-text">Trip Type: {shareDetail.triptype}</p>
                      <p className="card-text">Subtype: {shareDetail.subtype}</p>
                      <p className="card-text">Pickup: {shareDetail.pickup}</p>
                      <p className="card-text">Date: {shareDetail.date}</p>
                      <p className="card-text">Time: {shareDetail.time}</p>
                      <p className="card-text">Dropoff: {shareDetail.Dropoff}</p>
                      <p className="card-text">Date1: {shareDetail.date1}</p>
                      <p className="card-text">Time1: {shareDetail.time1}</p>
                      <p className="card-text">Driver Name: {shareDetail.drivername}</p>
                      <p className="card-text">Driver Email: {shareDetail.drivermail}</p>
                      <p className="card-text">Mobile No: {shareDetail.mobileno}</p>
                      <p className="card-text">Mobile No1: {shareDetail.mobilrno1}</p>
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

export default ViewShareDetails;
