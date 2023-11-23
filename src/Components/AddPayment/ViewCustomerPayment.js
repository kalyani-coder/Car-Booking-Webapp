import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ViewCustomerPayment = () => {
  const [customers, setcustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchcustomers = async () => {
      try {
        const response = await fetch('https://carbooking-backend-fo78.onrender.com/api/customer-payment');
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        const data = await response.json();
        setcustomers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchcustomers();
  }, []);

  const handleGenerateInvoice = (customerId) => {
    // Fetch customer data for the specified customer ID
    const customer = customers.find((customer) => customer._id === customerId);

    if (customer) {
      const doc = new jsPDF();

      // Set the document title
      doc.text('View Customer Payment Invoice', 10, 10);

      // Define the columns and rows for the table
      const columns = ['Field', 'Value'];
      const rows = [
        ['Company Name', customer.company_Name],
        ['GST No', customer.GST_No],
        ['Reporting Address', customer.reporting_Address],
        ['Date', customer.Date],
        ['Customer Name', customer.customer_Name],
        ['Vehicle Number', customer.vehicle_Number],
        ['Vehicle Type', customer.vehicle_Type],
        ['Quantity', customer.quantity],
        ['From', customer.from],
        ['To', customer.to],
        ['Closing KM', customer.closing_km],
        ['Closing Time', customer.closing_Time],
        ['Starting KM', customer.starting_Km],
        ['Starting Time', customer.starting_Time],
        ['Total KM', customer.total_Km],
        ['Title', customer.title],
        ['Title Amount', customer.title_Amount],
        ['Extra KM', customer.extra_Km],
        ['ExtraKM Amount', customer.extramkm_Amount],
        ['Extra Hours', customer.extra_Hours],
        ['ExtraHours Amount', customer.extrahours_Amount],
        ['SGST', customer.SGST],
        ['CGST', customer.CGST],
        ['Total Amount', customer.total_Amount],
        ['Advance Amount', customer.advance_Amount],
        ['Remaining Amount', customer.remaining_Amount],
        ['Payment Method', customer.payment_Method],
      ];

      // Set the table position and dimensions
      const tableY = 20;

      // Add the table to the PDF
      doc.autoTable({
        head: [columns],
        body: rows,
        startY: tableY,
        theme: 'grid',
      });

      // Save the PDF or open in a new tab
      doc.save(`Invoice_${customer._id}.pdf`);
    } else {
      console.error('Customer not found.');
    }
  };

  const filteredcustomers = customers.filter((customer) => {
    const customerName = customer.customer_Name || '';
    const companyName = customer.company_Name || '';
    return (
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Sidebar />
      <div className="customer-Add-container">
        <div className="customer-main-container">
          <h1 className="text-2xl font-semibold mb-4">View Customer Payment</h1>
          <input
            type="search"
            placeholder="Search By Customer Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 border rounded-lg shadow-md mb-4"
          />
          <div className="grid grid-cols-2 gap-4">
            {filteredcustomers.map((customer) => (
              <div
                key={customer._id}
                className="custom-card bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="custom-card-body p-4">
                  <h5 className="custom-card- font-semibold">
                    Customer Name: {customer.customer_Name}
                  </h5>
                  <p className="custom-card-subtitle mb-2">
                    Company Name: {customer.company_Name}
                  </p>
                  <p className="custom-card-subtitle mb-2">GST No: {customer.GST_No}</p>
                  <p className="custom-card-subtitle mb-2">Reporting Address: {customer.reporting_Address}</p>
                  <p className="custom-card-subtitle mb-2">Date: {customer.Date}</p>
                  <p className="custom-card-subtitle mb-2">Vehicle Number: {customer.vehicle_Number}</p>
                  <p className="custom-card-subtitle mb-2">Vehicle Type: {customer.vehicle_Type}</p>
                  <p className="custom-card-subtitle mb-2">Quantity: {customer.quantity}</p>
                  <p className="custom-card-subtitle mb-2">From: {customer.from}</p>
                  <p className="custom-card-subtitle mb-2">To: {customer.to}</p>
                  <p className="custom-card-subtitle mb-2">Closing KM: {customer.closing_km}</p>
                  <p className="custom-card-subtitle mb-2">Closing Time: {customer.closing_Time}</p>
                  <p className="custom-card-subtitle mb-2">Starting KM: {customer.starting_Km}</p>
                  <p className="custom-card-subtitle mb-2">Starting Time: {customer.starting_Time}</p>
                  <p className="custom-card-subtitle mb-2">Total KM: {customer.total_Km}</p>
                  <p className="custom-card-subtitle mb-2">Title: {customer.title}</p>
                  <p className="custom-card-subtitle mb-2">Title Amount: {customer.title_Amount}</p>
                  <p className="custom-card-subtitle mb-2">Extra KM: {customer.extra_Km}</p>
                  <p className="custom-card-subtitle mb-2">Extra KM Amount: {customer.extramkm_Amount}</p>
                  <p className="custom-card-subtitle mb-2">Extra Hours: {customer.extra_Hours}</p>
                  <p className="custom-card-subtitle mb-2">Extra Hours Amount: {customer.extrahours_Amount}</p>
                  <p className="custom-card-subtitle mb-2">SGST: {customer.SGST}</p>
                  <p className="custom-card-subtitle mb-2">CGST: {customer.CGST}</p>
                  <p className="custom-card-subtitle mb-2">Total Amount: {customer.total_Amount}</p>
                  <p className="custom-card-subtitle mb-2">Advance Amount: {customer.advance_Amount}</p>
                  <p className="custom-card-subtitle mb-2">Remaining Amount: {customer.remaining_Amount}</p>
                  <p className="custom-card-subtitle mb-2">Payment Method: {customer.payment_Method}</p>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleGenerateInvoice(customer._id)}
                >
                  Generate
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCustomerPayment;
