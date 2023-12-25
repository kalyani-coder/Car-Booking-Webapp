import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFilePdf } from 'react-icons/fa';

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
    const downloadConfirmed = window.confirm('Do you want to download the invoice?');

    if (downloadConfirmed) {
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
  }
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
          <table className="table">
            <thead>
              <tr>
                <th className="border px-4 py-2">Vendor Name</th>
                <th className="border px-4 py-2">Company Name</th>
                <th className="border px-4 py-2">GST No</th>
                <th className="border px-4 py-2">Mobile Number</th>
                <th className="border px-4 py-2">Payment</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">tds</th>
                <th className="border px-4 py-2">Total Amount</th>
                <th className="border px-4 py-2">Paid Amount</th>
                <th className="border px-4 py-2">Remaining Amount</th>
                <th className="border px-4 py-2">Payment Method</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map((vendor) => (
                <tr key={vendor._id}>
                  <td className="border px-4 py-2">{vendor.company_Name}</td>
                  <td className="border px-4 py-2">{vendor.vender_Name}</td>
                  <td className="border px-4 py-2">{vendor.GST_No}</td>
                  <td className="border px-4 py-2">{vendor.mobile_Number}</td>
                  <td className="border px-4 py-2">{vendor.payment}</td>
                  <td className="border px-4 py-2">{vendor.amount}</td>
                  <td className="border px-4 py-2">{vendor.tds}</td>
                  <td className="border px-4 py-2">{vendor.total_Amount}</td>
                  <td className="border px-4 py-2">{vendor.paid_Amount}</td>
                  <td className="border px-4 py-2">{vendor.remaining_Amount}</td>
                  <td className="border px-4 py-2">{vendor.payment_Method}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="btn btn-info"
                      onClick={() => handleGenerateInvoice(vendor)}
                    >
                      <FaFilePdf />
                    </button>
                    
                  </td>
                </tr>
                
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewVendorPayment;
