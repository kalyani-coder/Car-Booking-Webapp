import React, { useState } from 'react';
import './CustomerInvoiceMonthly.css';
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

      <div className="container-customer-invoice-monthly">
      <h2 style={{fontSize:"2rem",fontWeight:"bold",marginBottom:"8px"}}>Monthly Customer Invoice </h2>
        <div className="form-customer-invoice-monthly">    
          <div className=" pt-4  grid-gap-2  col-6">
            {/* <label htmlFor="tripid" className="form-label">Trip Id:</label> */}
            {/* <input className="form-control-customer-invoice-monthly" type="text" id="tripid" /> */}
            <label htmlFor="companyname" className="form-label">Company Name:</label>
            <input className="form-control-customer-invoice-monthly" placeholder="Company Name" type="text" id="companyname" />
            <label htmlFor="companyaddress" className="form-label">Company Address:</label>
            <input className="form-control-customer-invoice-monthly" placeholder="Company Address" type="text" id="companyaddress" />
            <label htmlFor="date" className="form-label">Date</label>
            <input className="form-control-customer-invoice-monthly" type="date" id="date" />
            <br />
            <label htmlFor="contactno" className="form-label">Contact No</label>
            <input className="form-control-customer-invoice-monthly" placeholder="Contact No." type="text" id="contactno" />
          </div>
          <div className=" pt-4  grid-gap-2  col-6">
            <label htmlFor="invoiceno" className="form-label">Invoice No:</label>
            <input className="form-control-customer-invoice-monthly" placeholder="Invoice No." type="text" id="gstno" />
            <label htmlFor="gstno" className="form-label">GST No</label>
            <input className="form-control-customer-invoice-monthly" placeholder="GST No." type="text" id="gstno" />
            <label htmlFor="mail" className="form-label">Mail</label>
            <input className="form-control-customer-invoice-monthly" placeholder="Mail" type="text" id="mail" />




          </div>
        </div>


        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "5px" }}>Invoice To :</h2>

        <div className="form-customer-invoice-monthly">


          <div className="   grid-gap-2  col-6">
            <label htmlFor="customername" className="form-label">Customer Name:</label>
            <input className="form-control-customer-invoice-monthly" placeholder="Customer Name" type="text" id="customername" />
            <label htmlFor="gastno" className="form-label">GST No:</label>
            <input className="form-control-customer-invoice-monthly" type="text" placeholder="GST No." id="gstno" />
          </div>
          <div className="  mb-2 grid-gap-2  col-6">
            <label htmlFor="customeraddress" className="form-label">Customer Address:</label>
            <input className="form-control-customer-invoice-monthly" type="text" placeholder="Customer Address" id="address" />
            <label htmlFor="contactno" className="form-label">Contact No</label>
            <input className="form-control-customer-invoice-monthly" placeholder="Conatct No." type="text" id="contactno" />
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

            <br />
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "5px" }}>Bank Details:</h2>
          </div>
          <div className="form-customer-invoice-monthly">
            <div className="   grid-gap-2  col-6">
              <label htmlFor="bankname" className="form-label">Bank Name:</label>
              <input className="form-control-customer-invoice-monthly" placeholder="Bank Name" type="text" id="bankname" />
              <label htmlFor="acnumber" className="form-label">Account Number:</label>
              <input className="form-control-customer-invoice-monthly" placeholder="Account Number" type="text" id="acnumber" />
              <label htmlFor="ifsccode" className="form-label">IFSC Code:</label>
              <input className="form-control-customer-invoice-monthly" placeholder="IFSC Code" type="text" id="ifsccode" />
            </div>
            <div className="grid-gap-2 col-6">
              <label htmlFor="branchname" className="form-label">Branch Name:</label>
              <input className="form-control-customer-invoice-monthly" placeholder="Branch Name" type="text" id="branchname" />
              <label htmlFor="acholdername" className="form-label">Account Holder Name:</label>
              <input className="form-control-customer-invoice-monthly" placeholder="Account Holder Name" type="text" id="acholdername" />
              <label htmlFor="micrcode" className="form-label">MICR Code:</label>
              <input className="form-control-customer-invoice-monthly" type="text" placeholder="MICR Code" id="micrcode" />
            </div>
          </div>
          <button type="button-customer" className="btn btn-danger" onClick={handleGenerate}>
            Generate
          </button>
        </div>
      </div>

    </>


  )
};
export default VendorInvoiceMonthly;