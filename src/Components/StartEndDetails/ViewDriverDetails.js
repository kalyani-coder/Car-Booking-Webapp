import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "jspdf-autotable";
import { Table } from "react-bootstrap";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import "./ViewDriverDetails.css"

const ViewStartEndDetails = () => {
  const [shareDetails, setShareDetails] = useState([]);
  const [filteredShareDetails, setFilteredShareDetails] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedShareDetail, setEditedShareDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchShareDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:8787/api/getDetails-fromDriver"
        );
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        const data = await response.json();
        setShareDetails(data);
        setFilteredShareDetails(data);
        setError(null); // Reset the error state
      } catch (error) {
        setError("Error fetching share details: " + error.message);
      }
    };

    fetchShareDetails();
  }, []);

  const filterShareDetails = () => {
    const filteredData = shareDetails.filter((shareDetail) => {
      const searchTextLower = searchText.toLowerCase();
      return (
        shareDetail.date.toLowerCase().includes(searchTextLower) ||
        shareDetail.drivername.toLowerCase().includes(searchTextLower)
      );
    });

    setFilteredShareDetails(filteredData);
  };

  useEffect(() => {
    filterShareDetails();
  }, [searchText, shareDetails]);

  const handleEditShareDetail = (shareDetail) => {
    setEditedShareDetail(shareDetail);
    setEditMode(true);
  };

  const handleSaveShareDetail = async () => {
    try {
      const response = await fetch(
        `http://localhost:8787/api/getDetails-fromDriver/${editedShareDetail._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedShareDetail),
        }
      );
  
      if (response.ok) {
        const updatedDetail = await response.json();
  
        // Optimistically update state
        setShareDetails((prevDetails) =>
          prevDetails.map((detail) =>
            detail._id === updatedDetail._id ? updatedDetail : detail
          )
        );
        setFilteredShareDetails((prevDetails) =>
          prevDetails.map((detail) =>
            detail._id === updatedDetail._id ? updatedDetail : detail
          )
        );
  
        // Reset edit mode and edited detail
        setEditMode(false);
        setEditedShareDetail(null);
  
        // Show success message
        alert("Share detail updated successfully");
        setErrorMessage(''); // Clear any error messages
      } else {
        console.error("Error updating share detail:", response.status);
        setErrorMessage("Error updating share detail. Please try again."); // Set error message
      }
    } catch (error) {
      console.error("Error updating share detail:", error);
      setErrorMessage("Error updating share detail. Please try again."); // Set error message
    }
  };
  
  
  
  

  const handleCloseEdit = () => {
    setEditMode(false);
    setEditedShareDetail(null);
  };

  const handleDeleteShareDetail = async (shareDetail) => {
    const confirmed = window.confirm(
      "Do you want to delete this share detail?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:8787/api/getDetails-fromDriver/${shareDetail._id}`,
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
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            View Driver Trip Details
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
            <Table>
              <thead>
                <tr>
                  <th>Customer Name</th>
                  {/* <th>Driver Name</th> */}
                  <th>Pickup Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Drop Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  {/* <th>Total Days</th> */}
                  {/* <th>Total Hours</th> */}
                  <th>Trip Type</th>
                  <th>Trip Sub Type</th>
                  <th>Mobile No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShareDetails.map((shareDetail) => (
                  <tr key={shareDetail._id}>
                    <td>{shareDetail.customername}</td>
                    {/* <td>{shareDetail.drivername}</td> */}
                    <td>{shareDetail.pickup}</td>
                    <td>{shareDetail.date}</td>
                    <td>{shareDetail.time}</td>
                    <td>{shareDetail.Dropoff}</td>
                    <td>{shareDetail.date1}</td>
                    <td>{shareDetail.time1}</td>
                    {/* <td>{shareDetail.totalDays}</td> */}
                    {/* <td>{shareDetail.totalHours}</td> */}
                    <td>{shareDetail.triptype}</td>
                    <td>{shareDetail.subtype}</td>
                    <td>{shareDetail.mobileno}</td>
                    <td>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => handleEditShareDetail(shareDetail)}
                        >
                          <FaEdit />
                        </button>
                        {/* <button
                          className='btn btn-success btn-sm'
                          onClick={handleSaveShareDetail}
                          disabled={editedShareDetail?._id !== shareDetail._id}
                        >
                          <FaSave />
                        </button> */}
                        <button
                          className="btn btn-danger btn-sm"
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
          <Modal
            show={editMode}
            onHide={handleCloseEdit}
            dialogClassName="modal-lg"
          >
            <Modal.Header className="d-flex justify-content-between align-items-center">
              <Modal.Title>Edit Driver Trip Detail</Modal.Title>
              <button
                onClick={handleCloseEdit}
                className="close-icon btn btn-link"
              >
                <FaTimes />
              </button>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formcustomername" className="mb-3">
                  <Form.Label>Customer Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="customername"
                    value={editedShareDetail?.customername || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formcustomermobile" className="mb-3">
                  <Form.Label>Customer Mobile No.:</Form.Label>
                  <Form.Control
                    type="text"
                    name="customermobile"
                    value={editedShareDetail?.customermobile || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formvehicle" className="mb-3">
                  <Form.Label>Type Of Vehicle:</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicle"
                    value={editedShareDetail?.vehicle || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formPickupLocation" className="mb-3">
                  <Form.Label>Pickup Location:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter pickup location"
                    name="pickup"
                    value={editedShareDetail?.pickup || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDropoffLocation" className="mb-3">
                  <Form.Label>Dropoff Location:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter dropoff location"
                    name="Dropoff"
                    value={editedShareDetail?.Dropoff || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDate" className="mb-3">
                  <Form.Label>Date:</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={editedShareDetail?.date || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formTime" className="mb-3">
                  <Form.Label>Time:</Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    value={editedShareDetail?.time || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDate1" className="mb-3">
                  <Form.Label>Drop Date:</Form.Label>
                  <Form.Control
                    type="date"
                    name="date1"
                    value={editedShareDetail?.date1 || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formTime1" className="mb-3">
                  <Form.Label>Drop Time:</Form.Label>
                  <Form.Control
                    type="time"
                    name="time1"
                    value={editedShareDetail?.time1 || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formTotalDays" className="mb-3">
                  <Form.Label>Total Days:</Form.Label>
                  <Form.Control
                    type="number"
                    name="totalDays"
                    value={editedShareDetail?.totalDays || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formTotalHours" className="mb-3">
                  <Form.Label>Total Hours:</Form.Label>
                  <Form.Control
                    type="number"
                    name="totalHours"
                    value={editedShareDetail?.totalHours || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formTripType" className="mb-3">
                  <Form.Label>Trip Type:</Form.Label>
                  <Form.Control
                    type="text"
                    name="triptype"
                    value={editedShareDetail?.triptype || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formSubtype" className="mb-3">
                  <Form.Label>Trip Sub Type:</Form.Label>
                  <Form.Control
                    type="text"
                    name="subtype"
                    value={editedShareDetail?.subtype || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formdrivername" className="mb-3">
                  <Form.Label>Driver Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="drivername"
                    value={editedShareDetail?.drivername || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formMobileno" className="mb-3">
                  <Form.Label>Driver Mobile No:</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobileno"
                    value={editedShareDetail?.mobileno || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formvehicleno" className="mb-3">
                  <Form.Label>Vehicle No:</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleno"
                    value={editedShareDetail?.vehicleno || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formtoll" className="mb-3">
                  <Form.Label>Toll:</Form.Label>
                  <Form.Control
                    type="text"
                    name="toll"
                    value={editedShareDetail?.toll || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formallowance" className="mb-3">
                  <Form.Label>Allowance:</Form.Label>
                  <Form.Control
                    type="text"
                    name="allowance"
                    value={editedShareDetail?.allowance || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formnightstay" className="mb-3">
                  <Form.Label>Night Stay:</Form.Label>
                  <Form.Control
                    type="text"
                    name="nightstay"
                    value={editedShareDetail?.nightstay || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="px-4 py-2 ml-2 bg-red-500 text-white rounded"
                onClick={handleCloseEdit}
              >
                Cancel
              </Button>
              <Button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSaveShareDetail}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ViewStartEndDetails;
