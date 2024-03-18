import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFilePdf } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import headerlogo from "../../assects/images/shivpushpa_logo.png"

const ViewVendorPayment = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);


  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('https://carbookingbackend.onrender.com/api/vender-payment');
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

  // Define a global variable to track the invoice number
let invoiceCounter = 100;

const handleGenerateInvoice = (vendor) => {
  const downloadConfirmed = window.confirm('Do you want to download the invoice?');

  if (downloadConfirmed) {
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
      compress: true,
      orientation: "portrait",
      // Increase the height as needed
      height: 800,
    });

    doc.setFillColor(60, 181, 205);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 7, 'F');

    // image 
    const img = new Image();
    img.src = headerlogo;
    doc.addImage(img, 'JPEG', 5, 10, 45, 32);

    doc.setFillColor(211, 211, 211);

    doc.setFontSize(11);
    doc.text('Shivpushpa Travels', 65, 15);
    doc.text('332, Kasba Peth Phadke Haud Chowk', 65, 20);
    doc.text('Pune 411 0111', 65, 25);
    doc.text('9325501950 / 9325501978', 65, 30);
    doc.text('travelshivpushpa@gmail.com', 65, 35);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    invoiceCounter++;
    const invoiceNo = invoiceCounter.toString().padStart(3, '0');

    doc.setFontSize(11);
    doc.text(`Invoice No: ${invoiceNo}`, 150, 15);
    doc.text(`Invoice Date : ${formattedDate}`, 150, 20);

    doc.setDrawColor(0, 0, 255);
    doc.line(10, 60, 200, 60);

    doc.text('INVOICE TO:', 10, 68);


    const rows = [
      { label: "Vender Name", value: vendor.vender_Name, yPos: 75 },
      { label: "Mobile No", value: vendor.mobile_Number, yPos: 80 },
      { label: "GST No", value: vendor.GST_No, yPos: 85 },
      { label: "Vehicle Type", value: vendor.vehicle_type, yPos: 90 },
      { label: "Vehicle Number", value: vendor.vehicle_Number, yPos: 95 }
    ];
    
   
// Add the rows to the PDF
rows.forEach(row => {
  doc.text(`${row.label}: ${row.value}`, 10, row.yPos);
});
doc.line(10, 105, 200, 105);
    // Add the table to the PDF
    doc.autoTable({
      // body: rows,
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

    const vendorDetails =[
      ['Description', 'kms','AMOUNT', 'TOTAL', 'CGST 2.5%', 'SGST 2.5%'],
      [`${vendor.vehicle_Type} - ${vendor.from} - ${vendor.to} on ${vendor.Date}`, '', '', '', '', '', ''], // Populate other fields accordingly
      ['Total KM', '', vendor.total_Km, '', '', '', ''],
      ['Total Hr', '', vendor.total_hours, '', '', '', ''], 
      [`${vendor.vehicle_Type} for @8hr 80km`, '', '80', '', '', vendor.CGST, vendor.SGST], // Line for "@8hr 80km"
      ['Extra KM', '', vendor.extra_Km, '', '', vendor.extrakm_CGST, vendor.extrakm_SGST],
      ['Extra Hr', '', vendor.extra_Hours, '', '', vendor.extrahours_CGST, vendor.extrahours_SGST],
      ['Toll Parking', '', vendor.toll, '', '', '', ''],
      // [{ content: 'Sub Total:', styles: { fillColor: [169, 169, 169], textColor: [0, 0, 0] } }, '', '', '', `Rs. ${vendor.subtotal_Amount.toLocaleString()}`, '', '', ''],
      // [{ content: 'Total Amount:', styles: { fillColor: [169, 169, 169], textColor: [0, 0, 0] } }, '', '', '', `Rs. ${vendor.total_amount.toLocaleString()}`, '', '']
    ]

    // Add space between the table and the "Bank Details" section
    doc.text('', 20, doc.autoTable.previous.finalY + 10);

    // Bank Details section
    // doc.setFontSize(10);
    // doc.text('Bank Details:', 20, doc.autoTable.previous.finalY + 20);
    // doc.text('Bank Name: The Cosmos Co-operative Bank Ltd', 20, doc.autoTable.previous.finalY + 30);
    // doc.text('Branch Name: Kasba Raviwar Branch, Pune 411 002', 20, doc.autoTable.previous.finalY + 40);
    // doc.text('Account Number: 015204301220061', 20, doc.autoTable.previous.finalY + 50);
    // doc.text('IFSC Code: COSB0000015', 20, doc.autoTable.previous.finalY + 60);
    // doc.text('MICR Code: 411164014', 20, doc.autoTable.previous.finalY + 70);

    // "Right side bottom details" section
    // doc.setFontSize(12);
    // doc.text('For Shivpushpa Travels', 150, doc.autoTable.previous.finalY + 20);
    // doc.text('Authorised Signatory', 150, doc.autoTable.previous.finalY + 40);

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
