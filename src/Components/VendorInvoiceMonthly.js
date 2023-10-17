import React, { useState } from 'react';
import './VendorInvoiceMonthly.css';
import Sidebar from './Sidebar';


function VendorInvoiceMonthly() {
  const [formData, setFormData] = useState({
    tripid:'',
    invoiceno:'',
    companyName: '',
    gstno:'',
    companyAddress: '',
    mail:'',
    date:'',
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
    bankname:'',
    branch:'',
    accountNumber:'',
    ifsccode:'',
    micrcode:''
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
    <Sidebar/>
    
    <div className="container">
      <div className="form">
  <div className=" pt-4  grid-gap-2  col-6">
  <label htmlFor="tripid" className="form-label">Trip Id:</label>
  <input className="form-control" type="text" id="tripid"/>
  <label htmlFor="companyname" className="form-label">Company Name:</label>
  <input className="form-control" type="text" id="companyname"/>
  <label htmlFor="companyaddress" className="form-label">Company Address:</label>
  <input className="form-control" type="text" id="companyaddress"/>
  <label htmlFor="date" className="form-label">Date</label>
  <input className="form-control" type="text" id="date"/>
  <div className="to-design ">
   <label>Invoice To :</label>
  </div>
  </div>
  <div className=" pt-4  grid-gap-2  col-6">
  <label htmlFor="invoiceno" className="form-label">Invoice No:</label>
  <input className="form-control" type="text" id="gstno"/>
  <label htmlFor="gstno" className="form-label">GST No</label>
  <input className="form-control" type="text" id="gstno"/>
  <label htmlFor="mail" className="form-label">Mail</label>
  <input className="form-control" type="text" id="mail"/>
  <label htmlFor="contactno" className="form-label">Contact No</label>
  <input className="form-control" type="text" id="contactno"/>
  </div>
  </div>
  <div className="form">
  <div className="   grid-gap-2  col-6">
  <label htmlFor="customername" className="form-label">Customer Name:</label>
  <input className="form-control" type="text" id="customername"/>
  <label htmlFor="gastno" className="form-label">GST No:</label>
  <input className="form-control" type="text" id="gstno"/>
  </div>
  <div className="  mb-2 grid-gap-2  col-6">
  <label htmlFor="customeraddress" className="form-label">Customer Address:</label>
  <input className="form-control" type="text" id="address"/>
  <label htmlFor="contactno" className="form-label">Contact No</label>
  <input className="form-control" type="text" id="contactno"/>
  </div>
  </div>
  <div>
  <table className="min-w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Kms</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">CGST (2.5%)</th>
            <th className="border px-4 py-2">SGST (2.5%)</th>
            <th className="border px-4 py-2">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.description}</td>
              <td className="border px-4 py-2">{item.kms}</td>
              <td className="border px-4 py-2">{item.amount}</td>
              <td className="border px-4 py-2">{item.cgst}</td>
              <td className="border px-4 py-2">{item.sgst}</td>
              <td className="border px-4 py-2">{item.totalAmount}</td>
     </tr>
          ))}
           
        </tbody>
      </table>
      <div>
        <label>Bank Details:</label>
      </div>
      <div className="form">
  <div className="   grid-gap-2  col-6">
  <label htmlFor="bankname" className="form-label">Bank Name:</label>
  <input className="form-control" type="text" id="bankname"/>
  <label htmlFor="acnumber" className="form-label">Account Number:</label>
  <input className="form-control" type="text" id="acnumber"/>
  <label htmlFor="ifsccode" className="form-label">IFSC Code:</label>
  <input className="form-control" type="text" id="ifsccode"/>
    </div>
    <div className="grid-gap-2 col-6">
    <label htmlFor="branchname" className="form-label">Branch Name:</label>
  <input className="form-control" type="text" id="branchname"/>
  <label htmlFor="acholdername" className="form-label">Account Holder Name:</label>
  <input className="form-control" type="text" id="acholdername"/>
  <label htmlFor="micrcode" className="form-label">MICR Code:</label>
  <input className="form-control" type="text" id="micrcode"/>
    </div>
  </div>
  <button type="button" className="btn btn-danger" onClick={handleGenerate}>
         Generate
     </button>
      </div>
  </div>

  </>
 

)};
export default VendorInvoiceMonthly;