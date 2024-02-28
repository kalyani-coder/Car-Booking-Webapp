import React, { useState } from 'react';
import jsPDF from 'jspdf';  // Import jsPDF
import 'jspdf-autotable';
import './VendorInvoiceMonthly.css';
import Sidebar from '../Sidebar/Sidebar';

function VendorInvoiceMonthly() {
  const [formData, setFormData] = useState({
    tripid: '',
    invoiceno: '',
    companyName: 'Shivpushpa Travels Invoice',
    gstno: '',
    companyAddress: '332, Kasba Peth  Phadke Haud Chowk,  Pune 411 0111',
    mail: 'travelshivpushpa@gmail.com',
    date: '',
    contactno: '',
    to: '',
    vendorName: '',
    vendorAddress: '',
    vendorGSTNo: '',
    vendorContactNo: '',
    discount: '',
    kms: '',
    amount: '',
    cgst: '',
    sgst: '',
    totalAmount: '',
    bankname: 'The Cosmos Co-operative Bank Ltd',
    branchname: 'Kasba Raviwar Branch, Pune 411 002',
    accountNumber: '015204301220061',
    accountHoldername: '',
    ifsccode: 'COSB0000015',
    micrcode: '411164014',
  });

  const invoiceItems = [
    { description: 'Item 1',saccode: '996601', kms: 100, amount: 50, total: 82.5, cgst: 2.5, sgst: 2.5 },
    // Add more items as needed
  ];

  const [showInvoiceData, setShowInvoiceData] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePrint = () => {
    setShowInvoiceData(true);
    window.print();
  };

  const handleGenerate = () => {
    const downloadConfirmed = window.confirm('Do you want to download the invoice?');

    if (downloadConfirmed) {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Shivpushpa Travels', 10, 10, { className: 'uppercase-text' });


     // Set the document title
     doc.setFontSize(12);
     doc.text('Vendor Monthly Invoice', 10, 10);
    // Add content to the PDF
    doc.setFontSize(10);
    doc.text(formData.companyName, 10, 10);
    doc.text(formData.companyAddress, 10, 20);
    doc.text('Invoice No: ' + formData.invoiceno, 10, 30);
    doc.text('GST No: ' + formData.gstno, 10, 40);
    // doc.text('Date: ' + formData.date, 10, 50);
    doc.text('Mail: ' + formData.mail, 10, 60);

    doc.setFontSize(18);
    doc.text('invoice', 150, 20, { className: 'uppercase-text' });
    doc.setFontSize(10);
    doc.text('PO No: ', 150, 30);
    doc.text('Invoice No: ' + formData.invoiceno, 150, 40);
    doc.text('Date: ' + formData.date, 150, 50);
    doc.text('Customer ID GST No: 27AABTS4503R1Z1', 150, 60);

    doc.text('Vendor Name: ' + formData.vendorName, 10, 80);
    doc.text('Vendor Address: ' + formData.vendorAddress, 10, 90);
    doc.text('Vendor GST No: ' + formData.vendorGSTNo, 10, 100);
    doc.text('Vendor Contact No: ' + formData.vendorContactNo, 10, 110);

    // Add table
    const columns = ['Description', 'Kms', 'Amount', 'Total', 'CGST 2.5%', 'SGST 2.5%'];
    const data = invoiceItems.map((item) => [
      item.description,
      item.saccode,
      item.kms,
      item.amount,
      item.total,
      item.cgst + '%',
      item.sgst + '%',
    ]);

    doc.autoTable({
      startY: 120,
      head: [columns],
      body: data,
      headStyles: {
        fillColor: [51, 51, 255],
        textColor: 255,
      },
      bodyStyles: {
        textColor: 0,
        fillColor: [50, 50, 251],
        valign: 'middle',
      },
    });

    // Add Bank Details
    doc.setFontSize(10);
    doc.text('Bank Details:', 10, doc.autoTable.previous.finalY + 20);
    doc.text('Bank Name: ' + formData.bankname, 10, doc.autoTable.previous.finalY + 30);
    doc.text('Branch Name: ' + formData.branchname, 10, doc.autoTable.previous.finalY + 40);
    doc.text('Account Holder Name: ' + formData.accountHoldername, 10, doc.autoTable.previous.finalY + 50);
    doc.text('Account Number: ' + formData.accountNumber, 10, doc.autoTable.previous.finalY + 60);
    doc.text('IFSC Code: ' + formData.ifsccode, 10, doc.autoTable.previous.finalY + 70);
    doc.text('MICR Code: ' + formData.micrcode, 10, doc.autoTable.previous.finalY + 80);

    // "Right side bottom details" section
    doc.setFontSize(12);
    doc.text('For Shivpushpa Travels', 150, doc.autoTable.previous.finalY + 30);
    doc.text('Authorised Signatory', 150, doc.autoTable.previous.finalY + 60);

    doc.save('invoice.pdf');
  }
  };

  return (
    <>
      <Sidebar />

      <div className="container-vendor-invoice-monthly">
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>Monthly Vendor Invoice</h2>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "5px" }}>Invoice To :</h2>
        <div className="form-vendor-invoice-monthly">
          <div className="grid-gap-2 col-6">
            <label htmlFor="vendorname" className="form-label">Vendor Name:</label>
            <input className="form-control-vendor-invoice-monthly" type="text" placeholder="Vendor Name" id="vendorname" name="vendorname" onChange={handleChange} />
            {/* Add similar input elements for other fields */}
          </div>
          <div className="mb-2 grid-gap-2 col-6">
            <label htmlFor="vendoraddress" className="form-label">Vendor Address:</label>
            <input className="form-control-vendor-invoice-monthly" type="text" placeholder="Vendor Address" id="vendoraddress" name="vendoraddress" onChange={handleChange} />
            {/* Add similar input elements for other fields */}
          </div>
          {/* Add more input elements */}
        </div>

        <div>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Sac Code</th>
                <th>Kms</th>
                <th>Amount</th>
                <th>Total</th>
                <th>CGST</th>
                <th>SGST</th>
                
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>{item.saccode}</td>
                  <td>{item.kms}</td>
                  <td>{item.amount}</td>
                  <td>{item.totalAmount}</td>
                  <td>{item.cgst}</td>
                  <td>{item.sgst}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>


          <button className="btn btn-danger mt-2" onClick={handleGenerate}>
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default VendorInvoiceMonthly;
