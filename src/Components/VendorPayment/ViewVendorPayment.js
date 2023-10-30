import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';

const ViewVendorPayment = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const componentRef = useRef();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/vender-payment');
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
    doc.text(`Vendor Name: ${vendor.company_Name}`, 10, 10);
    doc.text(`Company Name: ${vendor.vender_Name}`, 10, 20);
    doc.text(`GST No: ${vendor.GST_No}`, 10, 30);
    doc.text(`Mobile Number: ${vendor.mobile_Number}`, 10, 40);
    doc.text(`Payment: ${vendor.payment}`, 10, 50);
    doc.text(`Amount: ${vendor.amount}`, 10, 60);
    doc.text(`tds: ${vendor.tds}`, 10, 70);
    doc.text(`Total Amount: ${vendor.total_Amount}`, 10, 80);
    doc.text(`Paid Amount: ${vendor.paid_Amount}`, 10, 90);
    doc.text(`Remaining Amount: ${vendor.remaining_Amount}`, 10, 100);
    doc.text(`Payment Method: ${vendor.payment_Method}`, 10, 110);

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
