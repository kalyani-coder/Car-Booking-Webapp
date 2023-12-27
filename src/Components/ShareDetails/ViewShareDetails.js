import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaEdit, FaTrash, FaFilePdf, FaTimes } from "react-icons/fa";

const ViewShareDetails = () => {
  const [shareDetails, setShareDetails] = useState([]);
  const [filteredShareDetails, setFilteredShareDetails] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedShareDetail, setEditedShareDetail] = useState({});

  useEffect(() => {
    const fetchShareDetails = async () => {
      try {
        const response = await fetch(
          "https://carbooking-backend-fo78.onrender.com/api/share-details"
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

  const fetchAdditionalInfo = async (shareDetail) => {
    try {
      // Make an API call to fetch additional information based on the share trip details ID
      const additionalInfoResponse = await fetch(
        `https://carbooking-backend-fo78.onrender.com/api/additional-info/${shareDetail.sharetripdetailsId}`
      );
      if (!additionalInfoResponse.ok) {
        throw Error("Error fetching additional info");
      }
      const additionalInfoData = await additionalInfoResponse.json();

      // Update the share detail with additional info
      const updatedShareDetails = shareDetails.map((detail) =>
        detail._id === shareDetail._id
          ? { ...detail, ...additionalInfoData }
          : detail
      );

      setShareDetails(updatedShareDetails);
      setFilteredShareDetails(updatedShareDetails);
    } catch (error) {
      console.error("Error fetching additional info: " + error.message);
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

  const generateInvoice = (shareDetail) => {
    const downloadConfirmed = window.confirm(
      "Do you want to download the invoice?"
    );

    if (downloadConfirmed) {
      const doc = new jsPDF();

      // Add your code to generate the invoice in a table format here
      // For simplicity, we'll just add a sample table with the data
      doc.text("Share Details Invoice", 10, 10);
      // Left side details
      doc.setFontSize(12);
      doc.text("Shivpushpa Travels", 20, 30);
      doc.text("332, Kasba Peth Phadke Haud Chowk, Pune 411 0111", 20, 40);
      doc.text("Mail: travelshivpushpa@gmail.com", 20, 50);

      // Add space between left and right side details
      doc.text("", 10, 70);

      // Right side details
      doc.setFontSize(18);
      doc.text("Invoice", 150, 20, { className: "uppercase-text" });
      doc.setFontSize(12);
      doc.text(`Invoice No: ${shareDetail.invoice_No}`, 150, 30);
      doc.text(`Date: ${shareDetail.date}`, 150, 40);

      // Add a line to separate left and right side details
      doc.line(20, 70, 190, 70);

      // Add space between the header and the table
      doc.text("", 10, 40);

      // Table
      const columns = ["Field", "Value"];
      const rows = [
        ["Company Name", shareDetail.companyName],
        ["Company Address", shareDetail.companyAddress],
        ["Invoice No", shareDetail.invoiceNo],
        ["Contact No", shareDetail.contactNo],
        ["Email", shareDetail.email],
        ["PO No", shareDetail.poNo],
        ["Customer ID", shareDetail.customerId],
        ["Vehicle", shareDetail.vehicle],
        ["Trip Type", shareDetail.triptype],
        ["Subtype", shareDetail.subtype],
        ["Pickup", shareDetail.pickup],
        ["Date", shareDetail.date],
        ["Time", shareDetail.time],
        ["Droff Location", shareDetail.Dropoff],
        ["Drop Off Date", shareDetail.date1],
        ["Drop Off Time", shareDetail.time1],
        ["Driver Name", shareDetail.drivername],
        ["Driver Email", shareDetail.drivermail],
        ["Mobile No", shareDetail.mobileno],
        ["Mobile No1", shareDetail.mobileno1],
        // ... (other table data)
      ];

      // Position the table below the left and right side details
      doc.autoTable({
        body: rows,
        startY: 90,
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
      doc.text("Bank Details:", 20, doc.autoTable.previous.finalY + 20);
      doc.text(
        "Bank Name: The Cosmos Co-operative Bank Ltd",
        20,
        doc.autoTable.previous.finalY + 30
      );
      doc.text(
        "Branch Name: Kasba Raviwar Branch, Pune 411 002",
        20,
        doc.autoTable.previous.finalY + 40
      );
      doc.text(
        "Account Number: 015204301220061",
        20,
        doc.autoTable.previous.finalY + 50
      );
      doc.text(
        "IFSC Code: COSB0000015",
        20,
        doc.autoTable.previous.finalY + 60
      );
      doc.text("MICR Code: 411164014", 20, doc.autoTable.previous.finalY + 70);

      // "Right side bottom details" section
      doc.setFontSize(12);
      doc.text(
        "For Shivpushpa Travels",
        150,
        doc.autoTable.previous.finalY + 20
      );
      doc.text("Authorised Signatory", 150, doc.autoTable.previous.finalY + 30);

      // Save the PDF or open in a new tab
      doc.save(`Invoice_${shareDetail._id}.pdf`);
    }
  };

  const handleEditShareDetail = (shareDetail) => {
    setEditedShareDetail(shareDetail);
    setIsEditing(true);
  };

  const handleSaveShareDetail = async () => {
    try {
      const response = await fetch(
        `https://carbooking-backend-fo78.onrender.com/api/share-details/${editedShareDetail._id}`,
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
          `https://carbooking-backend-fo78.onrender.com/api/share-details/${shareDetail._id}`,
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
            View Share Details
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
                  <th>Vehicle</th>
                  <th>Trip Type</th>
                  <th>Subtype</th>
                  <th>Pickup</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Dropoff</th>
                  <th>Date1</th>
                  {/* <th>Time1</th>
                  <th>Driver Name</th>
                  <th>Driver Email</th>
                  <th>Mobile No</th>
                  <th>Mobile No1</th> */}
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
                    {/* <td>{shareDetail.time1}</td>
                    <td>{shareDetail.drivername}</td>
                    <td>{shareDetail.drivermail}</td>
                    <td>{shareDetail.mobileno}</td>
                    <td>{shareDetail.mobileno1}</td> */}
                    <td>
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
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold">Edit Share Details</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="close-icon"
              >
                <FaTimes />
              </button>
            </div>
            <h5 className="fw-bold">Customer Name</h5>
              type="text"
              value={editedShareDetail.cus_Name}
              onChange={(e) =>
                setEditedShareDetail({
                  ...editedShareDetail,
                  cus_Name: e.target.value,
                })
              }
           <Form.Group controlId="formMobileNumber">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            value={editedShareDetail.mobileno}
            onChange={(e) =>
              setEditedShareDetail({
                ...editedShareDetail,
                mobileno: e.target.value,
              })
            }
          />
        </Form.Group>

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
    </>
  );
};

export default ViewShareDetails;
