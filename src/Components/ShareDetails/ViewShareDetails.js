import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaEdit, FaTrash, FaFilePdf } from 'react-icons/fa';

const ViewShareDetails = () => {
  const [shareDetails, setShareDetails] = useState([]);
  const [filteredShareDetails, setFilteredShareDetails] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchShareDetails = async () => {
      try {
        const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/share-details');
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

  const fetchAdditionalInfo = async (shareDetail) => {
    try {
      // Make an API call to fetch additional information based on the share trip details ID
      const additionalInfoResponse = await fetch(`https://carbooking-backend-fo78.onrender.com/api/additional-info/${shareDetail.sharetripdetailsId}`);
      if (!additionalInfoResponse.ok) {
        throw Error('Error fetching additional info');
      }
      const additionalInfoData = await additionalInfoResponse.json();

      // Update the share detail with additional info
      const updatedShareDetails = shareDetails.map((detail) =>
        detail._id === shareDetail._id ? { ...detail, ...additionalInfoData } : detail
      );

      setShareDetails(updatedShareDetails);
      setFilteredShareDetails(updatedShareDetails);
    } catch (error) {
      console.error('Error fetching additional info: ' + error.message);
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
    const doc = new jsPDF();

    // Add your code to generate the invoice in a table format here
    // For simplicity, we'll just add a sample table with the data
    doc.text('Shivpushpa Travels Invoice', 10, 10);

    const columns = ['Field', 'Value'];
    const rows = [
      ['Company Name', shareDetail.companyName],
      ['Company Address', shareDetail.companyAddress],
      ['Invoice No', shareDetail.invoiceNo],
      ['Contact No', shareDetail.contactNo],
      ['Email', shareDetail.email],
      ['PO No', shareDetail.poNo],
      ['Customer ID', shareDetail.customerId],
      ['Vehicle', shareDetail.vehicle],
      ['Trip Type', shareDetail.triptype],
      ['Subtype', shareDetail.subtype],
      ['Pickup', shareDetail.pickup],
      ['Date', shareDetail.date],
      ['Time', shareDetail.time],
      ['Droff Location', shareDetail.Dropoff],
      ['Drop Off Date', shareDetail.date1],
      ['Drop Off Time', shareDetail.time1],
      ['Driver Name', shareDetail.drivername],
      ['Driver Email', shareDetail.drivermail],
      ['Mobile No', shareDetail.mobileno],
      ['Mobile No1', shareDetail.mobileno1],
      // Add other fields as needed
    ];

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });

    // Save the PDF or open in a new tab
    doc.save(`Invoice_${shareDetail._id}.pdf`);
  };

  const handleEditShareDetail = (shareDetail) => {
    // Implement your edit functionality here
    console.log(`Editing share detail with ID: ${shareDetail._id}`);
  };

  const handleSaveShareDetail = (shareDetail) => {
    // Implement your save functionality here
    console.log(`Saving share detail with ID: ${shareDetail._id}`);
  };

  const handleDeleteShareDetail = (shareDetail) => {
    // Implement your delete functionality here
    console.log(`Deleting share detail with ID: ${shareDetail._id}`);
  };

  return (
    <>
      <Sidebar />
      <div className="share-details-container">
        <div className="share-details-main-container">
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>View Share Details</h2>
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
                  <th>Mobile No1</th>
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
                    <td>{shareDetail.drivermail}</td>
                    <td>{shareDetail.mobileno}</td>
                    <td>{shareDetail.mobileno1}</td>
                    <td>
                      <button
                        className='btn btn-primary btn-sm'
                        onClick={() => generateInvoice(shareDetail)}
                      >
                        <FaFilePdf />
                      </button>
                      <button
                        className='btn btn-info btn-sm'
                        onClick={() => handleEditShareDetail(shareDetail)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className='btn btn-danger btn-sm'
                        onClick={() => handleDeleteShareDetail(shareDetail)}
                      >
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

export default ViewShareDetails;
