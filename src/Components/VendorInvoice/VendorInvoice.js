import React, { useState } from "react";
import "./VendorInvoice.css";
import jsPDF from "jspdf"; // Import jsPDF
import "jspdf-autotable";
import Sidebar from "../Sidebar/Sidebar";

function VendorInvoice() {
  const [formData, setFormData] = useState({
    tripid: "",
    invoiceno: "",
    companyName: "",
    gstno: "",
    companyAddress: "",
    mail: "",
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
    bankname: "",
    branch: "",
    accountNumber: "",
    accountHolderName: "",
    ifsccode: "",
    micrcode: "",
  });

  const invoiceItems = [
    {
      description: "Item 1",
      kms: 100,
      amount: 50,
      cgst: 2.5,
      sgst: 2.5,
      totalAmount: 55,
    },
    {
      description: "Item 2",
      kms: 200,
      amount: 75,
      cgst: 3.75,
      sgst: 3.75,
      totalAmount: 82.5,
    },
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

    const columns = [
      "Description",
      "Kms",
      "Amount",
      "CGST",
      "SGST",
      "Total Amount",
    ];
    const data = invoiceItems.map((item) => [
      item.description,
      item.kms,
      item.amount,
      item.cgst + "%",
      item.sgst + "%",
      item.totalAmount,
    ]);

    doc.text("Vendor Invoice", 10, 10);

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
        valign: "middle", // Set vertical alignment to middle
      },
    });

    const companyInfo = [
      ["Company Name:", formData.companyName],
      ["Invoice No.:", formData.invoiceno],
      ["Company Address:", formData.companyAddress],
      ["Date:", formData.date],
      ["Mail:", formData.mail],
      ["Contact No:", formData.contactno],
      ["Vendor Name:", formData.vendorName],
      ["Vendor Address:", formData.vendorAddress],
      ["GST No:", formData.vendorGSTNo],
      ["Contact No:", formData.vendorContactNo],
      ["Bank Name:", formData.bankname],
      ["Branch Name:", formData.branch],
      ["Account Number:", formData.accountNumber],
      ["Account Holder Name:", formData.accountHolderName],
      ["IFSC Code:", formData.ifsccode],
      ["MICR Code:", formData.micrcode],
    ];

    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10,
      body: companyInfo,
    });

    doc.save("invoice.pdf");
  };

  return (
    <>
      <Sidebar />

      <div className="container-vendor-invoice">
        <h2
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}
        >
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
                  <td>{item.cgst + "%"}</td>
                  <td>{item.sgst + "%"}</td>
                  <td>{item.totalAmount}</td>
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
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleGenerate}
          >
            Generate 
          </button>
        </div>
      </div>
    </>
  );
}

export default VendorInvoice;
