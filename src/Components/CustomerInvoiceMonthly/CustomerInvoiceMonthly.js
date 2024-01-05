import React, { useState, useEffect } from 'react';
import './CustomerInvoiceMonthly.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Sidebar from '../Sidebar/Sidebar';
import CustomerInvoice from './../CustomerInvoice/CustomerInvoice';

function CustomerInvoiceMonthly() {
  const [formData, setFormData] = useState({
    invoiceno: '',
    companyName: 'Shivpushpa Travels Invoice',
    gstno: '',
    companyAddress: '332, Kasba Peth  Phadke Haud Chowk,  Pune 411 0111',
    mail: 'travelshivpushpa@gmail.com',
    kind_attn: '',
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
    bankname: 'The Cosmos Co-operative Bank Ltd',
    branchname: 'Kasba Raviwar Branch, Pune 411 002',
    accountNumber: '015204301220061',
    accountHoldername: '',
    ifsccode: 'COSB0000015',
    micrcode: '411164014',
  });
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/customer-payment');
        if (response.ok) {
          const data = await response.json();
          setCustomerList(data);
        } else {
          console.error('Failed to fetch customers');
        }
      } catch (error) {
        console.error('API request error:', error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    // Generate the next invoice number when the component mounts
    const invoiceNumber = getNextInvoiceNumber();

    if (selectedCustomer) {
      setFormData((prevData) => ({
        ...prevData,
        invoiceno: invoiceNumber,
        customer_Name: selectedCustomer.customer_Name || '',
        GST_No: selectedCustomer.GST_No || '',
        Date:selectedCustomer.Date || '',
      }));
    }
  }, [selectedCustomer]);


  const invoiceItems = [
    { description: 'Item 1', saccode: '996601', kms: 100, amount: 50, total: 82.5, cgst: 2.5, sgst: 2.5 },
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

  const getNextInvoiceNumber = () => {
    // Get the last invoice number from the form data
    const lastInvoiceNumber = parseInt(formData.invoiceno) || 0;
    // Calculate the next invoice number
    const nextInvoiceNumber = lastInvoiceNumber + 1;
    // Return the formatted next invoice number (padded with leading zeros)
    return nextInvoiceNumber.toString().padStart(4, '0'); // Ensuring a 4-digit invoice number
};


  const handleGenerate = () => {
    // Generate the next invoice number
    const invoiceNumber = getNextInvoiceNumber();
    // Set the generated invoice number in the form data
    setFormData((prevData) => ({
      ...prevData,
      invoiceno: invoiceNumber,
    }));


    const downloadConfirmed = window.confirm('Do you want to download the invoice?');
  
    if (downloadConfirmed) {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(12);
    
    doc.text(formData.companyName, 10, 10);
    doc.text(formData.companyAddress, 10, 20);
    doc.text('Invoice No: ' + formData.invoiceno, 10, 30);
    doc.text('GST No: ' + formData.gstno, 10, 40);
    // doc.text('Date: ' + formData.date, 10, 50);
    doc.text('Mail: ' + formData.mail, 10, 60);

    // Add content to the right side
    doc.text('PO No: ', 150, 30);
    doc.text('Invoice No: ' + formData.invoiceno, 150, 40);
    doc.text('Date: ' + formData.date, 150, 50);
    doc.text('GST No: 27AABTS4503R1Z1', 150, 60);

    doc.text('Customer Name: ' + formData.customerName, 10, 80);
    doc.text('Customer Address: ' + formData.customerAddress, 10, 90);
    doc.text('Customer GST No: ' + formData.customerGSTNo, 10, 100);
    doc.text('Contact No: ' + formData.customerContactNo, 10, 110);

    // Add table
    const columns = ['Description','Sac Code', 'Kms', 'Amount', 'Total', 'CGST 2.5%', 'SGST 2.5%'];
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
  }
  };


  return (
    <>
      <Sidebar />
      <div className="container-customer-invoice-monthly">
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px' }}>Monthly Customer Invoice</h2>
        <div className="form-customer-invoice-monthly">
          <div className="pt-4 grid-gap-2 col-6">
            <label htmlFor="companyName" className="form-label">
              Company Name:
            </label>
            <input
              className="form-control-customer-invoice-monthly"
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
            <label htmlFor="companyAddress" className="form-label">
              Company Address:
            </label>
            <input
              className="form-control-customer-invoice-monthly"
              type="text"
              id="companyAddress"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
            />
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              className="form-control-customer-invoice-monthly"
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="contactno" className="form-label">
              Contact No
            </label>
            <input
              className="form-control-customer-invoice-monthly"
              type="text"
              id="contactno"
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
              className="form-control-customer-invoice-monthly"
              type="text"
              id="invoiceno"
              name="invoiceno"
              value={formData.invoiceno}
              onChange={handleChange}
            />
            <label htmlFor="gstno" className="form-label">
              GST No
            </label>
            <input
              className="form-control-customer-invoice-monthly"
              type="text"
              id="gstno"
              name="gstno"
              value={formData.gstno}
              onChange={handleChange}
            />
            <label htmlFor="mail" className="form-label">
              Mail
            </label>
            <input
              className="form-control-customer-invoice-monthly"
              type="text"
              id="mail"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
            />
            <label htmlFor="Kind Attn" className="form-label">
              Kind Attn:
            </label>
            <input
              className="form-control-vendor-invoice"
              type="text"
              placeholder="Kind Attn"
              name="kind attn"
              value={formData.kind_attn}
              onChange={handleChange}
            />
          </div>
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '5px' }}>Invoice To:</h2>
        <div className="form-customer-invoice-monthly">
          <div className="grid-gap-2 col-6">
            <label htmlFor="customerName" className="form-label">
              Customer Name:
            </label>
            {/* Dropdown to select a customer */}
            <select
              className="form-control-cust-inq-input"
              id="customername"
              name="customerName"
              onChange={(e) => {
                // Find the selected customer from the list
                const selectedCustomer = customerList.find(
                  (customer) => customer.customer_Name === e.target.value
                );
                // Set the selected customer to state
                setSelectedCustomer(selectedCustomer);
              }}
              value={selectedCustomer ? selectedCustomer.customer_Name : ''}
            >
              <option value="">Select Customer</option>
              {customerList.map((customer) => (
                <option key={customer._id} value={customer.customer_Name}>
                  {customer.customer_Name}
                </option>
              ))}
            </select>
            <label htmlFor="GST_No" className="form-label">
              GST No:
            </label>
            <input
              className="form-control-customer-invoice-monthly"
              type="text"
              id="customerGSTNo"
              name="GST_No"
              value={formData.GST_No}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2 grid-gap-2 col-6">
            <label htmlFor="Date" className="form-label">
              Date:
            </label>
            <input
              className="form-control-customer-invoice-monthly"
              type="date"
              id="Date"
              name="Date"
              value={formData.Date}
              onChange={handleChange}
            />
          </div>
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
                  <td>{item.cgst}%</td>
                  <td>{item.sgst}%</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <br />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '5px' }}>Bank Details:</h2>
          </div>
          <div className="form-customer-invoice-monthly">
            <div className="grid-gap-2 col-6">
              <label htmlFor="bankname" className="form-label">
                Bank Name:
              </label>
              <input
                className="form-control-customer-invoice-monthly"
                type="text"
                id="bankname"
                name="bankname"
                value={formData.bankname}
                onChange={handleChange}
              />
              <label htmlFor="branchname" className="form-label">
                Branch Name:
              </label>
              <input
                className="form-control-customer-invoice-monthly"
                type="text"
                id="branchname"
                name="branchname"
                value={formData.branchname}
                onChange={handleChange}
              />
              <label htmlFor="accountNumber" className="form-label">
                Account Number:
              </label>
              <input
                className="form-control-customer-invoice-monthly"
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
              />
            </div>
            <div className="grid-gap-2 col-6">
              <label htmlFor="accountHoldername" className="form-label">
                Account Holder Name:
              </label>
              <input
                className="form-control-customer-invoice-monthly"
                type="text"
                id="accountHoldername"
                name="accountHoldername"
                value={formData.accountHoldername}
                onChange={handleChange}
              />
              <label htmlFor="ifsccode" className="form-label">
                IFSC Code:
              </label>
              <input
                className="form-control-customer-invoice-monthly"
                type="text"
                id="ifsccode"
                name="ifsccode"
                value={formData.ifsccode}
                onChange={handleChange}
              />
              <label htmlFor="micrcode" className="form-label">
                MICR Code:
              </label>
              <input
                className="form-control-customer-invoice-monthly"
                type="text"
                id="micrcode"
                name="micrcode"
                value={formData.micrcode}
                onChange={handleChange}
              />
            </div>
          </div>
          <button  className="btn btn-danger" onClick={handleGenerate}>
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default CustomerInvoiceMonthly;
