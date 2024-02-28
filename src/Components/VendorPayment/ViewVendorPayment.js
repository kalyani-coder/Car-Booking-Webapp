import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFilePdf } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ViewVendorPayment = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);


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
    const downloadConfirmed = window.confirm('Do you want to download the invoice?');

    if (downloadConfirmed) {
      const doc = new jsPDF();
      // Set the document title
      doc.setFontSize(18);
      doc.text('Vendor Payment', 10, 10);
      doc.setFontSize(12);
      doc.text('Shivpushpa Travels', 10, 20, { className: 'uppercase-text' });
      


        // Left side details
        doc.setFontSize(10);
        // doc.text('Address:', 20, 20); // Label for the address
        doc.text('332, Kasba Peth Phadke Haud Chowk, Pune 411 0111', 20, 30);
        doc.text('Mail: travelshivpushpa@gmail.com', 20, 40);
  
        // Right side details
        doc.setFontSize(18);
    doc.text('invoice', 150, 10, { className: 'uppercase-text' });
        doc.setFontSize(10);
        doc.text(`Invoice No: ${vendor.invoice_No}`, 120, 20);
        doc.text(`Date: ${vendor.date }`, 120, 30);
  
        // Set the font size for the table
      doc.setFontSize(12);

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
  
        // Add the table to the PDF
        doc.autoTable({
          body: rows,
          startY: 50,
          theme: 'grid',
          styles: {
            fontSize: 10, // Default font size for the entire table
          },
          columnStyles: {
            0: { fontSize: 10, fontStyle: "bold" }, // Field names - larger and bold
            1: { fontSize: 10 }, // Values - default font size
          },
        });
  
        // Add space between the table and the "Bank Details" section
        doc.text('', 20, doc.autoTable.previous.finalY + 10);
  
        // Bank Details section
        doc.setFontSize(10);
        doc.text('Bank Details:', 20, doc.autoTable.previous.finalY + 20);
        doc.text('Bank Name: The Cosmos Co-operative Bank Ltd', 20, doc.autoTable.previous.finalY + 30);
        doc.text('Branch Name: Kasba Raviwar Branch, Pune 411 002', 20, doc.autoTable.previous.finalY + 40);
        doc.text('Account Number: 015204301220061', 20, doc.autoTable.previous.finalY + 50);
        doc.text('IFSC Code: COSB0000015', 20, doc.autoTable.previous.finalY + 60);
        doc.text('MICR Code: 411164014', 20, doc.autoTable.previous.finalY + 70);
  
       // "Right side bottom details" section
      doc.setFontSize(12);
      doc.text('For Shivpushpa Travels', 150, doc.autoTable.previous.finalY + 20);
      doc.text('Authorised Signatory', 150, doc.autoTable.previous.finalY + 40);
  
       
        
      // Save the PDF or open in a new tab
      doc.save(`Invoice_${vendor._id}.pdf`);
    }
  };

  // const handleViewMore = (vendor) => {
  //   setSelectedVendor(vendor);
  // };

 

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
                <th>Vendor Name</th>
                <th>Company Name</th>
                <th>GST No</th>
                <th>Mobile Number</th>
                <th>Payment</th>
                <th>Amount</th>
                <th>Tds 1 %</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map((vendor) => (
                <React.Fragment key={vendor._id}>
                  <tr>
                    <td>{vendor.company_Name}</td>
                    <td>{vendor.vender_Name}</td>
                    <td>{vendor.GST_No}</td>
                    <td>{vendor.mobile_Number}</td>
                    <td>{vendor.payment}</td>
                    <td>{vendor.amount}</td>
                    <td>{vendor.tds}</td>
                    <td>
                      <Link  className="btn btn-info ml-2" to={`/ViewVendorPayment/${vendor._id}`}>
                        View More
                      </Link>
                      <button
                        className="btn btn-info"
                        onClick={() => handleGenerateInvoice(vendor)}
                      >
                        <FaFilePdf />
                      </button>
                    </td>
                  </tr>
                 
                  {selectedVendor === vendor && (
                    <tr>

                      <td >
                        <button className="btn btn-primary" onClick={() => handleGenerateInvoice(vendor)}>
                          <FaFilePdf />
                        </button>
                      </td>
       
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewVendorPayment;
