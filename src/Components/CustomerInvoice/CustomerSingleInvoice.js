import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';  // Import jsPDF
import 'jspdf-autotable';
import Sidebar from '../Sidebar/Sidebar';

function CustomerSingleInvoice() {
  const [formData, setFormData] = useState({
    tripid: '',
    invoiceno: '',
    GST_No: '',
    mail: 'travelshivpushpa@gmail.com',
    Date: '',
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

  const [customerList, setCustomerList] = useState([]); // State to store customer list
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [invoiceItems, setInvoiceItems] = useState([]); // State to store invoice items
  const [showInvoiceData, setShowInvoiceData] = useState(false);
  
  

  // Fetch customer list on component mount
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


  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    // If customer name is changed, update other details
    if (name === 'customerName') {
      try {
        const response = await fetch(`https://carbooking-backend-fo78.onrender.com/api/customer-payment/${value}`);
        if (response.ok) {
          const customerData = await response.json();
  
          // Log the customerData to the console to check its structure
          console.log('Customer Data:', customerData);
  
          // Check if the required fields are present in the customerData
          if (customerData) {
            setFormData((prevData) => ({
              ...prevData,
              customer_Name: selectedCustomer.customer_Name || '',
              GST_No: selectedCustomer.GST_No || '',
              Date:selectedCustomer.Date || '',
            }));
  
            // Update invoiceItems based on customerData
            const updatedInvoiceItems = [
              {
                description: `${customerData.vehicle_Type} from ${customerData.from} to ${customerData.to}`,
                saccode: '996601',
                kms: customerData.total_Km,
                amount: customerData.total_Amount,
                total: customerData.total_Amount + (customerData.total_Amount * 5) / 100, // total + 2.5% CGST + 2.5% SGST
                cgst: (customerData.total_Amount * 2.5) / 100,
                sgst: (customerData.total_Amount * 2.5) / 100,
              },
              // Add more items as needed
            ];
  
            setInvoiceItems(updatedInvoiceItems);
          } else {
            console.error('Customer data is not available or does not have the expected fields.');
          }
        } else {
          console.error('Failed to fetch customer data');
        }
      } catch (error) {
        console.error('API request error:', error);
      }
    }
  };
  

  // };
  

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
     doc.text('Single Customer Invoice', 10, 10);
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
    doc.text('Contact No: ' + formData.vendorContactNo, 10, 110);

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
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>Single Customer Invoice</h2>
       

        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "5px" }}>Invoice To :</h2>
        <div className="form-vendor-invoice-monthly">
          <div className="grid-gap-2 col-6">
            <label htmlFor="vendorname" className="form-label">Customer Name:</label>
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
          </div>
          <div className="mb-2 grid-gap-2 col-6">
            <label htmlFor="GST_No" className="form-label">GST No:</label>
            <input
              className="form-control-customer-invoice-monthly"
              type="text"
              id="GST_No"
              name="GST_No"
              value={formData.GST_No}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-vendor-invoice-monthly">
          <div className="grid-gap-2 col-6">
            <label htmlFor="Date" className="form-label">Date:</label>
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
                  <td>{item.cgst}</td>
                  <td>{item.sgst}</td>
                 
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
                name="branchname"
                value={formData.branchname}
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

export default CustomerSingleInvoice;
