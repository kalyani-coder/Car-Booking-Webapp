import React, { useState } from 'react';
import './CustomerInvoice.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Sidebar from '../Sidebar/Sidebar';

function CustomerInvoice() {
  const [formData, setFormData] = useState({
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
    branchname: '',
    accountNumber: '',
    accountHoldername: '',
    ifsccode: '',
    micrcode: '',
  });

  const invoiceItems = [
    { description: 'Item 1', kms: 100, amount: 50, cgst: 2.5, sgst: 2.5, totalAmount: 55 },
    { description: 'Item 2', kms: 200, amount: 75, cgst: 3.75, sgst: 3.75, totalAmount: 82.5 },
    { description: 'Item 3', kms: 100, amount: 50, cgst: 2.5, sgst: 2.5, totalAmount: 55 },
    { description: 'Item 4', kms: 200, amount: 75, cgst: 3.75, sgst: 3.75, totalAmount: 82.5 },
    { description: 'Item 5', kms: 100, amount: 50, cgst: 2.5, sgst: 2.5, totalAmount: 55 },
    { description: 'Item 6', kms: 200, amount: 75, cgst: 3.75, sgst: 3.75, totalAmount: 82.5 },
    { description: 'Item 7', kms: 100, amount: 50, cgst: 2.5, sgst: 2.5, totalAmount: 55 },
    { description: 'Item 8', kms: 200, amount: 75, cgst: 3.75, sgst: 3.75, totalAmount: 82.5 },
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

    const columns = ['Description', 'Kms', 'Amount', 'CGST', 'SGST', 'Total Amount'];
    const data = invoiceItems.map((item) => [
      item.description,
      item.kms,
      item.amount,
      item.cgst + '%',
      item.sgst + '%',
      item.totalAmount,
    ]);

    doc.text('Customer Invoice', 10, 10);

    doc.autoTable({
      startY: 20,
      head: [columns],
      body: data,
      headStyles: {
        fillColor: [51, 51, 255],
        textColor: 255,
      },
      bodyStyles: {
        textColor: 0,
        fillColor: [50, 50, 251],
        valign: 'middle', // Set vertical alignment to middle
      },
    });

    const companyInfo = [
      ['Company Name:', formData.companyName],
      ['Invoice No:', formData.invoiceno],
      ['Company Address:', formData.companyAddress],
      ['GST No:', formData.gstno],
      ['Company Date:', formData.date],
      ['Company Mail:', formData.mail],
      ['Contact No:', formData.contactno],
    ];

    const customerInfo = [
      ['Customer Name:', formData.customerName],
      ['Customer Address:', formData.customerAddress],
      ['GST No:', formData.customerGSTNo],
      ['Contact No:', formData.customerContactNo],
    ];

    const bankInfo = [
      ['Bank Name:', formData.bankname],
      ['Branch Name:', formData.branchname],
      ['Account Number:', formData.accountNumber],
      ['Account Holder Name:', formData.accountHoldername],
      ['IFSC Code:', formData.ifsccode],
      ['MICR Code:', formData.micrcode],
    ];

    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10,
      body: companyInfo,
    });

    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10,
      body: customerInfo,
    });

    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10,
      body: bankInfo,
    });

    doc.save('invoice.pdf');
  };

  return (
    <>
      <Sidebar />
      <div className="container-customer-invoice">
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>Customer Invoice</h2>
        <div className="form-customer-invoice">
          <div className="pt-4 grid-gap-2 col-6">
            <label htmlFor="companyName" className="form-label">Company Name:</label>
            <input
              className="form-control-customer-invoice"
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
            <label htmlFor="companyAddress" className="form-label">Company Address:</label>
            <input
              className="form-control-customer-invoice"
              type="text"
              id="companyAddress"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
            />
            <label htmlFor="date" className="form-label">Date</label>
            <input
              className="form-control-customer-invoice"
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            {/* <br /> */}
            <label htmlFor="contactno" className="form-label">Contact No</label>
            <input
              className="form-control-customer-invoice"
              type="text"
              id="contactno"
              name="contactno"
              value={formData.contactno}
              onChange={handleChange}
            />
          </div>
          <div className="pt-4 grid-gap-2 col-6">
            <label htmlFor="invoiceno" className="form-label">Invoice No:</label>
            <input
              className="form-control-customer-invoice"
              type="text"
              id="invoiceno"
              name="invoiceno"
              value={formData.invoiceno}
              onChange={handleChange}
            />
            <label htmlFor="gstno" className="form-label">GST No</label>
            <input
              className="form-control-customer-invoice"
              type="text"
              id="gstno"
              name="gstno"
              value={formData.gstno}
              onChange={handleChange}
            />
            <label htmlFor="mail" className="form-label">Mail</label>
            <input
              className="form-control-customer-invoice"
              type="text"
              id="mail"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
            />
          </div>
        </div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "5px" }}>Invoice To :</h2>
        <div className="form-customer-invoice">
          <div className="grid-gap-2 col-6">
            <label htmlFor="customerName" className="form-label">Customer Name:</label>
            <input
              className="form-control-customer-invoice"
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
            />
            <label htmlFor="customerGSTNo" className="form-label">GST No:</label>
            <input
              className="form-control-customer-invoice"
              type="text"
              id="customerGSTNo"
              name="customerGSTNo"
              value={formData.customerGSTNo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2 grid-gap-2 col-6">
            <label htmlFor="customerAddress" className="form-label">Customer Address:</label>
            <input
              className="form-control-customer-invoice"
              type="text"
              id="customerAddress"
              name="customerAddress"
              value={formData.customerAddress}
              onChange={handleChange}
            />
            <label htmlFor="customerContactNo" className="form-label">Contact No</label>
            <input
              className="form-control-customer-invoice"
              type="text"
              id="customerContactNo"
              name="customerContactNo"
              value={formData.customerContactNo}
              onChange={handleChange}
            />
          </div>
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
                  <td>{item.cgst}%</td>
                  <td>{item.sgst}%</td>
                  <td>{item.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <br />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '5px' }}>Bank Details:</h2>
          </div>
          <div className="form-customer-invoice">
            <div className="grid-gap-2 col-6">
              <label htmlFor="bankname" className="form-label">Bank Name:</label>
              <input
                className="form-control-customer-invoice"
                type="text"
                id="bankname"
                name="bankname"
                value={formData.bankname}
                onChange={handleChange}
              />
              <label htmlFor="branchname" className="form-label">Branch Name:</label>
              <input
                className="form-control-customer-invoice"
                type="text"
                id="branchname"
                name="branchname"
                value={formData.branchname}
                onChange={handleChange}
              />
              <label htmlFor="accountNumber" className="form-label">Account Number:</label>
              <input
                className="form-control-customer-invoice"
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
              />
            </div>
            <div className="grid-gap-2 col-6">
              <label htmlFor="accountHoldername" className="form-label">Account Holder Name:</label>
              <input
                className="form-control-customer-invoice"
                type="text"
                id="accountHoldername"
                name="accountHoldername"
                value={formData.accountHoldername}
                onChange={handleChange}
              />
              <label htmlFor="ifsccode" className="form-label">IFSC Code:</label>
              <input
                className="form-control-customer-invoice"
                type="text"
                id="ifsccode"
                name="ifsccode"
                value={formData.ifsccode}
                onChange={handleChange}
              />
              <label htmlFor="micrcode" className="form-label">MICR Code:</label>
              <input
                className="form-control-customer-invoice"
                type="text"
                id="micrcode"
                name="micrcode"
                value={formData.micrcode}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="button" className="btn btn-danger" onClick={handleGenerate}>
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default CustomerInvoice;
