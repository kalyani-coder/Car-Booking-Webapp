import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
// import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Table } from 'react-bootstrap';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';


const ViewStartEndDetails = () => {
  const [shareDetails, setShareDetails] = useState([]);
  const [filteredShareDetails, setFilteredShareDetails] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedShareDetail, setEditedShareDetail] = useState(null);

  useEffect(() => {
    const fetchShareDetails = async () => {
      try {
        const response = await fetch('http://localhost:10000/api/getDetails-fromDriver');
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

  
  const handleEditShareDetail = (shareDetail) => {
    // Implement your edit functionality here
    console.log(`Editing share detail with ID: ${shareDetail._id}`);
  };

  const handleSaveShareDetail = (shareDetail) => {
    // Implement your save functionality here
    console.log(`Saving share detail with ID: ${shareDetail._id}`);
  };

 const handleCloseEdit = () => {
    setEditMode(false);
    setEditedShareDetail(null);
  };

  const handleDeleteShareDetail = async (shareDetail) => {
    const confirmed = window.confirm("Do you want to delete this share detail?");
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:10000/api/getDetails-fromDriver/${shareDetail._id}`,
          {
            method: "DELETE",
          }
        );
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const updatedShareDetails = shareDetails.filter(
          (detail) => detail._id !== shareDetail._id
        );
  
        setShareDetails(updatedShareDetails);
        setFilteredShareDetails(updatedShareDetails);
  
        alert("Share detail deleted successfully");
      } catch (error) {
        console.error("Error deleting share detail:", error);
        setError("Error deleting share detail: " + error.message);
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedShareDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Sidebar />
      <div className="share-details-container">
        <div className="share-details-main-container">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>View Driver Trip Details</h2>
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
            <Table>
              <thead>
                <tr>
                  <th>Driver Name</th>
                  <th>Pickup Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Drop Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Total Days</th>
                  <th>Total Hours</th>
                  <th>Trip Type</th>
                  <th>Trip Sub Type</th>
                  <th>Mobile No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShareDetails.map((shareDetail) => (
                  <tr key={shareDetail._id}>
                    <td>{shareDetail.drivername}</td>
                    <td>{shareDetail.pickup}</td>
                    <td>{shareDetail.date}</td>
                    <td>{shareDetail.time}</td>
                    <td>{shareDetail.Dropoff}</td>
                    <td>{shareDetail.date1}</td>
                    <td>{shareDetail.time1}</td>
                    <td>{shareDetail.totalDays}</td>
                    <td>{shareDetail.totalHours}</td>
                    <td>{shareDetail.triptype}</td>
                    <td>{shareDetail.subtype}</td>
                    <td>{shareDetail.mobileno}</td>
                    <td>
                      <div className="d-flex justify-content-between">
                        {/* <button
                          className='btn btn-info btn-sm'
                          onClick={() => handleEditShareDetail(shareDetail)}
                        >
                          <FaEdit /> */}
                        {/* </button> */}
                        {/* <button
                          className='btn btn-success btn-sm'
                          onClick={() => handleSaveShareDetail(shareDetail)}
                        >
                           <FaSave />
                        </button> */}
                        <button
                          className='btn btn-danger btn-sm'
                          onClick={() => handleDeleteShareDetail(shareDetail)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
           {/* Display the Edit Modal when in edit mode */}
           <Modal show={editMode} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Share Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formPickupLocation">
                  <Form.Label>Pickup Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter pickup location"
                    name="pickuplocation"
                    value={editedShareDetail?.pickuplocation || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                {/* Add more form fields based on your schema */}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSaveShareDetail}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ViewStartEndDetails;
