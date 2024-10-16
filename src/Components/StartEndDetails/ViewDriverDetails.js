import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Table } from "react-bootstrap";
import { FaEdit, FaTrash, FaTimes, FaFilePdf } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import "./ViewDriverDetails.css";
import img1 from "../../Assets/images/shivpushpa_logo.png";

const ViewStartEndDetails = () => {
  const [shareDetails, setShareDetails] = useState([]);
  const [filteredShareDetails, setFilteredShareDetails] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedShareDetail, setEditedShareDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(null);

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
        setShareDetails((prevDetails) =>
          prevDetails.map((detail) =>
            detail._id === editedShareDetail._id ? editedShareDetail : detail
          )
        );
        setFilteredShareDetails((prevDetails) =>
          prevDetails.map((detail) =>
            detail._id === editedShareDetail._id ? editedShareDetail : detail
          )
        );

        // Reset edit mode and edited detail
        setEditMode(false);
        setEditedShareDetail(null);

        // Show success message
        alert("Share detail updated successfully");
        setErrorMessage(""); // Clear any error messages
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

  const handleDeleteShareDetail = async (shareDetailId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this share detail?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:8787/api/getDetails-fromDriver/${shareDetailId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setShareDetails((prevDetails) =>
          prevDetails.filter((detail) => detail._id !== shareDetailId)
        );
        setFilteredShareDetails((prevDetails) =>
          prevDetails.filter((detail) => detail._id !== shareDetailId)
        );
        alert("Share detail deleted successfully");
      } catch (error) {
        console.error("Error deleting share detail:", error);
        setErrorMessage("Error deleting share detail: " + error.message);
      }
    }
  };

  const fetchShareDetails = async (_id) => {
    try {
      const response = await fetch(
        `http://localhost:8787/api/getDetails-fromDriver/${_id}`
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
  const handleViewMoreShareDetail = (_id) => {
    fetchShareDetails(_id);
  };
  const handleCloseModal = () => {
    setSelectedTrip(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedShareDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generatePDF = (trip) => {
    // Ensure numeric values and calculate total amount
    const toll = parseFloat(trip.toll) || 0;
    const allowance = parseFloat(trip.allowance) || 0;
    const nightstay = parseFloat(trip.nightstay) || 0;
    const totalAmt = toll + allowance + nightstay;
    // Format total amount with currency symbol
    const formattedTotalAmt = `Rs ${totalAmt.toFixed(2)}`;

    const doc = new jsPDF();

    // Set page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Draw border
    const margin = 10;
    doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

    doc.addImage(img1, "PNG", 15, 15, 45, 32);
    // Header section
    doc.setFontSize(18);
    doc.text("Shivpushpa Travels", 70, 30);
    doc.setFontSize(12);
    doc.text("332, Kasba Peth Phadke Haud Chowk, Pune 411 0111", 70, 35);
    doc.text("Mail: travelshivpushpa@gmail.com", 70, 40);

    // Title
    doc.setFontSize(18);
    doc.text("Driver Trip Details", 70, 20);

    // Add a line to separate header and body
    doc.line(10, 50, pageWidth - 10, 50);

    // Table
    const columns = ["Field", "Value"];
    const rows = [
      ["Customer Name", trip.customername],
      ["Customer Mobile", trip.customermobile],
      ["Driver Name", trip.drivername],
      ["Driver Mobile", trip.mobileno],
      ["Vehicle Number", trip.vehicleno],
      ["Trip Type", trip.triptype],
      ["Sub Type", trip.subtype],
      ["Pickup", trip.pickup],
      ["Time", trip.time],
      ["Dropoff", trip.Dropoff],
      ["Drop Date", trip.date1],
      ["Drop Time", trip.time1],
      ["Total Days", trip.totalDays],
      ["Total Hours", trip.totalHours],
      ["Toll", trip.toll],
      ["Allowance", trip.allowance],
      ["Night Stay", trip.nightstay],
      ["Total Amount", totalAmt.toFixed(2)],
    ];

    doc.autoTable({
      startY: 60,
      body: rows,
      theme: "grid",
      styles: {
        fontSize: 10,
        halign: "center",
      },
      columnStyles: {
        0: { fontStyle: "bold", halign: "left" },
        1: { halign: "left" },
      },
    });

    // Add space between the table and the "Bank Details" section
    const tableEndY = doc.autoTable.previous.finalY + 10;

    // Bank Details section on the left
    doc.setFontSize(10);
    doc.text("Bank Details:", 15, tableEndY);
    doc.text("Bank Name: The Cosmos Co-operative Bank Ltd", 15, tableEndY + 7);
    doc.text(
      "Branch Name: Kasba Raviwar Branch, Pune 411 002",
      15,
      tableEndY + 14
    );
    doc.text("Account Number: 015204301220061", 15, tableEndY + 21);
    doc.text("IFSC Code: COSB0000015", 15, tableEndY + 28);
    doc.text("MICR Code: 411164014", 15, tableEndY + 35);

    // Signature section
    const signatureStartY = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(12);
    doc.text("For Shivpushpa Travels", pageWidth - 60, signatureStartY);
    doc.text("Authorised Signatory", pageWidth - 60, signatureStartY + 10);

    // Save the PDF
    doc.save(`Trip_Details_${trip._id}.pdf`);
  };

  return (
    <>
      <div className="share-details-container">
        <div className="">
          <h2 className="View-Corporate-Customer-Rate font-bold py-4">
            View Driver Trip Details
          </h2>
          <div className="py-2">
            <input
              type="text"
              placeholder="Search by date or driver name"
              className="width-set-for-all-view-pages-carbooking-search-box p-2 rounded border Search-by-date-or-driver-name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
        <div className="share-details-main-container">
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Sr.No.</th>
                  <th>Cust.No.</th>
                  <th>Customer Name</th>
                  <th>Vehicle</th>
                  <th>Trip Type</th>
                  <th>Sub Type</th>
                  <th>Date</th>
                  {/* <th>Time</th> */}
                  <th>Drop Location</th>
                  <th>Date</th>
                  {/* <th>Time</th> */}
                  {/* <th>Total Days</th> */}
                  {/* <th>Total Hours</th> */}
                  {/* <th>Mobile No</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShareDetails.map((shareDetail, index) => (
                  <tr key={shareDetail._id}>
                    <td>{index + 1}</td>
                    <td>{shareDetail.Customer_Number}</td>
                    <td>{shareDetail.customername}</td>
                    <td>{shareDetail.vehicle}</td>
                    <td>{shareDetail.triptype}</td>
                    <td>{shareDetail.subtype}</td>
                    {/* <td>{shareDetail.pickup}</td> */}
                    <td>{shareDetail.date}</td>
                    {/* <td>{shareDetail.time}</td> */}
                    <td>{shareDetail.Dropoff}</td>
                    <td>{shareDetail.date1}</td>
                    {/* <td>{shareDetail.time1}</td> */}
                    {/* <td>{shareDetail.totalDays}</td> */}
                    {/* <td>{shareDetail.totalHours}</td> */}

                    {/* <td>{shareDetail.mobileno}</td> */}
                    <td>
                      <div className="d-flex justify-content-between gap-3 btn-for-view-drive-details-flex">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            handleViewMoreShareDetail(shareDetail._id)
                          }
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => handleEditShareDetail(shareDetail)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDeleteShareDetail(shareDetail._id)
                          }
                        >
                          <FaTrash />
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => generatePDF(shareDetail)}
                        >
                          <FaFilePdf />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {/* Edit View Driver Details */}

          <Modal
            show={editMode}
            onHide={handleCloseEdit}
            dialogClassName="modal-lg "
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
            <div className="flex items-center p-4">
              <Button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSaveShareDetail}
              >
                Save
              </Button>
              <Button
                className="px-4 py-2 ml-2 bg-red-500 text-white rounded"
                onClick={handleCloseEdit}
              >
                Cancel
              </Button>
            </div>
          </Modal>

          {/* View DriverDetails */}
          {errorMessage && <p>{errorMessage}</p>}

          {/* Modal or Overlay for displaying trip details */}
          {selectedTrip && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 modal-main-container-section-z-index">
              <div
                className="bg-white p-4 rounded shadow-lg w-96 main-div-for-modal-container-for-all-inputs-cc"
                style={{ maxHeight: "80vh", overflowY: "auto" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">View Driver Details</h2>
                  <button className="text-black-500" onClick={handleCloseModal}>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="space-y-2">
                  <p>
                    <p>
                      <strong>Customer Name:</strong>{" "}
                      {selectedTrip.customername}
                    </p>
                    <p>
                      <strong>Customer Mobile:</strong>{" "}
                      {selectedTrip.customermobile}
                    </p>
                    <strong>Driver Name:</strong> {selectedTrip.drivername}
                  </p>
                  <p>
                    <strong>Driver Mobile:</strong> {selectedTrip.mobileno}
                  </p>
                  <p>
                    <strong>Vehicle Number:</strong> {selectedTrip.vehicleno}
                  </p>
                  <p>
                    <strong>Trip Type:</strong> {selectedTrip.triptype}
                  </p>
                  <p>
                    <strong>Sub Type:</strong> {selectedTrip.subtype}
                  </p>
                  <p>
                    <strong>Pickup:</strong> {selectedTrip.pickup}
                  </p>
                  <p>
                    <strong>Time:</strong> {selectedTrip.time}
                  </p>
                  <p>
                    <strong>Dropoff:</strong> {selectedTrip.Dropoff}
                  </p>
                  <p>
                    <strong>Date:</strong> {selectedTrip.date1}
                  </p>
                  <p>
                    <strong>Time:</strong> {selectedTrip.time1}
                  </p>
                  <p>
                    <strong>Total Days:</strong> {selectedTrip.totalDays}
                  </p>
                  <p>
                    <strong>Total Hours:</strong> {selectedTrip.totalHours}
                  </p>
                  <p>
                    <strong>Toll:</strong> {selectedTrip.toll}
                  </p>
                  <p>
                    <strong>Allowance:</strong> {selectedTrip.allowance}
                  </p>
                  <p>
                    <strong>Night Stay:</strong> {selectedTrip.nightstay}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewStartEndDetails;
