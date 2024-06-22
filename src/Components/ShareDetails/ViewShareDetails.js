import React, { useState, useEffect } from "react";
// import "./ViewShareDetails.css"
import Sidebar from "../Sidebar/Sidebar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaEdit, FaTrash,FaFilePdf, FaTimes } from "react-icons/fa";
// import ViewShareDetails from './ViewShareDetails.css';
import img1 from "../../assects/images/shivpushpa_logo.png"


const ViewShareDetails = () => {
  const [shareDetails, setShareDetails] = useState([]);
  const [filteredShareDetails, setFilteredShareDetails] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedShareDetail, setEditedShareDetail] = useState({});
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    const fetchShareDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:8787/api/share-details"
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
        shareDetail.date.includes(searchTextLower) ||
        shareDetail.drivername.toLowerCase().includes(searchTextLower)
      );
    });

    setFilteredShareDetails(filteredData);
  };

  useEffect(() => {
    filterShareDetails();
  }, [searchText]);

  
  const generateInvoice = (shareDetail) => {
    console.log(shareDetail);
    const downloadConfirmed = window.confirm(
      "Do you want to download the invoice?"
    );

    if (downloadConfirmed) {
      const doc = new jsPDF();
      // Set page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
  
    // Draw border
    const margin = 10;
    doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

      // Left side details
      doc.addImage(img1, 'PNG', 15, 15, 45, 32);
      doc.setFontSize(18);
      doc.text("Shivpushpa Travels", 70, 30);
      doc.setFontSize(12);
      doc.text("332, Kasba Peth Phadke Haud Chowk, Pune 411 0111", 70, 35);
      doc.text("Mail: travelshivpushpa@gmail.com", 70, 40);
      doc.text(`Date: ${shareDetail.date}`, 70, 45);

       // Title
    doc.setFontSize(18);
    doc.text("Share Details", 70 , 20);

      // Add space between left and right side details
      doc.text("", 10, 70);

      // Right side details
      doc.setFontSize(18);
      // doc.text("Invoice", 150, 20, { className: "uppercase-text" });
      doc.setFontSize(12);
      // doc.text(`Invoice No: ${invoiceNo}`, 150, 30); 
      

      // Add a line to separate left and right side details
      doc.line(10, 50, pageWidth - 10, 50);

      // Add space between the header and the table
      // doc.text("", 10, 40);

      // Table
      const columns = ["Field", "Value"];
      const rows = [
        
        ["Customer ID", shareDetail.customerId],
        ["Customer Name", shareDetail.customername],
        ["Customer Mobile", shareDetail.customermobile], 
        ["Vehicle", shareDetail.vehicle],
        ["Trip Type", shareDetail.triptype],
        ["Subtype", shareDetail.subtype],
        ["Pickup", shareDetail.pickup],
        ["Date", shareDetail.date],
        ["Time", shareDetail.time],
        ["Dropoff Location", shareDetail.Dropoff],
        ["Drop Off Date", shareDetail.date1],
        ["Drop Off Time", shareDetail.time1],
        ["Driver Name", shareDetail.drivername],
        ["Driver Email", shareDetail.drivermail],
        ["Mobile No", shareDetail.mobileno],
      ];

      // Position the table below the left and right side details
      doc.autoTable({
        body: rows,
        startY: 60,
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
      doc.text("", 20, doc.autoTable.previous.finalY + 10);

      // Bank Details section
      doc.setFontSize(10);
      doc.text("Bank Details:", 15, doc.autoTable.previous.finalY + 7);
      doc.text(
        "Bank Name: The Cosmos Co-operative Bank Ltd",
        15,
        doc.autoTable.previous.finalY + 14
      );
      doc.text(
        "Branch Name: Kasba Raviwar Branch, Pune 411 002",
        15,
        doc.autoTable.previous.finalY + 21
      );
      doc.text(
        "Account Number: 015204301220061",
        15,
        doc.autoTable.previous.finalY + 28
      );
      doc.text(
        "IFSC Code: COSB0000015",
        15,
        doc.autoTable.previous.finalY + 35
      );
      doc.text("MICR Code: 411164014", 15, doc.autoTable.previous.finalY + 42);

      // "Right side bottom details" section
      doc.setFontSize(12);
      doc.text(
        "For Shivpushpa Travels",
        150,
        doc.autoTable.previous.finalY + 20
      );
      doc.text("Authorised Signatory", 150, doc.autoTable.previous.finalY + 30);

      // Save the PDF or open in a new tab
      doc.save(`Share_Details_${shareDetail._id}.pdf`);
    }
  };

  const handleEditShareDetail = (shareDetail) => {
    setEditedShareDetail(shareDetail);
    setIsEditing(true);
  };

  const handleSaveShareDetail = async () => {
    try {
      const response = await fetch(
        `http://localhost:8787/api/share-details/${editedShareDetail._id}`,
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
        setIsEditing(false);
        // Alert after successful update
      alert("Share detail updated successfully!");
      } else {
        console.error("Error updating share detail:", response.status);
      }
    } catch (error) {
      console.error("Error updating share detail:", error);
    }
  };

  const handleDeleteShareDetail = async (shareDetail) => {
    const confirmed = window.confirm(
      "Do you want to delete this share detail?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:8787/api/share-details/${shareDetail._id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setFilteredShareDetails((prevDetails) =>
          prevDetails.filter((detail) => detail._id !== shareDetail._id)
        );
        alert("Share detail deleted successfully");
      } catch (error) {
        console.error("Error deleting share detail:", error);
        setError("Error deleting share detail: " + error.message);
      }
    }
  };

  const fetchShareDetails = async (_id) => {
    try {
      const response = await fetch(
        `http://localhost:8787/api/share-details/${_id}`
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
  const handleViewMore = (_id) => {
    fetchShareDetails(_id);
  };
  const handleCloseModal = () => {
    setSelectedTrip(null);
  };

  return (
    <>
      <Sidebar />
      <div className="share-details-container">
        <div className="share-details-main-container h-[150vh]">
        <div className="pl-[40%]">
        <h2 
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "8px",
        }}
      >
        View Share Details
      </h2>
        </div>
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
                  <th>Customer Mobile</th>
                  <th>Vehicle</th>
                  <th>Pickup</th>
                  <th>Pickup Date</th>
                  <th>Driver Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShareDetails.map((shareDetail) => (
                  <tr key={shareDetail._id}>
                    <td>{shareDetail.customername}</td>
                    <td>{shareDetail.customermobile}</td>
                    <td>{shareDetail.vehicle}</td>
                    <td>{shareDetail.pickup}</td>
                    <td>{shareDetail.date}</td>
                   <td>{shareDetail.drivername}</td>
                    <td>
                    <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleViewMore(shareDetail._id)}
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
                        onClick={() => handleDeleteShareDetail(shareDetail)}
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => generateInvoice(shareDetail)}
                      >
                        <FaFilePdf />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {isEditing && ( 
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-96" style={{ width: "40%", height: "80vh", overflowY: "scroll" }}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold">Edit Share Details</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="close-icon" 
              >
                <FaTimes />
              </button>
            </div>
            <div className="form-container">
            <h5 className='fw-bold my-2'>Customer Name:</h5>
              <input
                type="text"
                value={editedShareDetail.customername}
                onChange={(e) => setEditedShareDetail({ ...editedShareDetail, customername: e.target.value })}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <h5 className='fw-bold my-2'>Vehicle:</h5>
              <select
                  className="share-details-input"
                  name="vehicle"
                  id="vehicle"
                  onChange={(e) => setEditedShareDetail({ ...editedShareDetail, vehicle: e.target.value })}
                  value={editedShareDetail.vehicle}
                >
                  <option value="">Vehicle</option>
                  <option value="Sedan Car">Sedan Car</option>
                  <option value="Mini Car">Mini Car</option>
                  <option value="SUV Car">SUV Car</option>
                  <option value="Ac Bus 13-Seater">AC Bus 13-Seater</option>
                  <option value="AC Bus 17-seater">AC Bus 17-seater</option>
                  <option value="AC Bus 20-seater">AC Bus 20-seater</option>
                  <option value="AC Bus 32-seater">AC Bus 32-seater</option>
                  <option value="AC Bus 35-seater">AC Bus 35-seater</option>
                  <option value="AC Bus 40-seater">AC Bus 40-seater</option>
                  <option value="AC Bus 45-seater">AC Bus 45-seater</option>
                  <option value="Non-AC Bus 17-Seater">Non-AC Bus 17 Seater</option>
                  <option value="Non-AC Bus 20-Seater">Non-AC Bus 20 Seater</option>
                  <option value="Non-AC Bus 32-Seater">Non-AC Bus 32 Seater</option>
                  <option value="Non-AC Bus 40-Seater">Non-AC Bus 40 Seater</option>
                  <option value="Non-AC Bus 45-Seater">Non-AC Bus 45 Seater</option>
                  <option value="Non-AC Bus 49-Seater">Non-AC Bus 49 Seater</option>
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                </select>
                <h5 className='fw-bold my-2'>Trip Type:</h5>
                <select
                  className="share-details-input"
                  name="triptype"
                  id="triptype"
                  onChange={(e) => setEditedShareDetail({ ...editedShareDetail, triptype: e.target.value })}
                  value={editedShareDetail.triptype}
                >
                  <option value="">Trip Type</option>
                  <option value="One Way Trip">One Way Trip</option>
                  <option value="Return Trip">Return Trip</option>
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                </select>
                <h5 className='fw-bold my-2'>Sub Type:</h5>
                <select
                  className="share-details-input"
                  name="subtype"
                  id="subtype"
                  onChange={(e) => setEditedShareDetail({ ...editedShareDetail, subtype: e.target.value })}
                  value={editedShareDetail.subtype}
                >
                  <option value="">Sub Type</option>
                  <option value="Local Trip">Local Trip</option>
                  <option value="Outstation Trip">Outstation Trip</option>
                  <option value="Outstation Local Trip">Outstation Local Trip</option>
                  <option value="Outstation Outstation Trip">Outstation Outstation Trip</option>
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                </select>
              <h5 className='fw-bold my-2'>Mobile No:</h5>
              <input
                type="number"
                value={editedShareDetail.mobileno}
                onChange={(e) => setEditedShareDetail({ ...editedShareDetail, mobileno: e.target.value })}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <h5 className='fw-bold my-2'>Vehicle Number:</h5>
              <input
              type="text"
                value={editedShareDetail.vehicleno}
                onChange={(e) => setEditedShareDetail({ ...editedShareDetail, vehicleno: e.target.value })}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <h5 className='fw-bold my-2'>Pickup Location</h5>
              <input
                type="text"
                value={editedShareDetail.pickup}
                onChange={(e) => setEditedShareDetail({ ...editedShareDetail, pickup: e.target.value })}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <h5 className='fw-bold my-2'>Date:</h5>
              <input
                type="date"
                value={editedShareDetail.date}
                onChange={(e) => setEditedShareDetail({ ...editedShareDetail, date: e.target.value })}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
               <h5 className='fw-bold my-2'>Time:</h5>
              <input
                type="time"
                value={editedShareDetail.time}
                onChange={(e) => setEditedShareDetail({ ...editedShareDetail, time: e.target.value })}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <h5 className='fw-bold my-2'>Dropoff Location</h5>
              <input
                type="text"
                value={editedShareDetail.Dropoff}
                onChange={(e) => setEditedShareDetail({ ...editedShareDetail, Dropoff: e.target.value })}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <h5 className='fw-bold my-2'>Date:</h5>
              <input
                type="date"
                value={editedShareDetail.date1}
                onChange={(e) => setEditedShareDetail({ ...editedShareDetail, date1: e.target.value })}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
               <h5 className='fw-bold my-2'>Time:</h5>
              <input
                type="time"
                value={editedShareDetail.time1}
                onChange={(e) => setEditedShareDetail({ ...editedShareDetail, time1: e.target.value })}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <h5 className='fw-bold my-2'>Driver Name:</h5>
              <input
                type="text"
                value={editedShareDetail.drivername}
                onChange={(e) => setEditedShareDetail({ ...editedShareDetail, drivername: e.target.value })}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
               <h5 className='fw-bold my-2'>Driver Mail:</h5>
              <input
                type="text"
                value={editedShareDetail.drivermail}
                onChange={(e) => setEditedShareDetail({ ...editedShareDetail, drivermail: e.target.value })}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
            </div>
            {/* ... (add more fields as needed) */}
            <button
              onClick={handleSaveShareDetail}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 ml-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Display Share Details */}
   {/* Modal or Overlay for displaying trip details */}
   {selectedTrip && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div
                className="bg-white p-4 rounded shadow-lg w-96"
                style={{ width: "50%", maxHeight: "80vh", overflowY: "auto" }}
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
                    <strong>Customer Name:</strong> {selectedTrip.customername}
                  </p>
                  <p>
                    <strong>Customer Mobile:</strong>{" "}
                    {selectedTrip.customermobile}
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
                    <strong>Driver Name:</strong> {selectedTrip.drivername}
                  </p>
                  <p>
                    <strong>Driver Mobile:</strong> {selectedTrip.mobileno}
                  </p>
                  <p>
                    <strong>Vehicle Number:</strong> {selectedTrip.vehicleno}
                  </p>
                </div>
              </div>
            </div>
          )}
    </>
  );
};

export default ViewShareDetails;
