import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ViewVendorPayment = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/vender-payment');
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchVendors();
  }, []);

  const handleGenerateInvoice = (vendor) => {
    const doc = new jsPDF();

    // Set the document title
    doc.text('Vendor Payment Invoice', 10, 10);

    // Define the columns and rows for the table
    const columns = ['Field', 'Value'];
    const rows = [
      ['Vendor Name', vendor.company_Name],
      ['Company Name', vendor.vender_Name],
      ['GST No', vendor.GST_No],
      ['Mobile Number', vendor.mobile_Number],
      ['Payment', vendor.payment],
      ['Amount', vendor.amount],
      ['tds', vendor.tds],
      ['Total Amount', vendor.total_Amount],
      ['Paid Amount', vendor.paid_Amount],
      ['Remaining Amount', vendor.remaining_Amount],
      ['Payment Method', vendor.payment_Method],
    ];

    // Set the table position and dimensions
    const tableY = 20;

    // Add the table to the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: tableY,
      theme: 'grid',
    });

    // Save the PDF or open in a new tab
    doc.save(`Invoice_${vendor._id}.pdf`);
  };

  const filteredVendors = vendors.filter((vendor) => {
    const vendorName = vendor.vender_Name || '';
    const companyName = vendor.company_Name || '';
    return (
      vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Sidebar />
      <div className="vendor-Add-container">
        <div className="vendor-main-container">
          <h1 className="text-2xl font-semibold mb-4">View Vendor Payment</h1>
          <input
            type="search"
            placeholder="Search By Vendor Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 border rounded-lg shadow-md mb-4"
          />
          <div className="grid grid-cols-3 gap-4">
            {filteredVendors.map((vendor) => (
              <div
                key={vendor._id}
                className="custom-card bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="custom-card-body p-4">
                  <h5 className="custom-card- font-semibold">
                    Vendor Name: {vendor.company_Name}
                  </h5>
                  <p className="custom-card-subtitle mb-2">
                    Company Name: {vendor.vender_Name}
                  </p>
                  <p className="custom-card-subtitle mb-2">GST No: {vendor.GST_No}</p>
                  <p className="custom-card-subtitle mb-2">Mobile Number: {vendor.mobile_Number}</p>
                  <p className="custom-card-subtitle mb-2">Payment: {vendor.payment}</p>
                  <p className="custom-card-subtitle mb-2">Amount: {vendor.amount}</p>
                  <p className="custom-card-subtitle mb-2">tds: {vendor.tds}</p>
                  <p className="custom-card-subtitle mb-2">Total Amount: {vendor.total_Amount}</p>
                  <p className="custom-card-subtitle mb-2">Paid Amount: {vendor.paid_Amount}</p>
                  <p className="custom-card-subtitle mb-2">Remaining Amount: {vendor.remaining_Amount}</p>
                  <p className="custom-card-subtitle mb-2">Payment Method: {vendor.payment_Method}</p>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleGenerateInvoice(vendor)}
                >
                  Generate
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewVendorPayment;
