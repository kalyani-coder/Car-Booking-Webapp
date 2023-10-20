import React, { useState } from 'react';
import './VendorInvoice.css';
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
    bankname: '',
    branch: '',
    accountNumber: '',
    ifsccode: '',
    micrcode: ''
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
  };

  return (
    <>
      <Sidebar />

      <div className="container-vendor-invoice">
      <h2 style={{fontSize:"2rem",fontWeight:"bold",marginBottom:"8px"}}>Vendor Invoice</h2>
        <div className="form-vendor-invoice">
          <div className=" pt-4  grid-gap-2  col-6">
            {/* <label htmlFor="tripid" className="form-label">Trip Id:</label> */}
            {/* <input className="form-control-vendor-invoice" type="text" id="tripid" /> */}
            <label htmlFor="companyname" className="form-label">Company Name:</label>
            <input className="form-control-vendor-invoice" type="text" placeholder="Company Name" id="companyname" />
            <label htmlFor="companyaddress" className="form-label">Company Address:</label>
            <input className="form-control-vendor-invoice" type="text" placeholder="Company Address" id="companyaddress" />
            <label htmlFor="date" className="form-label">Date</label>
            <input className="form-control-vendor-invoice" type="date" id="date" />
            <br />
            <label htmlFor="contactno" className="form-label">Contact No</label>
            <input className="form-control-vendor-invoice" placeholder="Contact No." type="text" id="contactno" />
          </div>
          <div className=" pt-4  grid-gap-2  col-6">
            <label htmlFor="invoiceno" className="form-label">Invoice No:</label>
            <input className="form-control-vendor-invoice" type="text" placeholder="Invoice No." id="gstno" />
            <label htmlFor="gstno" className="form-label">GST No</label>
            <input className="form-control-vendor-invoice" placeholder="GST No." type="text" id="gstno" />
            <label htmlFor="mail" className="form-label">Mail</label>
            <input className="form-control-vendor-invoice" type="text" placeholder="Mail" id="mail" />




          </div>
        </div>


        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "5px" }}>Invoice To :</h2>

        <div className="form-vendor-invoice">


          <div className="   grid-gap-2  col-6">
            <label htmlFor="customername" className="form-label">Vendor Name:</label>
            <input className="form-control-vendor-invoice" type="text" placeholder="Vendor Name" id="vendorname" />
            <label htmlFor="gastno" className="form-label">GST No:</label>
            <input className="form-control-vendor-invoice" type="text" placeholder="GST No." id="gstno" />
          </div>
          <div className="  mb-2 grid-gap-2  col-6">
            <label htmlFor="customeraddress" className="form-label">Vendor Address:</label>
            <input className="form-control-vendor-invoice" type="text" placeholder="Vendor Address" id="vendoraddress" />
            <label htmlFor="contactno" className="form-label">Contact No</label>
            <input className="form-control-vendor-invoice" type="text" placeholder="Contact No." id="contactno" />
          </div>
        </div>
        <div>
          <table class="invoice-table">
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

              <tr>
                <td>Item 1</td>
                <td>100</td>
                <td>50</td>
                <td>2.5%</td>
                <td>2.5%</td>
                <td>55</td>
              </tr>
              <tr>
                <td>Item 2</td>
                <td>200</td>
                <td>75</td>
                <td>3.75%</td>
                <td>3.75%</td>
                <td>82.5</td>
              </tr>

            </tbody>
          </table>
          <div>
            <label>Bank Details:</label>
          </div>
          <div className="form-vendor-invoice">
            <div className="   grid-gap-2  col-6">
              <label htmlFor="bankname" className="form-label">Bank Name:</label>
              <input className="form-control-vendor-invoice" type="text" placeholder="Bank Name" id="bankname" />
              <label htmlFor="acnumber" className="form-label">Account Number:</label>
              <input className="form-control-vendor-invoice" type="text" placeholder="Account Number" id="acnumber" />
              <label htmlFor="ifsccode" className="form-label">IFSC Code:</label>
              <input className="form-control-vendor-invoice" type="text" placeholder="IFSC Code" id="ifsccode" />
            </div>
            <div className="grid-gap-2 col-6">
              <label htmlFor="branchname" className="form-label">Branch Name:</label>
              <input className="form-control-vendor-invoice" type="text" placeholder="Branch Name" id="branchname" />
              <label htmlFor="acholdername" className="form-label">Account Holder Name:</label>
              <input className="form-control-vendor-invoice" type="text" placeholder="Account Holder Name" id="acholdername" />
              <label htmlFor="micrcode" className="form-label">MICR Code:</label>
              <input className="form-control-vendor-invoice" type="text" placeholder="MICR Code" id="micrcode" />
            </div>
          </div>
          <button type="button-vendor" className="btn btn-danger" onClick={handleGenerate}>
            Generate
          </button>
        </div>
      </div>

    </>


  )
};
export default VendorInvoiceMonthly;