import React, { useState, useEffect } from 'react';
import './CustomerInvoice.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Sidebar from '../Sidebar/Sidebar';

// const getCurrentDateFormatted = () => {
//   const currentDate = new Date();
//   const day = currentDate.getDate().toString().padStart(2, '0');
//   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
//   const year = currentDate.getFullYear();
//   return `${day}/${month}/${year}`;
// };

const initialFormData = {
    invoiceno: '',
    companyName: 'Shivpushpa Travels Invoice',
    kind_attn: '',
    gstno: '',
    companyAddress: '332, Kasba Peth Phadke Haud Chowk, Pune 411 0111',
    mail: 'travelshivpushpa@gmail.com',
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
  };

  function CustomerInvoice() {
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');
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
      
    //  const invoiceNumber = getNextInvoiceNumber();

      if (selectedCustomer) {
        setFormData((prevData) => ({
          ...prevData,
          // invoiceno: invoiceNumber,
          customerName: selectedCustomer.customer_Name  || '',
          GST_No: selectedCustomer.GST_No  || '',
          Date:selectedCustomer.Date || '',
          
        }));
      }
    }, [selectedCustomer]);
  
  

  const [invoiceItems, setInvoiceItems] = useState([
    {
      description: '',
      saccode: '',
      kms: '',
      amount: '',
      total: '',
      cgst: '',
      sgst: '',
    },
  ]);

  const [totalAmount, setTotalAmount] = useState(0);

  const [overallTotals, setOverallTotals] = useState({
    totalAmount: 0,
    totalCGST: 0,
    totalSGST: 0,
  });

  useEffect(() => {
    calculateTotalAmount();
  }, [invoiceItems]);

  const calculateTotalAmount = () => {
    let total = 0;
    invoiceItems.forEach((item) => {
      total += parseFloat(item.total) || 0;
    });
    setTotalAmount(total.toFixed(2));
  };
  
  

  useEffect(() => {
    calculateTotalAmount();
  }, [invoiceItems]);

  const recalculateOverallTotals = (items) => {
    const totalCGST = items.reduce((acc, item) => acc + parseFloat(item.cgst) || 0, 0);
    const totalSGST = items.reduce((acc, item) => acc + parseFloat(item.sgst) || 0, 0);
    const totalAmount =
      items.reduce((acc, item) => acc + parseFloat(item.total) || 0, 0) + totalCGST + totalSGST;

    setOverallTotals({
      totalAmount: totalAmount.toFixed(2),
      totalCGST: totalCGST.toFixed(2),
      totalSGST: totalSGST.toFixed(2),
    });
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    const updatedItems = [...invoiceItems];
    updatedItems[index][name] = value;

    if (name === 'kms' || name === 'amount') {
      const kms = parseFloat(updatedItems[index]['kms']) || 0;
      const standardRate = 20;
      const extraRate1 = 18; // Rate for kilometers beyond 80 up to 300
      const extraRate2 = 15; // Rate for kilometers beyond 300
  
      let baseKms, extraRate;
      if (kms <= 80) {
        baseKms = kms;
        extraRate = 0;
      } else if (kms <= 300) {
        baseKms = 80;
        extraRate = extraRate1;
      } else {
        baseKms = 300;
        extraRate = extraRate2;
      }
  
      const extraKms = kms - baseKms;
  
      updatedItems[index]['amount'] = standardRate * baseKms + extraRate * extraKms;
      updatedItems[index]['total'] = updatedItems[index]['amount'].toFixed(2);
  
      const total = parseFloat(updatedItems[index]['total']) || 0;
      updatedItems[index]['cgst'] = ((total * 2.5) / 100).toFixed(2);
      updatedItems[index]['sgst'] = ((total * 2.5) / 100).toFixed(2);
    }
  

    setInvoiceItems(updatedItems);
    recalculateOverallTotals(updatedItems);
  };

  const handleAddItem = () => {
    const newItem = {
      description: '',
      saccode: '',
      kms: '',
      amount: '',
      total: '',
      cgst: '',
      sgst: '',
    };

    setInvoiceItems([...invoiceItems, newItem]);
    recalculateOverallTotals([...invoiceItems, newItem]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...invoiceItems];
    updatedItems.splice(index, 1);
    setInvoiceItems(updatedItems);
    recalculateOverallTotals(updatedItems);
  };

//   const getNextInvoiceNumber = () => {
    
//     const lastInvoiceNumber = parseInt(formData.invoiceno) || 0;
    
//     const nextInvoiceNumber = lastInvoiceNumber + 1;
    
