import React, { useState } from "react";
import "./VendorInvoice.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Sidebar from "../Sidebar/Sidebar";

function VendorInvoice() {
  const [formData, setFormData] = useState({
    tripid: "",
    invoiceno: "",
    companyName: 'Shivpushpa Travels Invoice',
    gstno: "",
    companyAddress: '332, Kasba Peth  Phadke Haud Chowk,  Pune 411 0111',
    mail: 'travelshivpushpa@gmail.com',
    date: "",
    contactno: "",
    to: "",
    vendorName: "",
    vendorAddress: "",
    vendorGSTNo: "",
    vendorContactNo: "",
    discount: "",
    kms: "",
    amount: "",
    cgst: "",
    sgst: "",
    totalAmount: "",
    bankname: 'The Cosmos Co-operative Bank Ltd',
    branchname: 'Kasba Raviwar Branch, Pune 411 002',
    accountNumber: '015204301220061',
    accountHoldername: '',
    ifsccode: 'COSB0000015',
    micrcode: '411164014',
  });

  const invoiceItems = [
    { description: 'Item 1', kms: 100, amount: 50, total: 82.5, cgst: 2.5, sgst: 2.5 },
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
    doc.setFontSize(12);
    
    doc.text(formData.companyName, 10, 10);
    doc.text(formData.companyAddress, 10, 20);
    doc.text('Invoice No: ' + formData.invoiceno, 10, 30);
    doc.text('GST No: ' + formData.gstno, 10, 40);
    doc.text('Date: ' + formData.date, 10, 50);
    doc.text('Mail: ' + formData.mail, 10, 60);

    // Add content to the right side
    doc.text('PO No: ', 150, 30);
    doc.text('Invoice No: ' + formData.invoiceno, 150, 40);
    doc.text('Date: ' + formData.date, 150, 50);
    doc.text('Customer ID GST No: 27AABTS4503R1Z1', 150, 60);

    doc.text('Vendor Name: ' + formData.vendorName, 10, 80);
    doc.text('Vendor Address: ' + formData.vendorAddress, 10, 90);
    doc.text('Vendor GST No: ' + formData.vendorGSTNo, 10, 100);
    doc.text('Contact No: ' + formData.vendorContactNo, 10, 110);

    // Add table
    const columns = ['Description', 'Kms', 'Amount', 'Total', 'CGST 2.5%', 'SGST 2.5%'];
    const data = invoiceItems.map((item) => [
      item.description,
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
    doc.text('Bank Details:', 10, doc.autoTable.previous.finalY + 20);
    doc.text('Bank Name: ' + formData.bankname, 10, doc.autoTable.previous.finalY + 30);
    doc.text('Branch Name: ' + formData.branchname, 10, doc.autoTable.previous.finalY + 40);
    doc.text('Account Holder Name: ' + formData.accountHoldername, 10, doc.autoTable.previous.finalY + 50);
    doc.text('Account Number: ' + formData.accountNumber, 10, doc.autoTable.previous.finalY + 60);
    doc.text('IFSC Code: ' + formData.ifsccode, 10, doc.autoTable.previous.finalY + 70);
    doc.text('MICR Code: ' + formData.micrcode, 10, doc.autoTable.previous.finalY + 80);

    // Add Shivpushpa Travels and Authorized Signatory
    doc.text('For Shivpushpa Travels', 150, doc.autoTable.previous.finalY + 30);
    doc.text('Authorised Signatory', 150, doc.autoTable.previous.finalY + 60);

    doc.save('invoice.pdf');
  };

  return (
    <>
      <Sidebar />

      <div className="container-vendor-invoice">
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>
          Vendor Invoice
        </h2>
        <div className="form-vendor-invoice">
          <div className="pt-4 grid-gap-2 col-6">
            <label htmlFor="companyName" className="form-label">
              Company Name:
            </label>
            <input
              className="form-control-vendor-invoice"
              type="text"
              placeholder="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
            <label htmlFor="companyAddress" className="form-label">
              Company Address:
            </label>
            <input
              className="form-control-vendor-invoice"
              type="text"
              placeholder="Company Address"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
            />
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              className="form-control-vendor-invoice"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="contactno" className="form-label">
              Contact No
            </label>
            <input
              className="form-control-vendor-invoice"
              placeholder="Contact No."
              type="text"
              name="contactno"
              value={formData.contactno}
              onChange={handleChange}
            />
          </div>
          <div className="pt-4 grid-gap-2 col-6">
            <label htmlFor="invoiceno" className="form-label">
              Invoice No:
            </label>
            <input
              className="form-control-vendor-invoice"
              type="text"
              placeholder="Invoice No."
              name="invoiceno"
              value={formData.invoiceno}
              onChange={handleChange}
            />
            <label htmlFor="gstno" className="form-label">
              GST No
            </label>
            <input
              className="form-control-vendor-invoice"
              placeholder="GST No."
              type="text"
              name="gstno"
              value={formData.gstno}
              onChange={handleChange}
            />
            <label htmlFor="mail" className="form-label">
              Mail
            </label>
            <input
              className="form-control-vendor-invoice"
              type="text"
              placeholder="Mail"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
            />
          </div>
        </div>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          Invoice To :
        </h2>

        <div className="form-vendor-invoice">
          <div className="grid-gap-2 col-6">
            <label htmlFor="vendorName" className="form-label">
              Vendor Name:
            </label>
            <input
              className="form-control-vendor-invoice"
              type="text"
              placeholder="Vendor Name"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
            />
            <label htmlFor="vendorGSTNo" className="form-label">
              GST No:
            </label>
            <input
              className="form-control-vendor-invoice"
              type="text"
              placeholder="GST No."
              name="vendorGSTNo"
              value={formData.vendorGSTNo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2 grid-gap-2 col-6">
            <label htmlFor="vendorAddress" className="form-label">
              Vendor Address:
            </label>
            <input
              className="form-control-vendor-invoice"
              type="text"
              placeholder="Vendor Address"
              name="vendorAddress"
              value={formData.vendorAddress}
              onChange={handleChange}
            />
            <label htmlFor="vendorContactNo" className="form-label">
              Contact No
            </label>
            <input
              className="form-control-vendor-invoice"
              type="text"
              placeholder="Contact No."
              name="vendorContactNo"
              value={formData.vendorContactNo}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>SAC Code</th>
                <th>Kms</th>
                <th>Amount</th>
                <th>Total</th>
                <th>CGST 2.5%</th>
                <th>SGST 2.5%</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>{item.saccode}</td>
                  <td>{item.kms}</td>
                  <td>{item.amount}</td>
                  <td>{item.total}</td>
                  <td>{item.cgst + "%"}</td>
                  <td>{item.sgst + "%"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <label>Bank Details:</label>
          </div>
          <div className="form-vendor-invoice">
            <div className="grid-gap-2 col-6">
              <label htmlFor="bankname" className="form-label">
                Bank Name:
              </label>
              <input
                className="form-control-vendor-invoice"
                type="text"
                placeholder="Bank Name"
                name="bankname"
                value={formData.bankname}
                onChange={handleChange}
              />
              <label htmlFor="accountNumber" className="form-label">
                Account Number:
              </label>
              <input
                className="form-control-vendor-invoice"
                type="text"
                placeholder="Account Number"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
              />
              <label htmlFor="ifsccode" className="form-label">
                IFSC Code:
              </label>
              <input
                className="form-control-vendor-invoice"
                type="text"
                placeholder="IFSC Code"
                name="ifsccode"
                value={formData.ifsccode}
                onChange={handleChange}
              />
            </div>
            <div className="grid-gap-2 col-6">
              <label htmlFor="branch" className="form-label">
                Branch Name:
              </label>
              <input
                className="form-control-vendor-invoice"
                type="text"
                placeholder="Branch Name"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              />
              <label htmlFor="accountHolderName" className="form-label">
                Account Holder Name:
              </label>
              <input
                className="form-control-vendor-invoice"
                type="text"
                placeholder="Account Holder Name"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
              />
              <label htmlFor="micrcode" className="form-label">
                MICR Code:
              </label>
              <input
                className="form-control-vendor-invoice"
                type="text"
                placeholder="MICR Code"
                name="micrcode"
                value={formData.micrcode}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="btn btn-danger" onClick={handleGenerate}>
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default VendorInvoice;
