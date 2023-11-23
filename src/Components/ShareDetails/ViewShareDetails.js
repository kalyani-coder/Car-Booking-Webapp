import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
            <div className="grid grid-cols-3 gap-4">
              {filteredShareDetails.map((shareDetail) => (
                <div key={shareDetail._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="p-4">
                    <h5 className="font-semibold  ">Vehicle: {shareDetail.vehicle}</h5>
                    <p className="mb-2">Trip Type: {shareDetail.triptype}</p>
                    <p className="mb-2">Subtype: {shareDetail.subtype}</p>
                    <p className="mb-2">Pickup: {shareDetail.pickup}</p>
                    <p className="mb-2">Date: {shareDetail.date}</p>
                    <p className="mb-2">Time: {shareDetail.time}</p>
                    <p className="mb-2">Dropoff: {shareDetail.Dropoff}</p>
                    <p className="mb-2">Date1: {shareDetail.date1}</p>
                    <p className="mb-2">Time1: {shareDetail.time1}</p>
                    <p className="mb-2">Driver Name: {shareDetail.drivername}</p>
                    <p className="mb-2">Driver Email: {shareDetail.drivermail}</p>
                    <p className="mb-2">Mobile No: {shareDetail.mobileno}</p>
                    <p className="mb-2">Mobile No1: {shareDetail.mobileno1}</p>
                    <div className="flex justify-between">
                      <button
                        className='btn btn-primary btn-sm'
                        onClick={() => generateInvoice(shareDetail)}
                      >
                        Generate
                      </button>
                      <button
                        className='btn btn-info btn-sm'
                        onClick={() => handleEditShareDetail(shareDetail)}
                      >
                        Edit
                      </button>
                      <button
                        className='btn btn-success btn-sm'
                        onClick={() => handleSaveShareDetail(shareDetail)}
                      >
                        Save
                      </button>
                      <button
                        className='btn btn-danger btn-sm'
                        onClick={() => handleDeleteShareDetail(shareDetail)}
                      >
                        Delete
                      </button>
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