//     return nextInvoiceNumber.toString().padStart(4, '0'); 
// };

  const handleGenerate = () => {
    // Generate the next invoice number
    // const invoiceNumber = getNextInvoiceNumber();
    // Set the generated invoice number in the form data
    setFormData((prevData) => ({
      ...prevData,
      // invoiceno: invoiceNumber,
    }));
  
    const downloadConfirmed = window.confirm('Do you want to download the invoice?');

    if (downloadConfirmed) {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text(formData.companyName, 10, 10);
    doc.text(formData.companyAddress, 10, 20);
    doc.text('Invoice No: ' + formData.invoiceno, 10, 30);

    doc.text('PO No: ', 150, 30);
    doc.text('Invoice No: ' + formData.invoiceno, 150, 40);
    doc.text('GST No: ' + formData.gstno, 10, 40);
    doc.text('Date: ' + formData.date, 150, 50);
    doc.text('Customer ID:', 150, 60);

    doc.text('Customer Name: ' + formData.customerName, 10, 80);
    doc.text('Customer Address: ' + formData.customerAddress, 10, 90);
    doc.text('Customer GST No: ' + formData.customerGSTNo, 10, 100);
    doc.text('Contact No: ' + formData.customerContactNo, 10, 110);

    const columns = ['Description','Sac Code', 'Kms', 'Amount', 'Total', 'CGST 2.5%', 'SGST 2.5%'];
    const data = invoiceItems.map((item) => [
      item.description,
      item.saccode,
      item.kms,
      item.amount,
      item.total,
      item.cgst,
      item.sgst,
    ]);

    doc.autoTable({
      startY: 120,
      head: [columns],
      body: data,
      headStyles: {
        textColor: 255,
      },
      bodyStyles: {
        textColor: 0,
        valign: 'middle',
      },
    });

    doc.text('Bank Details:', 10, doc.autoTable.previous.finalY + 20);
    doc.text('Bank Name: ' + formData.bankname, 10, doc.autoTable.previous.finalY + 30);
    doc.text('Branch Name: ' + formData.branchname, 10, doc.autoTable.previous.finalY + 40);
    doc.text('Account Holder Name: ' + formData.accountHoldername, 10, doc.autoTable.previous.finalY + 50);
    doc.text('Account Number: ' + formData.accountNumber, 10, doc.autoTable.previous.finalY + 60);
    doc.text('IFSC Code: ' + formData.ifsccode, 10, doc.autoTable.previous.finalY + 70);
    doc.text('MICR Code: ' + formData.micrcode, 10, doc.autoTable.previous.finalY + 80);

    doc.text('For Shivpushpa Travels', 150, doc.autoTable.previous.finalY + 30);
    doc.text('Authorised Signatory', 150, doc.autoTable.previous.finalY + 60);

    doc.text('Total CGST: ' + overallTotals.totalCGST, 10, doc.autoTable.previous.finalY + 80);
    doc.text('Total SGST: ' + overallTotals.totalSGST, 10, doc.autoTable.previous.finalY + 90);
    doc.text('Grand Total: ' + overallTotals.totalAmount, 10, doc.autoTable.previous.finalY + 100);


    doc.save('invoice.pdf');
  }
  };


  return (
    <>
      <Sidebar />
      <div className="container-customer-invoice-monthly">
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px' }}>Customer Invoice</h2>
        <div className="form-customer-invoice-monthly">
          <div className="pt-4 grid-gap-2 col-6">
            
          <label htmlFor="customerName" className="form-label">
              Customer Name:
            </label>
            {/* Dropdown to select a customer */}
            <select
              className="form-control-cust-inq-input"
              id="customerName"
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
          <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              className="form-control-customer-invoice-monthly"
              type="date"
              id="date"
              name="date"
              value={formData.Date}
              onChange={handleChange}
            />
            <br />
           
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
              placeholder="Invoice No"
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
              placeholder="GST No"
              value={formData.GST_No}
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
                  (customer) => customer.Cus_name === e.target.value
                );
                // Set the selected customer to state
                setSelectedCustomer(selectedCustomer);
              }}
              value={selectedCustomer ? selectedCustomer.Cus_name : ''}
            >
              <option value="">Select Customer</option>
              {customerList.map((customer) => (
                <option key={customer._id} value={customer.Cus_name}>
                  {customer.Cus_name}
                </option>
              ))}
            </select>


            <label htmlFor="customerGSTNo" className="form-label">
              GST No:
            </label>
            <input
              className="form-control-customer-invoice-monthly"
              type="text"
              id="customerGSTNo"
              name="customerGSTNo"
              placeholder="Customer GST No"
              value={formData.customerGSTNo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2 grid-gap-2 col-6">
            <label htmlFor="customerAddress" className="form-label">
              Customer Address:
            </label>
            <input
              className="form-control-customer-invoice-monthly"
              type="text"
              id="customerAddress"
              name="customerAddress"
              placeholder="Customer Address"
              value={formData.customerAddress}
              onChange={handleChange}
            />
            <label htmlFor="customerContactNo" className="form-label">
              Contact No
            </label>
            <input
              className="form-control-customer-invoice-monthly"
              type="text"
              id="customerContactNo"
              name="customerContactNo"
              placeholder="Contact No"
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
                <th>Total</th>
                <th>CGST 2.5%</th>
                <th>SGST 2.5%</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={item.description}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="kms"
                      value={item.kms}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="amount"
                      value={item.amount}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </td>
                  <td>{item.total}</td>
                  <td>{item.cgst}</td>
                  <td>{item.sgst}</td>
                </tr>
              ))}
                    <tr>
              <td colSpan="2">Total CGST</td>
              <td></td>
              <td></td>
              <td>{overallTotals.totalCGST}</td>
              <td></td>
            </tr>
            <tr>
              <td colSpan="2">Total SGST</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{overallTotals.totalSGST}</td>
            </tr>
            <tr>
              <td colSpan="2">Grand Total</td>
              <td></td>
              <td>{overallTotals.totalAmount}</td>
              <td></td>
              <td></td>
            </tr>
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={handleAddItem}>
            Add Item
          </button>
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
                placeholder="Account Holder"
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
          {totalAmount && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '5px' }}>Total Amount: {totalAmount}</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CustomerInvoice;
