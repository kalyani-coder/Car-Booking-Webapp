import React, { useState } from 'react';
import jsPDF from 'jspdf';  // Import jsPDF
import './VendorInvoiceMonthly.css';
import Sidebar from '../Sidebar/Sidebar';

function VendorInvoiceMonthly() {
  const [formData, setFormData] = useState({
    tripid: '',
    invoiceno: '',
    companyName: '',
    gstno: '',
    companyAddress: '',
    mail: '',
    date: '',
    contactno: '',
    to: '',
    customerName: '',
    customerAddress: '',
    customerGSTNo: '',
    customerContactNo: '',
    discount: '',
    kms: '',
    amount: '',
    cgst: '',
    sgst: '',
    totalAmount: '',
    bankname: '',
    branch: '',
    accountNumber: '',
    ifsccode: '',
    micrcode: ''
  });

  const invoiceItems = [
    { description: 'Item 1', kms: 100, amount: 50, cgst: 2.5, sgst: 2.5, totalAmount: 55 },
    { description: 'Item 2', kms: 200, amount: 75, cgst: 3.75, sgst: 3.75, totalAmount: 82.5 },
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
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text('Monthly Vendor Invoice', 10, 10);
    doc.text('Company Name: ' + formData.companyName, 10, 20);
    doc.text('Company Address: ' + formData.companyAddress, 10, 30);
    doc.text('GST No: ' + formData.gstno, 10, 40);
    // Add more content as needed...

    // Save the PDF
    doc.save('invoice.pdf');
  };

  return (
    <>
      <Sidebar />

      <div className="container-vendor-invoice-monthly">
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>Monthly Vendor Invoice</h2>
        <div className="form-vendor-invoice-monthly">
          <div className="pt-4 grid-gap-2 col-6">
            <label htmlFor="companyName" className="form-label">Company Name:</label>
            <input className="form-control-vendor-invoice-monthly" type="text" placeholder="Company Name" id="companyName" name="companyName" onChange={handleChange} />
            {/* Add similar input elements for other fields */}
          </div>
          <div className="pt-4 grid-gap-2 col-6">
            <label htmlFor="gstno" className="form-label">GST No:</label>
            <input className="form-control-vendor-invoice-monthly" type="text" placeholder="GST No." id="gstno" name="gstno" onChange={handleChange} />
            {/* Add similar input elements for other fields */}
          </div>
          {/* Add more input elements */}
        </div>

        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "5px" }}>Invoice To :</h2>
        <div className="form-vendor-invoice-monthly">
          <div className="grid-gap-2 col-6">
            <label htmlFor="customerName" className="form-label">Vendor Name:</label>
            <input className="form-control-vendor-invoice-monthly" type="text" placeholder="Vendor Name" id="customerName" name="customerName" onChange={handleChange} />
            {/* Add similar input elements for other fields */}
          </div>
          <div className="mb-2 grid-gap-2 col-6">
            <label htmlFor="customerAddress" className="form-label">Vendor Address:</label>
            <input className="form-control-vendor-invoice-monthly" type="text" placeholder="Vendor Address" id="customerAddress" name="customerAddress" onChange={handleChange} />
            {/* Add similar input elements for other fields */}
          </div>
          {/* Add more input elements */}
        </div>

        <div>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Kms</th>
                <th>Amount</th>
                <th>CGST</th>
                <th>SGST</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>{item.kms}</td>
                  <td>{item.amount}</td>
                  <td>{item.cgst}</td>
                  <td>{item.sgst}</td>
                  <td>{item.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <label>Bank Details:</label>
          </div>

          <div className="form-vendor-invoice-monthly">
            <div className="grid-gap-2 col-6">
              <label htmlFor="bankname" className="form-label">Bank Name:</label>
              <input className="form-control-vendor-invoice-monthly" type="text" placeholder="Bank Name" id="bankname" name="bankname" onChange={handleChange} />
              {/* Add similar input elements for other fields */}
            </div>
            <div className="grid-gap-2 col-6">
              <label htmlFor="accountNumber" className="form-label">Account Number:</label>
              <input className="form-control-vendor-invoice-monthly" type="text" placeholder="Account Number" id="accountNumber" name="accountNumber" onChange={handleChange} />
              {/* Add similar input elements for other fields */}
            </div>
            {/* Add more input elements */}
          </div>

          <button type="button" className="btn btn-danger" onClick={handleGenerate}>
            Generate PDF
          </button>
        </div>
      </div>
    </>
  );
}

export default VendorInvoiceMonthly;
